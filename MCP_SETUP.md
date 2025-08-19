# MCP (Model Context Protocol) Setup

## Overview
This project uses MCP servers to enhance Claude's capabilities with specialized tools.

## Installed MCP Servers

### 1. Linear MCP Server
- **Purpose**: Direct integration with Linear API for project management
- **Command**: `npx -y mcp-remote https://mcp.linear.app/sse`
- **Capabilities**: 
  - Create and manage Linear issues
  - Query projects and teams
  - Access Linear documentation

### 2. Filesystem MCP Server
- **Purpose**: Enhanced file system operations
- **Command**: `npx -y @modelcontextprotocol/server-filesystem`
- **Installation**: `npm install -g @modelcontextprotocol/server-filesystem`
- **Capabilities**:
  - Advanced file reading and writing
  - Directory operations
  - File searching and pattern matching
  - Batch file operations

## Configuration File
The MCP configuration is stored in `.mcp.json`:

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.linear.app/sse"],
      "description": "Linear MCP server for project management integration",
      "scope": "project"
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/zbk/Development/orion-redtail-project"],
      "description": "Filesystem MCP server for enhanced file operations",
      "scope": "project"
    }
  }
}
```

## Usage Notes

### For Claude Desktop/CLI
1. The MCP servers will automatically start when Claude is launched
2. The filesystem server is scoped to the project directory
3. Linear server requires LINEAR_API_KEY in environment

### Available Commands
- Linear operations will appear as `mcp__linear__*` tools
- Filesystem operations will appear as `mcp__filesystem__*` tools

## Troubleshooting

### If MCP servers don't load:
1. Restart Claude Desktop/CLI
2. Check that npm packages are installed globally
3. Verify `.mcp.json` is in the project root
4. Ensure LINEAR_API_KEY is set for Linear operations

### To test servers manually:
```bash
# Test filesystem server
npx @modelcontextprotocol/server-filesystem /path/to/project

# Test Linear server
npx -y mcp-remote https://mcp.linear.app/sse
```

## Benefits
- **Filesystem MCP**: Faster and more reliable file operations, batch processing
- **Linear MCP**: Direct API access without SDK overhead, real-time Linear data

---
*Last Updated: 2025-08-19*