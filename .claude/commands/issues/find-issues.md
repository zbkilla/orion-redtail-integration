---
allowed-tools: mcp__linear__list_issues, mcp__linear__get_issue
argument-hint: <search-query> [filters]
description: Search Linear issues with advanced filtering
---

Search for Linear issues matching: $ARGUMENTS

Perform a comprehensive search using the provided query and any additional filters.

Parse the search terms to identify:
- Keywords for text search
- Team names
- Assignee names
- Status filters (open, closed, in progress)
- Label filters
- Date ranges (created, updated)

Display results in a formatted table with:
- Issue key and title
- Assignee
- Status
- Priority
- Labels
- Last updated

If only one result is found, fetch and display full issue details.

Limit results to 50 unless otherwise specified.