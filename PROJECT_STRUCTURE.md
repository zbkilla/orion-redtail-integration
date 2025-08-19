# Project Structure

## Directory Layout

```
orion-redtail-project/
├── src/                        # Source code
│   ├── crawlers/              # Web crawlers and discovery tools
│   │   ├── crawl-discovered.ts
│   │   ├── linear-docs-crawler.ts
│   │   ├── linear-docs-crawler-v2.ts
│   │   └── linear-docs-discovery.ts
│   ├── index.ts               # Main application entry point
│   └── linear-client.ts       # Linear API client
│
├── docs/                      # Documentation
│   ├── project/              # Project-specific documentation
│   │   ├── orion-integration-team-questions.md
│   │   ├── orion-redtail-integration-project-plan.md
│   │   └── rt-orion-integration.md
│   └── linear/               # Linear-specific documentation
│       ├── ARCHON_CRAWLER_ANALYSIS_FINDINGS.md
│       ├── LINEAR_ADVANCED_FEATURES.md
│       ├── LINEAR_BEST_PRACTICES_REPORT.md
│       ├── LINEAR_CRAWLER_V2_DOCS.md
│       └── LINEAR_DOCS_DISCOVERY.md
│
├── ai-docs/                   # AI-generated Linear documentation
│   ├── developers-*.md       # Developer documentation
│   ├── docs-*.md            # User documentation
│   └── *.md                 # Index and reference files
│
├── scripts/                   # Utility scripts
│   ├── batch-fetch-linear-docs.sh
│   └── fetch-linear-docs.ts
│
├── dist/                      # Compiled JavaScript output
├── node_modules/              # Dependencies
│
├── README.md                  # Project overview
├── PROJECT_STRUCTURE.md       # This file
├── FILE_CLEANUP_RECOMMENDATIONS.md
├── package.json              # Node.js configuration
├── package-lock.json         # Dependency lock file
└── tsconfig.json             # TypeScript configuration
```

## Directory Descriptions

### `/src`
Core application source code written in TypeScript.

- **`/src/crawlers`**: Web crawling and document discovery tools for Linear documentation
- **`index.ts`**: Main application entry point
- **`linear-client.ts`**: Linear API client implementation

### `/docs`
Project and technical documentation.

- **`/docs/project`**: Project planning, requirements, and integration documentation
- **`/docs/linear`**: Linear-specific guides, best practices, and analysis reports

### `/ai-docs`
Comprehensive Linear documentation fetched and processed by AI tools. Contains both developer and user documentation from Linear's official sources.

### `/scripts`
Utility scripts for various tasks like batch processing and data fetching.

### `/dist`
Build output directory containing compiled JavaScript files (git-ignored).

## Key Files

- **`README.md`**: Main project documentation and overview
- **`package.json`**: Node.js project configuration and scripts
- **`tsconfig.json`**: TypeScript compiler configuration
- **`.env`**: Environment variables (git-ignored, create from .env.example if needed)

## NPM Scripts

- `npm run build`: Compile TypeScript to JavaScript
- `npm run dev`: Run in development mode
- `npm run linear`: Build and run the main application
- `npm run crawl`: Run the Linear docs crawler
- `npm run discover`: Discover Linear documentation pages
- `npm run crawl:all`: Crawl all discovered documentation

## Development Workflow

1. Write code in `/src`
2. Run `npm run build` to compile
3. Use `npm run dev` for development
4. Documentation goes in `/docs`
5. Scripts and utilities go in `/scripts`