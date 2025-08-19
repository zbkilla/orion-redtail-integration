# Claude AI Assistant Context

## Project Overview
This is the Orion-Redtail Integration Project, focusing on implementing bi-directional sync between Orion Advisor and Redtail CRM systems using Linear for project management.

## Project Structure

### Core Directories
- `/src` - TypeScript source code
  - `/src/crawlers` - Web crawling tools for Linear documentation
- `/docs` - Project documentation
  - `/docs/project` - Orion-Redtail integration plans
  - `/docs/linear` - Linear-specific analysis and reports
- `/scripts` - Utility scripts and tools
- `/ai-docs` - Comprehensive Linear documentation (organized by topic)

### Key Files
- `package.json` - Node.js configuration with Linear SDK dependencies
- `tsconfig.json` - TypeScript configuration
- `.env` - Environment variables (LINEAR_API_KEY required)

## Linear Documentation Reference

### Quick Access Paths
When asked about Linear features, reference these organized documentation sections:

#### Core Features
- **Issues**: `ai-docs/issues/` - Creating, editing, managing issues
- **Projects**: `ai-docs/projects-initiatives/` - Project management and initiatives
- **Cycles**: `ai-docs/cycles/` - Sprint planning and cycle management
- **Teams**: `ai-docs/teams/` - Team configuration and workflows

#### Developer Resources
- **GraphQL API**: `ai-docs/graphql-api/` - API documentation
- **TypeScript SDK**: `ai-docs/typescript-sdk/` - SDK implementation
- **Authentication**: `ai-docs/authentication/` - OAuth and auth flows
- **Webhooks**: Multiple locations - check `graphql-api/` and `typescript-sdk/`

#### Integrations
- **All Integrations**: `ai-docs/integrations/` - 22+ integration guides
- **GitHub**: `ai-docs/integrations/docs-github.md`
- **Slack**: `ai-docs/integrations/docs-slack.md`
- **Jira Migration**: `ai-docs/integrations/docs-jira-to-linear.md`

#### Administration
- **Workspace Setup**: `ai-docs/administration/`
- **Security**: `ai-docs/administration/docs-security.md`
- **SAML/SCIM**: `ai-docs/administration/docs-saml-and-access-control.md`

### Reference Documents
- **Master Index**: `ai-docs/reference/MASTER_INDEX.md`
- **Knowledge Graph**: `ai-docs/reference/KNOWLEDGE_GRAPH.md`
- **API Quick Reference**: `ai-docs/reference/INDEX_API_QUICK_REFERENCE.md`

## Best Practices and Conventions

### Code Style
- Use TypeScript for all new code
- Follow existing patterns in `/src`
- Use the Linear SDK (@linear/sdk) for API interactions
- Implement error handling for all API calls

### Linear API Usage
```typescript
import { LinearClient } from "@linear/sdk";

const client = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY
});
```

### Common Commands
```bash
# Development
npm run dev                 # Run in development mode
npm run build              # Compile TypeScript
npm run linear             # Run main application

# Documentation crawling
npm run crawl              # Run Linear docs crawler
npm run discover           # Discover Linear documentation
npm run crawl:all          # Crawl all discovered docs
```

### Environment Setup
Required environment variables:
- `LINEAR_API_KEY` - Your Linear API key
- `NODE_ENV` - Development/production environment

### Testing Approach
- Check README or package.json for test commands
- Verify with `npm run lint` and `npm run typecheck` if available

## Project-Specific Context

### Current Focus Areas
1. **Linear Integration**: Building comprehensive Linear workspace automation
2. **Documentation**: Maintaining extensive Linear documentation library
3. **Orion-Redtail Sync**: Planning bi-directional data synchronization

### Key Integration Points
- Linear Issues ↔ Redtail Activities
- Linear Projects ↔ Orion Portfolios
- Linear Teams ↔ Organization Structure

### Available Tools
- Linear SDK for API operations
- Web crawlers for documentation updates
- Comprehensive Linear docs for reference

## Important Notes

### When Working with Linear Docs
- All Linear documentation is pre-fetched in `ai-docs/`
- Use existing docs rather than fetching from web
- Reference `MASTER_INDEX.md` for complete documentation map

### When Implementing Features
1. Check existing patterns in `/src`
2. Reference relevant docs in `ai-docs/`
3. Use Linear SDK methods when available
4. Follow TypeScript conventions

### When Answering Questions
- For Linear features: Reference specific files in `ai-docs/`
- For API usage: Check `ai-docs/graphql-api/` or `ai-docs/typescript-sdk/`
- For integrations: Check `ai-docs/integrations/`
- For best practices: Check `ai-docs/use-cases/`

## Documentation Status Reports
All documentation organization reports are located in `docs/organization-reports/`:
- `ISSUES_DOCUMENTATION_STATUS.md`
- `ISSUE_PROPERTIES_DOCUMENTATION_STATUS.md`
- `PROJECTS_INITIATIVES_DOCUMENTATION_STATUS.md`
- `CYCLES_DOCUMENTATION_STATUS.md`
- `TEAMS_DOCUMENTATION_STATUS.md`
- `VIEWS_FILTER_AI_DOCUMENTATION_STATUS.md`
- `INTEGRATIONS_DOCUMENTATION_STATUS.md`
- `ANALYTICS_DOCUMENTATION_STATUS.md`
- `SIDEBAR_ADMINISTRATION_DOCUMENTATION_STATUS.md`
- `GETTING_STARTED_ACCOUNT_DOCUMENTATION_STATUS.md`
- `GRAPHQL_AUTH_AGENTS_DOCUMENTATION_STATUS.md`
- `SDK_GUIDES_DOCUMENTATION_STATUS.md`
- `FINAL_DOCUMENTATION_ORGANIZATION_REPORT.md`

## Quick Reference Links
- Linear App: https://linear.app
- Linear Docs: https://linear.app/docs
- Linear API: https://developers.linear.app
- GitHub SDK: https://github.com/linear/linear

## File Organization Summary
```
Total: 160+ documentation files
Folders: 22 categorized directories
Coverage: Complete Linear platform documentation
Status: Fully organized and indexed
```

---
*Last Updated: 2025-08-19*
*Documentation Version: Complete Linear platform coverage*