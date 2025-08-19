#!/usr/bin/env npx ts-node

/**
 * Linear Documentation Discovery Tool
 * 
 * Explores Linear's documentation structure to find all available pages
 * before attempting to download them.
 * 
 * Strategy:
 * 1. Check for sitemap.xml
 * 2. Fetch main documentation pages
 * 3. Extract all internal links
 * 4. Test which links have .md versions
 * 5. Generate a report
 */

import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

interface DiscoveryResult {
  url: string;
  title?: string;
  hasMarkdown: boolean;
  links: string[];
  error?: string;
}

class LinearDocsDiscovery {
  private discovered = new Set<string>();
  private tested = new Map<string, boolean>();
  private results: DiscoveryResult[] = [];
  
  // Starting points for discovery
  private readonly startUrls = [
    'https://linear.app/developers',
    'https://linear.app/docs',
    'https://linear.app/method'
  ];

  async discover(): Promise<void> {
    console.log('🔍 Linear Documentation Discovery Tool');
    console.log('======================================\n');

    // Step 1: Check for sitemaps
    console.log('📍 Step 1: Checking for sitemaps...');
    await this.checkSitemaps();

    // Step 2: Crawl main pages
    console.log('\n📍 Step 2: Crawling main documentation pages...');
    await this.crawlMainPages();

    // Step 3: Test .md availability
    console.log('\n📍 Step 3: Testing .md availability for discovered links...');
    await this.testMarkdownAvailability();

    // Step 4: Generate report
    console.log('\n📍 Step 4: Generating report...');
    this.generateReport();
  }

  /**
   * Check for sitemap files
   */
  private async checkSitemaps(): Promise<void> {
    const sitemapUrls = [
      'https://linear.app/sitemap.xml',
      'https://linear.app/sitemap-index.xml',
      'https://linear.app/developers/sitemap.xml',
      'https://linear.app/docs/sitemap.xml'
    ];

    for (const url of sitemapUrls) {
      try {
        console.log(`  Checking ${url}...`);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(url, { 
          method: 'HEAD',
          signal: controller.signal
        });
        
        clearTimeout(timeout);
        
        if (response.ok) {
          console.log(`  ✅ Found sitemap: ${url}`);
          await this.parseSitemap(url);
        } else {
          console.log(`  ❌ Not found: ${url} (${response.status})`);
        }
      } catch (error) {
        console.log(`  ❌ Error checking ${url}`);
      }
    }
  }

  /**
   * Parse sitemap XML
   */
  private async parseSitemap(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      const xml = await response.text();
      
      // Simple regex to extract URLs from sitemap
      const urlMatches = xml.match(/<loc>(.*?)<\/loc>/g) || [];
      const urls = urlMatches.map(match => 
        match.replace('<loc>', '').replace('</loc>', '')
      );

      console.log(`    Found ${urls.length} URLs in sitemap`);
      
      // Filter for documentation URLs
      const docUrls = urls.filter(u => 
        u.includes('/developers') || 
        u.includes('/docs') || 
        u.includes('/method')
      );
      
      console.log(`    Found ${docUrls.length} documentation URLs`);
      docUrls.forEach(u => this.discovered.add(u));
      
    } catch (error) {
      console.log(`    Error parsing sitemap: ${error}`);
    }
  }

  /**
   * Crawl main documentation pages and extract links
   */
  private async crawlMainPages(): Promise<void> {
    for (const url of this.startUrls) {
      console.log(`  Crawling ${url}...`);
      
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; DocDiscovery/1.0)'
          }
        });
        
        if (!response.ok) {
          console.log(`    ❌ Failed to fetch: ${response.status}`);
          continue;
        }

        const html = await response.text();
        const links = this.extractLinks(html, url);
        
        console.log(`    ✅ Found ${links.length} links`);
        
        // Add to discovered set
        links.forEach(link => this.discovered.add(link));
        
        this.results.push({
          url,
          hasMarkdown: false,
          links
        });
        
      } catch (error: any) {
        console.log(`    ❌ Error: ${error.message}`);
      }
    }
  }

  /**
   * Extract all links from HTML
   */
  private extractLinks(html: string, baseUrl: string): string[] {
    const links: string[] = [];
    
    try {
      // Parse HTML with jsdom
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      // Find all links
      const anchors = document.querySelectorAll('a[href]');
      
      anchors.forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (!href) return;
        
        // Convert to absolute URL
        let absoluteUrl: string;
        if (href.startsWith('http')) {
          absoluteUrl = href;
        } else if (href.startsWith('/')) {
          const base = new URL(baseUrl);
          absoluteUrl = `${base.origin}${href}`;
        } else {
          absoluteUrl = new URL(href, baseUrl).toString();
        }
        
        // Filter for Linear documentation URLs
        if (absoluteUrl.includes('linear.app') && 
            (absoluteUrl.includes('/developers') || 
             absoluteUrl.includes('/docs') || 
             absoluteUrl.includes('/method'))) {
          links.push(absoluteUrl);
        }
      });
      
    } catch (error) {
      console.log(`    Error parsing HTML: ${error}`);
    }
    
    return [...new Set(links)]; // Remove duplicates
  }

  /**
   * Test which URLs have .md versions available
   */
  private async testMarkdownAvailability(): Promise<void> {
    const urlsToTest = Array.from(this.discovered);
    console.log(`  Testing ${urlsToTest.length} discovered URLs...\n`);
    
    let tested = 0;
    let available = 0;
    
    // Process in batches to avoid rate limiting
    const batchSize = 5;
    for (let i = 0; i < urlsToTest.length; i += batchSize) {
      const batch = urlsToTest.slice(i, i + batchSize);
      
      await Promise.all(batch.map(async (url) => {
        // Skip if already ends with .md
        if (url.endsWith('.md')) {
          this.tested.set(url, true);
          tested++;
          available++;
          return;
        }
        
        // Convert to .md URL
        const mdUrl = this.convertToMarkdownUrl(url);
        if (!mdUrl) {
          tested++;
          return;
        }
        
        // Test if .md version exists
        try {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 5000);
          
          const response = await fetch(mdUrl, { 
            method: 'HEAD',
            signal: controller.signal
          });
          
          clearTimeout(timeout);
          
          const exists = response.ok;
          this.tested.set(mdUrl, exists);
          
          tested++;
          if (exists) {
            available++;
            console.log(`  ✅ ${mdUrl.replace('https://linear.app/', '')}`);
          }
          
        } catch (error) {
          this.tested.set(mdUrl, false);
          tested++;
        }
      }));
      
      // Progress update
      const progress = Math.round((tested / urlsToTest.length) * 100);
      process.stdout.write(`\r  Progress: ${progress}% (${tested}/${urlsToTest.length}) - Found ${available} .md files`);
      
      // Rate limiting
      if (i + batchSize < urlsToTest.length) {
        await this.sleep(200);
      }
    }
    
    console.log('\n');
  }

  /**
   * Convert a regular URL to its potential .md version
   */
  private convertToMarkdownUrl(url: string): string | null {
    // Parse URL
    const parsed = new URL(url);
    
    // Skip if not a documentation page
    if (!parsed.pathname.includes('/developers') && 
        !parsed.pathname.includes('/docs') && 
        !parsed.pathname.includes('/method')) {
      return null;
    }
    
    // Skip if already has an extension
    if (parsed.pathname.match(/\.\w+$/)) {
      return null;
    }
    
    // Remove trailing slash
    let pathname = parsed.pathname.replace(/\/$/, '');
    
    // Add .md extension
    return `${parsed.origin}${pathname}.md`;
  }

  /**
   * Generate and save discovery report
   */
  private generateReport(): void {
    const availableUrls = Array.from(this.tested.entries())
      .filter(([url, exists]) => exists)
      .map(([url]) => url);
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalDiscovered: this.discovered.size,
        totalTested: this.tested.size,
        markdownAvailable: availableUrls.length,
        successRate: `${Math.round((availableUrls.length / this.tested.size) * 100)}%`
      },
      availableMarkdownUrls: availableUrls.sort(),
      discoveredUrls: Array.from(this.discovered).sort()
    };

    // Save JSON report
    const jsonPath = './linear-docs-discovery-report.json';
    fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
    
    // Save Markdown report
    const mdReport = this.generateMarkdownReport(report);
    const mdPath = './LINEAR_DOCS_DISCOVERY.md';
    fs.writeFileSync(mdPath, mdReport);
    
    // Console summary
    console.log('📊 Discovery Summary');
    console.log('===================');
    console.log(`Total URLs discovered: ${report.summary.totalDiscovered}`);
    console.log(`URLs tested for .md: ${report.summary.totalTested}`);
    console.log(`Markdown files available: ${report.summary.markdownAvailable}`);
    console.log(`Success rate: ${report.summary.successRate}`);
    console.log(`\n✅ Reports saved:`);
    console.log(`   - ${jsonPath}`);
    console.log(`   - ${mdPath}`);
  }

  /**
   * Generate markdown report
   */
  private generateMarkdownReport(report: any): string {
    const sections = this.groupUrlsBySection(report.availableMarkdownUrls);
    
    return `# Linear Documentation Discovery Report

Generated: ${new Date().toISOString()}

## Summary

- **Total URLs Discovered:** ${report.summary.totalDiscovered}
- **URLs Tested:** ${report.summary.totalTested}
- **Markdown Files Available:** ${report.summary.markdownAvailable}
- **Success Rate:** ${report.summary.successRate}

## Available Markdown Documentation

### By Section

${Object.entries(sections).map(([section, urls]: [string, any]) => `
#### ${section} (${urls.length} files)

${urls.map((url: string) => {
  const path = url.replace('https://linear.app/', '');
  const name = path.split('/').pop()?.replace('.md', '') || '';
  return `- \`${path}\` - ${this.formatTitle(name)}`;
}).join('\n')}
`).join('\n')}

## Download Commands

### Using curl
\`\`\`bash
# Download all available documentation
${report.availableMarkdownUrls.slice(0, 5).map((url: string) => 
  `curl -o "ai-docs/${url.split('/').slice(-2).join('-')}" "${url}"`
).join('\n')}
\`\`\`

### Using the crawler
\`\`\`bash
# Use the Linear Documentation Crawler v2
npm run crawl
\`\`\`

## Discovery Method

1. Checked for sitemap files
2. Crawled main documentation pages
3. Extracted all internal links
4. Tested each link for .md availability
5. Generated this report

## Notes

- The \`.md\` pattern provides markdown versions of select Linear documentation
- Not all pages have markdown versions available
- Some sections (like Method documentation) may not support the .md format
- The crawler automatically handles retries and caching for efficient downloading
`;
  }

  /**
   * Group URLs by section
   */
  private groupUrlsBySection(urls: string[]): Record<string, string[]> {
    const sections: Record<string, string[]> = {
      'Developer API': [],
      'Product Documentation': [],
      'Method Documentation': [],
      'Other': []
    };

    urls.forEach(url => {
      if (url.includes('/developers/')) {
        sections['Developer API'].push(url);
      } else if (url.includes('/docs/')) {
        sections['Product Documentation'].push(url);
      } else if (url.includes('/method/')) {
        sections['Method Documentation'].push(url);
      } else {
        sections['Other'].push(url);
      }
    });

    // Remove empty sections
    Object.keys(sections).forEach(key => {
      if (sections[key].length === 0) {
        delete sections[key];
      }
    });

    return sections;
  }

  /**
   * Format title from URL segment
   */
  private formatTitle(name: string): string {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run discovery
async function main() {
  const discovery = new LinearDocsDiscovery();
  
  try {
    await discovery.discover();
  } catch (error: any) {
    console.error('\n❌ Discovery failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { LinearDocsDiscovery };