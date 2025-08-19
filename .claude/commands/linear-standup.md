---
allowed-tools: mcp__linear__list_my_issues, mcp__linear__list_cycles, mcp__linear__get_issue
argument-hint: [date]
description: Generate daily standup report from Linear
---

Generate standup report for: ${ARGUMENTS:-today}

Create a comprehensive standup summary:

## Yesterday's Progress
Issues completed or updated yesterday:
- Issue title and ID
- Status change
- Key accomplishments

## Today's Focus
Issues in progress or planned:
- High priority items first
- Blocked items highlighted
- Dependencies noted

## Blockers & Concerns
- Blocked issues with reasons
- Overdue items
- Resource needs
- Questions for team

## Cycle Progress
- Current cycle day X of Y
- Personal completion rate
- Team velocity status

## Upcoming
- Due this week
- Next milestone
- Reviews needed

Format for easy sharing:
- Slack-compatible markdown
- Concise bullet points
- Clear sections
- Action items highlighted

Auto-detect work patterns:
- Recently active issues
- Status changes
- Comment activity
- PR associations