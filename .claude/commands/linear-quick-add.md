---
allowed-tools: mcp__linear__create_issue, mcp__linear__list_teams, mcp__linear__list_my_issues
argument-hint: <title>
description: Quickly add a Linear issue with smart defaults
model: claude-3-5-haiku-20241022
---

Quick add Linear issue: $ARGUMENTS

Intelligently create an issue with minimal input:

1. Parse the title for:
   - Priority indicators (urgent, ASAP, critical)
   - Team mentions (@team-name)
   - Assignee mentions (@username)
   - Label hints (#bug, #feature)
   - Due date hints (by Friday, next week)

2. Auto-detect:
   - Most appropriate team based on context
   - Issue type from keywords
   - Priority level
   - Relevant labels

3. Set smart defaults:
   - Assign to me if no assignee specified
   - Current cycle if applicable
   - Standard template based on type

4. Create with single confirmation

Return: Issue ID and URL for quick access

This command optimizes for speed over configuration.