---
allowed-tools: mcp__linear__list_teams, mcp__linear__list_projects, mcp__linear__list_cycles, mcp__linear__list_my_issues
argument-hint: [scope]
description: Get comprehensive Linear workspace overview
---

Generate Linear workspace overview: ${ARGUMENTS:-all}

## Workspace Summary
High-level metrics:
- Total teams and members
- Active projects count
- Open issues count
- Current cycle week

## My Focus
Personal dashboard:
- Assigned issues count
- Priority distribution
- Overdue items
- Today's priorities

## Team Status
For each active team:
- Current cycle progress
- Velocity trend
- Blocked items
- Team health indicator

## Active Projects
Project portfolio:
- In-progress projects
- Progress percentages
- At-risk projects
- Upcoming milestones

## Key Metrics
- Overall completion rate
- Average cycle velocity
- Issue resolution time
- Backlog growth trend

## Attention Required
Highlight critical items:
- Overdue issues
- Blocked projects
- Stalled items
- Urgent unassigned

## Quick Actions
Suggest next steps:
- Issues to triage
- Reviews needed
- Planning required
- Updates pending

Scope options:
- "my" - Personal focus
- "team" - Team overview
- "all" - Full workspace