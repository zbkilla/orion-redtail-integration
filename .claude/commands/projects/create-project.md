---
allowed-tools: mcp__linear__create_project, mcp__linear__list_teams, mcp__linear__list_users
argument-hint: <name> <team> [description]
description: Create a new Linear project with setup
---

Create a new Linear project: $ARGUMENTS

Parse arguments to extract:
- Project name (required)
- Team assignment (required)
- Description/summary (optional)

Setup process:
1. Verify team exists or select appropriate team
2. Create project with:
   - Clear, descriptive name
   - Comprehensive description
   - Appropriate start/target dates based on context
   - Initial status set to "planned"
   
3. Suggest initial setup:
   - Recommended labels
   - Suggested milestones
   - Team lead assignment
   
4. Return:
   - Project URL and ID
   - Quick start guide for next steps
   - Command to add issues to the project

Set intelligent defaults based on project name keywords (MVP, Phase 1, Q1, etc.)