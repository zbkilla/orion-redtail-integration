---
allowed-tools: mcp__linear__list_issue_labels, mcp__linear__list_project_labels
argument-hint: [team] [type]
description: List all available Linear labels
---

List Linear labels: $ARGUMENTS

Display labels organized by:

## Issue Labels
Group by category/parent:
- Label name
- Color (shown as text)
- Description
- Usage count
- Team scope

## Project Labels
- Label name
- Associated projects count
- Description

## Label Organization
Show hierarchy:
- Parent groups
- Child labels
- Ungrouped labels

## Usage Statistics
- Most used labels
- Unused labels (candidates for cleanup)
- Labels by team
- Recent additions

Filters:
- Team-specific (if provided)
- Label type (issue/project)
- Include archived

Visual formatting:
- Group related labels
- Show color indicators
- Highlight workspace-wide labels
- Mark deprecated labels

Provide management suggestions:
- Duplicate labels to merge
- Missing standard labels
- Organizational improvements