#!/usr/bin/env npx ts-node

/**
 * Crawl all discovered Linear documentation
 * 
 * This script reads the discovery report and downloads all available documentation
 */

import * as fs from 'fs';
import { LinearDocsCrawler } from './linear-docs-crawler-v2';

// Extend the crawler to use discovered URLs
class DiscoveredDocsCrawler extends LinearDocsCrawler {
  async crawlDiscovered(): Promise<void> {
    console.log('🚀 Linear Documentation Crawler - Discovery Mode');
    console.log('================================================\n');

    // Read discovery report
    const reportPath = './linear-docs-discovery-report.json';
    
    if (!fs.existsSync(reportPath)) {
      console.error('❌ Discovery report not found!');
      console.log('   Run "npm run discover" first to discover available documentation.\n');
      process.exit(1);
    }

    const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
    const urls = report.availableMarkdownUrls;

    console.log(`📋 Found ${urls.length} documentation files from discovery`);
    console.log(`📅 Discovery date: ${new Date(report.timestamp).toLocaleString()}\n`);
    
    if ((this as any).useCache) {
      console.log('📦 Cache enabled (development mode)\n');
    }

    console.log(`⚙️  Settings: 5 concurrent, 3 retries\n`);
    console.log('📥 Fetching all discovered documentation...\n');

    // Track progress
    let processed = 0;
    const updateProgress = () => {
      processed++;
      const stats = (this as any).stats;
      const message = stats.cached > 0 
        ? `${stats.successful} success, ${stats.cached} cached, ${stats.failed} failed`
        : `${stats.successful} success, ${stats.failed} failed`;
      (this as any).showProgress(processed, urls.length, message);
    };

    // Process all discovered URLs
    const results = await (this as any).fetchBatch(urls);
    
    // Process and save results with progress
    for (const result of results) {
      await (this as any).processResults([result]);
      updateProgress();
    }

    (this as any).stats.endTime = Date.now();
    (this as any).printSummary();
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  const options = {
    useCache: args.includes('--cache') || process.env.NODE_ENV === 'development',
    help: args.includes('--help') || args.includes('-h')
  };

  if (options.help) {
    console.log(`
Linear Documentation Crawler - Discovery Mode

Usage: npx ts-node crawl-discovered.ts [options]

Options:
  --cache     Enable caching (automatic in development)
  --help      Show this help message

Prerequisites:
  Run "npm run discover" first to discover available documentation

Environment:
  NODE_ENV    Set to 'development' to enable caching

Examples:
  # Discover documentation first
  npm run discover

  # Then crawl all discovered docs
  npx ts-node crawl-discovered.ts

  # With cache
  npx ts-node crawl-discovered.ts --cache
`);
    process.exit(0);
  }

  const crawler = new DiscoveredDocsCrawler(options.useCache);
  
  try {
    await crawler.crawlDiscovered();
  } catch (error: any) {
    console.error('\n❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { DiscoveredDocsCrawler };