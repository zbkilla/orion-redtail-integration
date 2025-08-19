---
allowed-tools: mcp__linear__create_issue, mcp__linear__list_teams, mcp__linear__list_users
argument-hint: <title> [team] [assignee]
description: Create a new Linear issue with smart defaults
---

Create a new Linear issue with the following details:

Title: $ARGUMENTS

If a team name is not provided in the arguments, first list available teams and select the most appropriate one based on the issue title.

If an assignee is mentioned, look them up and assign the issue appropriately.

Add a clear description that expands on the title, explaining the context and requirements.

Set appropriate priority based on keywords (urgent, critical, bug = high priority).

Return the created issue URL and ID for reference.