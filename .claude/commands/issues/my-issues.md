---
allowed-tools: mcp__linear__list_my_issues
argument-hint: [limit]
description: View your assigned Linear issues
---

Retrieve and display my currently assigned Linear issues.

Limit: ${ARGUMENTS:-25}

Format the output as a clear table showing:
- Issue ID and title
- Current status
- Priority level
- Project/Initiative (if any)
- Due date (if set)
- Days since last update

Sort by priority (urgent first) then by last updated date.

Highlight any overdue items or blockers.