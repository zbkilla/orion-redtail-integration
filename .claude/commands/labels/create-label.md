---
allowed-tools: mcp__linear__create_issue_label, mcp__linear__list_issue_labels
argument-hint: <name> [color] [description] [team]
description: Create a new Linear label
---

Create a new Linear label: $ARGUMENTS

Parse arguments:
1. Label name (required)
2. Color (optional - auto-generate if not provided)
3. Description (optional)
4. Team scope (optional - workspace-wide if not specified)

Process:
1. Check if label already exists
2. If color not provided, generate based on:
   - Label name semantics
   - Existing label color scheme
   - Standard category colors (bug=red, feature=blue, etc.)

3. Create label with:
   - Clear, consistent naming
   - Helpful description
   - Appropriate scope
   - Parent group if applicable

Smart defaults:
- "bug" → red color, "Bug report" description
- "feature" → blue color, "New feature request" description
- "urgent" → orange color, "Requires immediate attention" description
- "tech-debt" → yellow color, "Technical debt" description

Return:
- Created label details
- Usage instructions
- Related labels suggestion