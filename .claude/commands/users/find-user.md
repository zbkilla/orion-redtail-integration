---
allowed-tools: mcp__linear__list_users, mcp__linear__get_user
argument-hint: <name-or-email>
description: Find and display Linear user information
---

Find Linear user: $ARGUMENTS

Search for user by name or email and display:

## User Profile
- Full name and display name
- Email address
- Role and permissions
- Avatar URL
- Account status (active/inactive)

## Team Membership
- Primary team
- All team assignments
- Team roles

## Current Workload
- Number of assigned issues
- Issues by priority
- Overdue items
- In-progress count

## Recent Activity
- Last active date
- Recent issue updates
- Comments made
- Issues created

If multiple matches found:
- List all matching users
- Show distinguishing information
- Prompt for clarification

If exact match found:
- Display full profile
- Show contact information
- List current assignments
- Provide quick actions (assign issue, view issues)