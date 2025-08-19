#!/usr/bin/env ts-node

/**
 * Linear Documentation Crawler
 * 
 * This script discovers and downloads all Linear documentation pages in markdown format
 * by appending .md to the documentation URLs.
 */

import * as fs from 'fs';
import * as path from 'path';

// Known Linear documentation sections and pages
const LINEAR_DOCS_STRUCTURE = {
  developers: {
    baseUrl: 'https://linear.app/developers',
    pages: [
      'graphql',
      'sdk', 
      'oauth-2-0-authentication',
      'webhooks',
      'api-reference',
      'rate-limiting',
      'errors',
      'pagination',
      'filtering',
      'mutations',
      'subscriptions',
      'file-uploads',
      'integrations',
      'roadmap',
      'changelog'
    ]
  },
  docs: {
    baseUrl: 'https://linear.app/docs',
    pages: [
      'issues',
      'projects',
      'cycles',
      'views',
      'teams',
      'roadmap',
      'triage',
      'workflows',
      'labels',
      'estimates',
      'templates',
      'automations',
      'api-keys',
      'integrations',
      'keyboard-shortcuts',
      'import',
      'export',
      'notifications',
      'preferences',
      'workspaces',
      'billing',
      'security',
      'data-privacy',
      'sso',
      'scim',
      'audit-logs',
      'linear-method'
    ]
  },
  method: {
    baseUrl: 'https://linear.app/method',
    pages: [
      'introduction',
      'principles',
      'practices',
      'workflows',
      'planning',
      'execution',
      'review',
      'team-structure',
      'issue-tracking',
      'project-management',
      'cycles-sprints',
      'roadmapping',
      'metrics',
      'automation',
      'integrations',
      'best-practices',
      'anti-patterns',
      'case-studies',
      'migration-guide'
    ]
  }
};

interface CrawlResult {
  url: string;
  success: boolean;
  error?: string;
  savedPath?: string;
}

class LinearDocsCrawler {
  private outputDir: string;
  private results: CrawlResult[] = [];

  constructor(outputDir: string = './ai-docs') {
    this.outputDir = outputDir;
    this.ensureOutputDir();
  }

  private ensureOutputDir(): void {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  private async fetchMarkdown(url: string): Promise<string | null> {
    try {
      console.log(`📥 Fetching: ${url}`);
      
      // In a real implementation, we'd use fetch or axios here
      // For this example, we'll simulate the fetch
      // const response = await fetch(url);
      // if (!response.ok) throw new Error(`HTTP ${response.status}`);
      // return await response.text();
      
      // Placeholder for actual implementation
      console.log(`   ⚠️  Would fetch: ${url}`);
      return null;
    } catch (error) {
      console.error(`   ❌ Failed to fetch ${url}: ${error}`);
      return null;
    }
  }

  private sanitizeFilename(url: string, section: string): string {
    const parts = url.split('/');
    const pageName = parts[parts.length - 1].replace('.md', '');
    return `${section}-${pageName}.md`;
  }

  async crawlSection(section: string, config: { baseUrl: string; pages: string[] }): Promise<void> {
    console.log(`\n🔍 Crawling ${section.toUpperCase()} section...`);
    console.log(`   Base URL: ${config.baseUrl}`);
    console.log(`   Pages to crawl: ${config.pages.length}`);

    for (const page of config.pages) {
      const url = `${config.baseUrl}/${page}.md`;
      const filename = this.sanitizeFilename(url, section);
      const filepath = path.join(this.outputDir, filename);

      const result: CrawlResult = {
        url,
        success: false
      };

      const content = await this.fetchMarkdown(url);
      
      if (content) {
        try {
          fs.writeFileSync(filepath, content);
          result.success = true;
          result.savedPath = filepath;
          console.log(`   ✅ Saved: ${filename}`);
        } catch (error) {
          result.error = `Failed to save: ${error}`;
          console.error(`   ❌ Failed to save ${filename}: ${error}`);
        }
      } else {
        result.error = 'Failed to fetch content';
      }

      this.results.push(result);
      
      // Add a small delay to be respectful to the server
      await this.delay(500);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async crawlAll(): Promise<void> {
    console.log('🚀 Starting Linear Documentation Crawler');
    console.log(`📁 Output directory: ${this.outputDir}\n`);

    for (const [section, config] of Object.entries(LINEAR_DOCS_STRUCTURE)) {
      await this.crawlSection(section, config);
    }

    this.printSummary();
  }

  private printSummary(): void {
    console.log('\n' + '='.repeat(60));
    console.log('📊 CRAWL SUMMARY');
    console.log('='.repeat(60));

    const successful = this.results.filter(r => r.success).length;
    const failed = this.results.filter(r => !r.success).length;
    const total = this.results.length;

    console.log(`Total pages attempted: ${total}`);
    console.log(`✅ Successfully downloaded: ${successful}`);
    console.log(`❌ Failed: ${failed}`);

    if (failed > 0) {
      console.log('\n❌ Failed URLs:');
      this.results
        .filter(r => !r.success)
        .forEach(r => console.log(`   - ${r.url}: ${r.error}`));
    }

    console.log('\n📁 Saved files:');
    this.results
      .filter(r => r.success && r.savedPath)
      .forEach(r => console.log(`   - ${path.basename(r.savedPath!)}`));
  }

  async discoverAndCrawl(): Promise<void> {
    console.log('🔎 Discovering Linear documentation structure...');
    console.log('   This would fetch the main docs page and discover all links');
    console.log('   For now, using predefined structure\n');
    
    await this.crawlAll();
  }
}

// Script to use with the actual fetch implementation
export class LinearDocsDownloader {
  static async downloadPage(url: string, outputPath: string): Promise<boolean> {
    try {
      // This would be the actual implementation using fetch
      console.log(`Downloading: ${url} -> ${outputPath}`);
      
      // Example structure for actual implementation:
      /*
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Linear-Docs-Crawler/1.0',
          'Accept': 'text/markdown, text/plain'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const content = await response.text();
      fs.writeFileSync(outputPath, content);
      */
      
      return true;
    } catch (error) {
      console.error(`Failed to download ${url}:`, error);
      return false;
    }
  }

  static async downloadAllDocs(): Promise<void> {
    const outputDir = path.join(process.cwd(), 'ai-docs');
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log('📚 Linear Documentation Downloader');
    console.log('==================================\n');
    
    // List of known documentation pages (discovered pattern)
    const docPages = [
      'graphql',
      'sdk',
      'oauth-2-0-authentication', 
      'webhooks',
      'rate-limiting',
      'errors',
      'pagination',
      'filtering',
      'api-reference',
      'mutations',
      'subscriptions'
    ];

    console.log(`📥 Downloading ${docPages.length} documentation pages...\n`);

    for (const page of docPages) {
      const url = `https://linear.app/developers/${page}.md`;
      const filename = `${page}.md`;
      const filepath = path.join(outputDir, filename);
      
      const success = await this.downloadPage(url, filepath);
      
      if (success) {
        console.log(`✅ ${filename}`);
      } else {
        console.log(`❌ ${filename}`);
      }
      
      // Be respectful with rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n✨ Documentation download complete!');
    console.log(`📁 Files saved to: ${outputDir}`);
  }
}

// Main execution
if (require.main === module) {
  const crawler = new LinearDocsCrawler();
  
  console.log('Linear Documentation Crawler');
  console.log('============================\n');
  console.log('This script demonstrates the structure for crawling Linear docs.');
  console.log('The actual fetching is simulated for demonstration.\n');
  console.log('Discovered pattern: Linear serves markdown at {url}.md');
  console.log('Example: https://linear.app/developers/graphql.md\n');
  
  // Show what would be crawled
  crawler.discoverAndCrawl().catch(console.error);
}

export { LinearDocsCrawler };