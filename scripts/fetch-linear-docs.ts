#!/usr/bin/env npx ts-node

/**
 * Fetch Linear Documentation
 * 
 * This script fetches Linear documentation pages in markdown format
 * using the discovered .md URL pattern.
 */

import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';

// Known Linear documentation pages based on discovery
const LINEAR_DOCS_PAGES = {
  developers: [
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
    'subscriptions',
    'file-uploads',
    'integrations'
  ],
  docs: [
    'issues',
    'projects', 
    'cycles',
    'views',
    'teams',
    'roadmap',
    'workflows',
    'labels',
    'estimates',
    'templates',
    'automations',
    'keyboard-shortcuts',
    'import',
    'export',
    'linear-method'
  ]
};

async function fetchLinearDoc(section: string, page: string): Promise<{ content: string | null; error?: string }> {
  const url = `https://linear.app/${section}/${page}.md`;
  
  try {
    console.log(`📥 Fetching: ${url}`);
    const response = await fetch(url);
    
    if (response.ok) {
      const content = await response.text();
      return { content };
    } else {
      return { content: null, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    return { content: null, error: String(error) };
  }
}

async function saveDocument(filepath: string, content: string): Promise<boolean> {
  try {
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filepath, content);
    return true;
  } catch (error) {
    console.error(`Failed to save ${filepath}:`, error);
    return false;
  }
}

async function main() {
  console.log('🚀 Linear Documentation Fetcher');
  console.log('================================\n');
  
  const outputDir = path.join(process.cwd(), 'ai-docs');
  let successCount = 0;
  let failCount = 0;

  // Fetch developer documentation
  console.log('📚 Fetching Developer Documentation...\n');
  for (const page of LINEAR_DOCS_PAGES.developers) {
    const { content, error } = await fetchLinearDoc('developers', page);
    
    if (content) {
      const filename = `developers-${page}.md`;
      const filepath = path.join(outputDir, filename);
      
      if (await saveDocument(filepath, content)) {
        console.log(`   ✅ Saved: ${filename}`);
        successCount++;
      } else {
        console.log(`   ❌ Failed to save: ${filename}`);
        failCount++;
      }
    } else {
      console.log(`   ⚠️  Not found: ${page}.md (${error})`);
      failCount++;
    }
    
    // Rate limiting delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Fetch general documentation
  console.log('\n📚 Fetching General Documentation...\n');
  for (const page of LINEAR_DOCS_PAGES.docs) {
    const { content, error } = await fetchLinearDoc('docs', page);
    
    if (content) {
      const filename = `docs-${page}.md`;
      const filepath = path.join(outputDir, filename);
      
      if (await saveDocument(filepath, content)) {
        console.log(`   ✅ Saved: ${filename}`);
        successCount++;
      } else {
        console.log(`   ❌ Failed to save: ${filename}`);
        failCount++;
      }
    } else {
      console.log(`   ⚠️  Not found: ${page}.md (${error})`);
      failCount++;
    }
    
    // Rate limiting delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Successfully downloaded: ${successCount} documents`);
  console.log(`❌ Failed/Not found: ${failCount} documents`);
  console.log(`📁 Saved to: ${outputDir}`);
  console.log('\n✨ Done!');
}

// Run the script
main().catch(console.error);