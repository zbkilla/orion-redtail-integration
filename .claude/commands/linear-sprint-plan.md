---
allowed-tools: mcp__linear__list_cycles, mcp__linear__list_issues, mcp__linear__update_issue, mcp__linear__get_team
argument-hint: <team> [cycle]
description: Plan next sprint with issue recommendations
---

Plan sprint for team: $ARGUMENTS

Generate intelligent sprint planning:

## Cycle Information
- Next cycle dates
- Working days available
- Team capacity

## Carryover Analysis
Items from current cycle:
- Incomplete issues to carry
- Blocked items to resolve
- Nearly complete items

## Backlog Prioritization
Recommend issues for next sprint:
- High priority items
- Dependencies considered
- Size estimates balanced
- Team capacity matched

## Suggested Sprint Scope
Organized by priority:
1. Must Have (critical path)
2. Should Have (important)
3. Nice to Have (if capacity)

## Risk Assessment
- Dependencies on other teams
- Technical blockers
- Resource constraints
- Historical velocity considered

## Load Balancing
- Issues per team member
- Skill matching
- Availability considered
- Even distribution

## Sprint Goals
Suggest 2-3 clear goals based on:
- Product priorities
- Technical debt
- Team objectives

Output sprint plan ready for team review with specific issue IDs and assignments.