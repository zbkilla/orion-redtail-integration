#!/usr/bin/env npx ts-node

/**
 * Linear Documentation Crawler v2.0
 * 
 * Production-ready crawler with the highest-impact improvements:
 * - Retry logic with exponential backoff
 * - Concurrent fetching with rate limiting
 * - Simple progress tracking
 * - Development caching
 * - Graceful error handling
 * 
 * Intentionally NOT included (avoiding overengineering):
 * - Complex orchestration patterns
 * - Database storage
 * - Real-time progress updates
 * - Memory monitoring
 * - Multiple strategy patterns
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import fetch from 'node-fetch';

// Configuration
const CONFIG = {
  OUTPUT_DIR: './ai-docs',
  CACHE_DIR: './.cache/linear-docs',
  MAX_CONCURRENT: 5,        // Concurrent requests (not too aggressive)
  RETRY_MAX: 3,             // Max retry attempts
  RETRY_BASE_DELAY: 1000,   // Initial retry delay (1 second)
  REQUEST_DELAY: 200,       // Delay between batches (ms)
  CACHE_TTL: 24 * 60 * 60 * 1000, // 24 hours cache
  TIMEOUT: 30000,           // 30 second timeout per request
};

// Known Linear documentation structure
const LINEAR_DOCS = {
  developers: [
    'graphql', 'sdk', 'oauth-2-0-authentication', 'webhooks',
    'rate-limiting', 'errors', 'pagination', 'filtering',
    'api-reference', 'mutations', 'subscriptions', 'file-uploads',
    'integrations', 'changelog'
  ],
  docs: [
    'issues', 'projects', 'cycles', 'views', 'teams', 'roadmap',
    'triage', 'workflows', 'labels', 'estimates', 'templates',
    'automations', 'api-keys', 'integrations', 'keyboard-shortcuts',
    'import', 'export', 'notifications', 'preferences', 'workspaces',
    'billing', 'security', 'data-privacy', 'sso', 'scim',
    'audit-logs', 'linear-method'
  ],
  method: [
    'introduction', 'principles', 'practices', 'workflows',
    'planning', 'execution', 'review', 'team-structure',
    'issue-tracking', 'project-management', 'cycles-sprints',
    'roadmapping', 'metrics', 'automation', 'integrations',
    'best-practices', 'anti-patterns', 'case-studies', 'migration-guide'
  ]
};

interface FetchResult {
  url: string;
  success: boolean;
  content?: string;
  error?: string;
  retries?: number;
  cached?: boolean;
}

interface CrawlStats {
  total: number;
  successful: number;
  failed: number;
  cached: number;
  retried: number;
  startTime: number;
  endTime?: number;
}

class LinearDocsCrawler {
  private stats: CrawlStats;
  private failures: FetchResult[] = [];
  private useCache: boolean;

  constructor(useCache: boolean = process.env.NODE_ENV === 'development') {
    this.useCache = useCache;
    this.stats = {
      total: 0,
      successful: 0,
      failed: 0,
      cached: 0,
      retried: 0,
      startTime: Date.now()
    };

    this.ensureDirectories();
  }

  private ensureDirectories(): void {
    [CONFIG.OUTPUT_DIR, CONFIG.CACHE_DIR].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  /**
   * Simple progress bar for console output
   */
  private showProgress(current: number, total: number, message: string): void {
    const percentage = Math.round((current / total) * 100);
    const barLength = 40;
    const filled = Math.round((percentage / 100) * barLength);
    const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);
    
    process.stdout.write(`\r[${bar}] ${percentage}% | ${current}/${total} | ${message}`);
    
    if (current === total) {
      process.stdout.write('\n');
    }
  }

  /**
   * Retry logic with exponential backoff
   */
  private async fetchWithRetry(url: string, attempt: number = 1): Promise<FetchResult> {
    try {
      // AbortController for timeout
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), CONFIG.TIMEOUT);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Linear-Docs-Crawler/2.0',
          'Accept': 'text/markdown, text/plain, */*'
        }
      });

      clearTimeout(timeout);

      if (response.ok) {
        const content = await response.text();
        return {
          url,
          success: true,
          content,
          retries: attempt - 1
        };
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error: any) {
      if (attempt < CONFIG.RETRY_MAX) {
        // Exponential backoff
        const delay = CONFIG.RETRY_BASE_DELAY * Math.pow(2, attempt - 1);
        await this.sleep(delay);
        
        this.stats.retried++;
        return this.fetchWithRetry(url, attempt + 1);
      }

      return {
        url,
        success: false,
        error: error.message || 'Unknown error',
        retries: attempt - 1
      };
    }
  }

  /**
   * Cache management - simple file-based caching
   */
  private getCachePath(url: string): string {
    const hash = crypto.createHash('md5').update(url).digest('hex');
    return path.join(CONFIG.CACHE_DIR, `${hash}.md`);
  }

  private async getFromCache(url: string): Promise<string | null> {
    if (!this.useCache) return null;

    const cachePath = this.getCachePath(url);
    
    try {
      if (fs.existsSync(cachePath)) {
        const stats = fs.statSync(cachePath);
        const age = Date.now() - stats.mtimeMs;
        
        if (age < CONFIG.CACHE_TTL) {
          return fs.readFileSync(cachePath, 'utf-8');
        }
      }
    } catch (error) {
      // Cache read failed, continue without cache
    }
    
    return null;
  }

  private async saveToCache(url: string, content: string): Promise<void> {
    if (!this.useCache) return;

    const cachePath = this.getCachePath(url);
    
    try {
      fs.writeFileSync(cachePath, content);
    } catch (error) {
      // Cache write failed, continue without caching
    }
  }

  /**
   * Concurrent fetching with rate limiting
   */
  private async fetchBatch(urls: string[]): Promise<FetchResult[]> {
    const results: FetchResult[] = [];
    
    // Process in chunks to respect rate limits
    for (let i = 0; i < urls.length; i += CONFIG.MAX_CONCURRENT) {
      const batch = urls.slice(i, i + CONFIG.MAX_CONCURRENT);
      
      const batchPromises = batch.map(async (url) => {
        // Check cache first
        const cached = await this.getFromCache(url);
        if (cached) {
          this.stats.cached++;
          return {
            url,
            success: true,
            content: cached,
            cached: true
          };
        }

        // Fetch with retry
        const result = await this.fetchWithRetry(url);
        
        // Save to cache if successful
        if (result.success && result.content) {
          await this.saveToCache(url, result.content);
        }
        
        return result;
      });

      const batchResults = await Promise.allSettled(batchPromises);
      
      batchResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        } else {
          results.push({
            url: batch[index],
            success: false,
            error: result.reason?.message || 'Promise rejected'
          });
        }
      });

      // Rate limiting between batches
      if (i + CONFIG.MAX_CONCURRENT < urls.length) {
        await this.sleep(CONFIG.REQUEST_DELAY);
      }
    }

    return results;
  }

  /**
   * Process and save results
   */
  private async processResults(results: FetchResult[]): Promise<void> {
    for (const result of results) {
      this.stats.total++;
      
      if (result.success && result.content) {
        this.stats.successful++;
        
        // Extract filename from URL
        const urlParts = result.url.split('/');
        const section = urlParts[urlParts.length - 2];
        const page = urlParts[urlParts.length - 1].replace('.md', '');
        const filename = `${section}-${page}.md`;
        const filepath = path.join(CONFIG.OUTPUT_DIR, filename);
        
        try {
          fs.writeFileSync(filepath, result.content);
        } catch (error: any) {
          console.error(`\nFailed to save ${filename}: ${error.message}`);
          this.stats.failed++;
          this.failures.push(result);
        }
      } else {
        this.stats.failed++;
        this.failures.push(result);
      }
    }
  }

  /**
   * Main crawl method
   */
  async crawl(): Promise<void> {
    console.log('🚀 Linear Documentation Crawler v2.0');
    console.log('=====================================\n');
    
    if (this.useCache) {
      console.log('📦 Cache enabled (development mode)\n');
    }

    // Build URL list
    const urls: string[] = [];
    
    Object.entries(LINEAR_DOCS).forEach(([section, pages]) => {
      pages.forEach(page => {
        urls.push(`https://linear.app/${section}/${page}.md`);
      });
    });

    console.log(`📋 Queued ${urls.length} documentation pages\n`);
    console.log(`⚙️  Settings: ${CONFIG.MAX_CONCURRENT} concurrent, ${CONFIG.RETRY_MAX} retries\n`);

    // Track progress
    let processed = 0;
    const updateProgress = () => {
      processed++;
      const message = this.stats.cached > 0 
        ? `${this.stats.successful} success, ${this.stats.cached} cached, ${this.stats.failed} failed`
        : `${this.stats.successful} success, ${this.stats.failed} failed`;
      this.showProgress(processed, urls.length, message);
    };

    // Process all URLs
    console.log('📥 Fetching documentation...\n');
    
    const results = await this.fetchBatch(urls);
    
    // Process and save results with progress
    for (const result of results) {
      await this.processResults([result]);
      updateProgress();
    }

    this.stats.endTime = Date.now();
    this.printSummary();
  }

  /**
   * Print final summary
   */
  private printSummary(): void {
    const duration = ((this.stats.endTime! - this.stats.startTime) / 1000).toFixed(1);
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 CRAWL SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Successful: ${this.stats.successful} documents`);
    
    if (this.stats.cached > 0) {
      console.log(`💾 From cache: ${this.stats.cached} documents`);
    }
    
    if (this.stats.retried > 0) {
      console.log(`🔄 Retried: ${this.stats.retried} requests`);
    }
    
    if (this.stats.failed > 0) {
      console.log(`❌ Failed: ${this.stats.failed} documents`);
      console.log('\n❌ Failed URLs:');
      this.failures.forEach(f => {
        console.log(`   - ${f.url}`);
        console.log(`     Error: ${f.error}`);
        if (f.retries && f.retries > 0) {
          console.log(`     Retries: ${f.retries}`);
        }
      });
    }
    
    console.log(`\n⏱️  Duration: ${duration} seconds`);
    console.log(`📁 Output: ${CONFIG.OUTPUT_DIR}`);
    
    if (this.useCache) {
      console.log(`💾 Cache: ${CONFIG.CACHE_DIR}`);
    }
    
    console.log('\n✨ Crawl complete!');
    
    // Exit with error code if failures
    if (this.stats.failed > 0) {
      process.exit(1);
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  const options = {
    useCache: args.includes('--cache') || process.env.NODE_ENV === 'development',
    help: args.includes('--help') || args.includes('-h')
  };

  if (options.help) {
    console.log(`
Linear Documentation Crawler v2.0

Usage: npx ts-node linear-docs-crawler-v2.ts [options]

Options:
  --cache     Enable caching (automatic in development)
  --help      Show this help message

Environment:
  NODE_ENV    Set to 'development' to enable caching

Examples:
  # Production crawl (no cache)
  npx ts-node linear-docs-crawler-v2.ts

  # Development crawl (with cache)
  NODE_ENV=development npx ts-node linear-docs-crawler-v2.ts

  # Force cache in any environment
  npx ts-node linear-docs-crawler-v2.ts --cache
`);
    process.exit(0);
  }

  const crawler = new LinearDocsCrawler(options.useCache);
  
  try {
    await crawler.crawl();
  } catch (error: any) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { LinearDocsCrawler };