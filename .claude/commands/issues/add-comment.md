---
allowed-tools: mcp__linear__create_comment, mcp__linear__list_comments, mcp__linear__get_issue
argument-hint: <issue-id> <comment>
description: Add a comment to a Linear issue
---

Add comment to Linear issue: $ARGUMENTS

Parse arguments to extract:
1. Issue ID (first argument)
2. Comment text (remaining arguments)

Steps:
1. Verify the issue exists by fetching its details
2. Show issue title for confirmation
3. Format the comment with proper markdown if needed
4. Add the comment to the issue
5. Optionally show recent comments for context

If the comment contains:
- URLs: Format as markdown links
- Code snippets: Format with code blocks
- @mentions: Preserve for Linear to process

Return confirmation with:
- Issue title and ID
- Comment preview
- Direct link to the issue