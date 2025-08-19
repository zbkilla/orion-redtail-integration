---
allowed-tools: mcp__linear__update_project, mcp__linear__get_project
argument-hint: <project-id> <updates>
description: Update Linear project properties
---

Update Linear project: $ARGUMENTS

Parse arguments to identify:
1. Project ID or name (first argument)
2. Updates to apply (remaining arguments)

Supported updates:
- "status:" followed by status name
- "lead:" followed by username
- "target:" followed by date
- "start:" followed by date
- "description:" for description update
- "name:" for renaming
- "summary:" for brief summary

Process:
1. Fetch current project state
2. Parse and validate updates
3. Apply changes
4. Show before/after comparison

Special handling:
- Date parsing (natural language support)
- Status validation
- Lead user lookup
- Automatic timeline adjustments

Return:
- Updated project details
- What changed (diff view)
- Impact on timeline
- URL to updated project