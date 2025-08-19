# Linear MCP Custom Commands

## Overview
This directory contains custom slash commands for Linear operations using the MCP (Model Context Protocol) integration. Commands are organized by functional area and designed for maximum productivity.

## Command Structure
```
/command-name [arguments]
```

## Available Commands

### Issue Management (`/issues/`)
- `/create-issue <title> [team] [assignee]` - Create new Linear issue with smart defaults
- `/my-issues [limit]` - View your assigned Linear issues
- `/find-issues <search-query> [filters]` - Search issues with advanced filtering
- `/update-issue <issue-id> <updates>` - Update issue properties
- `/add-comment <issue-id> <comment>` - Add comment to an issue
- `/issue-status <issue-id>` - Get comprehensive issue status

### Project Management (`/projects/`)
- `/create-project <name> <team> [description]` - Create new project with setup
- `/list-projects [team-filter] [include-archived]` - List all projects with overview
- `/project-status <project-name-or-id>` - Get detailed project metrics
- `/update-project <project-id> <updates>` - Update project properties

### Team & Cycles (`/teams/`, `/cycles/`)
- `/list-teams [include-archived]` - List all teams with details
- `/team-details <team-name-or-key>` - Get comprehensive team information
- `/current-cycle <team-id> [type]` - View cycle status for a team

### Users (`/users/`)
- `/find-user <name-or-email>` - Find and display user information

### Labels (`/labels/`)
- `/create-label <name> [color] [description] [team]` - Create new label
- `/list-labels [team] [type]` - List all available labels

### Documentation (`/docs/`)
- `/search-docs <search-query>` - Search Linear's official documentation
- `/list-documents [query] [filters]` - List workspace documents
- `/get-document <document-id-or-slug>` - Retrieve and display document

### Quick Actions (root level)
- `/linear-quick-add <title>` - Quickly add issue with smart defaults
- `/linear-standup [date]` - Generate daily standup report
- `/linear-sprint-plan <team> [cycle]` - Plan next sprint with recommendations
- `/linear-overview [scope]` - Get comprehensive workspace overview

## Command Features

### Smart Defaults
Commands intelligently parse arguments to:
- Auto-detect teams and assignees
- Set priorities based on keywords
- Apply relevant labels
- Parse natural language dates

### Argument Hints
Each command provides helpful argument hints showing expected parameters:
- Required arguments in `<brackets>`
- Optional arguments in `[brackets]`
- Multiple values separated by spaces

### Batch Operations
Many commands support bulk operations and smart filtering to work with multiple items efficiently.

### Contextual Actions
Commands provide relevant follow-up actions and related commands based on results.

## Usage Examples

```bash
# Create a high-priority bug
/create-issue Critical bug in payment system

# View your current work
/my-issues 10

# Update issue status
/update-issue ISS-123 status:in-progress assign:john

# Quick add with smart parsing
/linear-quick-add Fix login bug #urgent @jane by Friday

# Generate standup
/linear-standup

# Search for specific issues
/find-issues payment bug team:backend status:open
```

## Best Practices

1. **Use Quick Commands**: For common tasks, use the quick action commands
2. **Leverage Smart Parsing**: Natural language in arguments is often understood
3. **Chain Commands**: Combine commands for workflows (create → assign → comment)
4. **Filter Wisely**: Use filters to narrow results for better performance

## Configuration

Commands use these MCP tools:
- `mcp__linear__*` - All Linear API operations

Commands respect:
- Workspace permissions
- Team access controls
- User roles and capabilities

## Customization

To create your own commands:
1. Add `.md` file to appropriate subfolder
2. Include frontmatter with:
   - `allowed-tools`: Required MCP tools
   - `argument-hint`: Expected arguments
   - `description`: Brief description
3. Write clear prompt with `$ARGUMENTS` placeholder

## Support

For issues or suggestions:
- Check Linear API documentation
- Review MCP integration status with `/mcp`
- Verify Linear API key is configured

---
*Generated: 2025-08-19*
*Total Commands: 24*