---
allowed-tools: mcp__linear__list_projects, mcp__linear__get_project
argument-hint: [team-filter] [include-archived]
description: List all Linear projects with status overview
---

List Linear projects with filters: $ARGUMENTS

Display all projects in an organized format:

## Active Projects
Group by team and show:
- Project name and ID
- Status (planned/started/completed)
- Progress percentage
- Start and target dates
- Lead assignee
- Issue count and completion rate

## Timeline View
Show projects on a timeline:
- Overdue projects (highlighted)
- Currently active
- Upcoming starts
- Recently completed

## Filters Applied
Parse arguments for:
- Team filter
- Include archived (default: false)
- Status filter
- Date range

Sort by:
1. Priority/urgency
2. Target date
3. Team grouping

Include summary statistics:
- Total projects
- Active vs completed
- Average completion rate