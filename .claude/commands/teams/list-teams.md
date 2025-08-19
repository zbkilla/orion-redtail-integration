---
allowed-tools: mcp__linear__list_teams, mcp__linear__get_team
argument-hint: [include-archived]
description: List all Linear teams with details
---

List all Linear teams: $ARGUMENTS

Display comprehensive team information:

## Active Teams
For each team show:
- Team name and key
- Description
- Member count
- Active issue count
- Current cycle
- Team lead

## Team Metrics
- Issues completed this cycle
- Average cycle velocity
- Backlog size
- Team utilization

## Team Structure
- Parent/child team relationships
- Cross-team dependencies
- Shared projects

Filters:
- Include archived: ${ARGUMENTS:-false}
- Sort by activity level

Highlight:
- Teams with overdue items
- Teams at capacity
- Recently created teams

Provide quick actions:
- View team issues command
- View team members command
- Current cycle status command