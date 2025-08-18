# Linear SDK Setup Guide

## Overview
The Linear SDK has been integrated into this project to enable project management and issue tracking for the Orion-Redtail integration project.

## Installation Complete ✓

The following packages have been installed:
- `@linear/sdk` - Linear TypeScript SDK for API integration
- `typescript` - TypeScript compiler
- `@types/node` - Node.js type definitions
- `dotenv` - Environment variable management
- `ts-node` - TypeScript execution for development

## Project Structure

```
src/
├── index.ts           # CLI entry point with command routing
├── linear-client.ts   # Basic Linear API integration
└── project-tracker.ts # Orion-Redtail specific project tracking
```

## Configuration

1. **Get your Linear API Key:**
   - Visit https://linear.app/settings/api
   - Generate a new personal API key
   - Copy the key for use in next step

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your credentials:
   ```
   LINEAR_API_KEY=your_actual_api_key_here
   LINEAR_TEAM_ID=your_team_id (optional)
   LINEAR_PROJECT_ID=your_project_id (optional)
   ```

3. **Find your Team ID (optional):**
   ```bash
   npm run linear teams
   ```
   This will list all available teams with their IDs.

4. **Find your Project ID (optional):**
   ```bash
   npm run linear projects
   ```
   This will list all available projects with their IDs.

## Available Commands

### Test Connection
```bash
npm run linear test
```
Verifies your Linear API connection and displays your user info.

### View Your Issues
```bash
npm run linear issues
```
Lists all issues currently assigned to you.

### List Teams
```bash
npm run linear teams
```
Shows all teams you have access to with their IDs.

### List Projects
```bash
npm run linear projects
```
Shows all projects you have access to with their IDs.

### Create Project Structure
```bash
npm run linear setup-project
```
Creates the complete Orion-Redtail integration project structure in Linear with:
- 5 project phases
- 35+ tasks organized under phase parents
- Proper labels and hierarchy

### Create Blocker Issues
```bash
npm run linear create-blockers
```
Creates 7 critical blocker issues that need Orion team responses before Phase 1 can begin.

## Project Tracking Features

The `project-tracker.ts` module provides:

1. **Automated Project Setup:** Creates a complete project structure matching the integration plan phases
2. **Phase Organization:** Groups tasks under parent issues for each project phase
3. **Critical Issue Tracking:** Identifies and creates blocker issues requiring immediate attention
4. **Label Management:** Automatically applies relevant labels (orion-redtail, integration, phase, task, blocker)

## Development

### Build TypeScript
```bash
npm run build
```

### Run in Development Mode
```bash
npm run dev [command]
```

### Run Production Build
```bash
npm run linear [command]
```

## Integration with Project Plan

The Linear integration directly maps to the project plan phases:

| Phase | Duration | Linear Issues Created |
|-------|----------|---------------------|
| Phase 1-2: Data Audit & Cleanup | 2 weeks | 8 tasks |
| Phase 3-4: Duplicate Resolution | 1 week | 8 tasks |
| Phase 5-6: Testing | 1 week | 9 tasks |
| Phase 7: Implementation | 3 weeks | 9 tasks |
| Phase 8-9: Validation | Ongoing | 8 tasks |

## Troubleshooting

### API Key Issues
- Ensure your API key is correctly set in `.env`
- Verify the key has not expired at https://linear.app/settings/api

### Team/Project ID Issues
- Run `npm run linear teams` to get valid team IDs
- Run `npm run linear projects` to get valid project IDs
- Ensure you have access to the selected team/project

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Run `npm run build` to compile TypeScript files
- Check for TypeScript errors in the `src/` directory

## Next Steps

1. Configure your Linear API credentials in `.env`
2. Run `npm run linear test` to verify connection
3. Optionally set team and project IDs
4. Run `npm run linear setup-project` to create project structure
5. Run `npm run linear create-blockers` to add critical blockers
6. Visit Linear to view and manage created issues

## Security Notes

- Never commit `.env` file to version control
- Keep your API key secure and rotate periodically
- Use environment-specific keys for production deployments

---

*Linear SDK integration completed: 2025-08-18*