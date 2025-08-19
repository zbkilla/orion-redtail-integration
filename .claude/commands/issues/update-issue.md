---
allowed-tools: mcp__linear__update_issue, mcp__linear__get_issue, mcp__linear__list_issue_statuses
argument-hint: <issue-id> <updates>
description: Update a Linear issue's properties
---

Update Linear issue: $ARGUMENTS

Parse the arguments to identify:
1. Issue ID (first argument)
2. Updates to apply (remaining arguments)

First, fetch the current issue details to show what will change.

Parse update keywords:
- "status:" or "state:" followed by status name
- "assign:" or "assignee:" followed by username
- "priority:" followed by priority level
- "due:" followed by date
- "label:" to add labels
- "description:" to update description
- Any other text updates the title

Apply the updates and show:
- What changed (before → after)
- Updated issue URL
- Any validation warnings

If status change is requested, verify it's valid for the team.