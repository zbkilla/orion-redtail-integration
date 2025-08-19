---
allowed-tools: mcp__linear__list_cycles, mcp__linear__list_issues
argument-hint: <team-id> [type]
description: View current cycle status for a team
---

Display cycle information for team: $ARGUMENTS

Cycle type: ${ARGUMENTS[1]:-current}  # current, previous, or next

## Cycle Overview
- Cycle name and number
- Start and end dates
- Days remaining
- Progress percentage

## Issue Summary
- Total planned issues
- Completed issues
- In progress
- Not started
- Added during cycle (scope creep)

## Priority Breakdown
- Urgent items status
- High priority progress
- Normal priority items
- Low priority/nice-to-have

## Team Performance
- Velocity comparison to previous cycles
- Completion trend
- Burndown chart (text representation)
- At-risk items

## Key Metrics
- Average issue completion time
- Blocked items count
- Carry-over from previous cycle
- Scope changes

## Recommendations
- Focus areas for remaining days
- Items to de-scope if needed
- Resource reallocation suggestions

For "next" type: Show planned items and readiness score
For "previous" type: Show retrospective data and learnings