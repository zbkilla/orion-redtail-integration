# MCP server

![Abstract image of a drive with Linear's logo and the words "Remote MCP server"](https://webassets.linear.app/images/ornj730p/production/54373418b3cb31208f112cd8137d7dd825d1b7c0-3600x1800.png?q=95&auto=format&dpr=2)

The Model Context Protocol (MCP) server provides a standardized interface that allows any compatible AI model or agent to access your Linear data in a simple and secure way.

Connect to our MCP server natively or by using the [`mcp-remote`](https://github.com/geelen/mcp-remote) module in Cursor, Windsurf, and other clients.

Linear's MCP server follows the authenticated remote [MCP spec](https://modelcontextprotocol.io/specification/2025-03-26), so the server is centrally hosted and managed. The Linear MCP server has tools available for finding, creating, and updating objects in Linear like issues, projects, and comments — with more functionality on the way, and [feedback](https://linear.app/contact/support) on its functionality is welcomed.

## Setup Instructions

> [!NOTE]
> Remote MCP connections are still early and we've found that the connection may fail or require multiple attempts. If you experience issues, try restarting your client or disabling and re-enabling the Linear MCP server.

### Claude

**Team, Enterprise (Claude.ai)**

* Navigate to **Settings** in the sidebar on web or desktop
* Scroll to **Integrations** at the bottom and click **Add more**
* In the prompt enter:
  * Integration name: `Linear`
  * Integration URL: `https://mcp.linear.app/sse`
* Make sure to enable the tools in any new chats

**Free, Pro (Claude desktop)**

1. Open the file `~/Library/Application Support/Claude/claude_desktop_config.json`
2. Add the following and restart the Claude desktop app:

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.linear.app/sse"]
    }
  }
}
```

**Claude Code**

```json
claude mcp add --transport sse linear-server https://mcp.linear.app/sse
```

Then run `/mcp` once you've opened a Claude Code session to go through the authentication flow.

### Cursor

Install [here](cursor://anysphere.cursor-deeplink/mcp/install?name=Linear&config=eyJ1cmwiOiJodHRwczovL21jcC5saW5lYXIuYXBwL3NzZSJ9), or from Cursor's [MCP tools page](https://docs.cursor.com/tools).

### Visual Studio Code

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.linear.app/sse"]
    }
  }
}
```

1. `CTRL/CMD + P` and search for **MCP: Add Server**.
2. Select **Command (stdio)**
3. Enter the following configuration, and hit enter.

`npx mcp-remote https://mcp.linear.app/sse`

1. Enter the name **Linear** and hit enter.
2. Activate the server using **MCP: List Servers** and selecting **Linear**, and selecting **Start Server**.

### Windsurf

1. `CTRL/CMD + ,` to open Windsurf settings.
2. Under Scroll to Cascade -> MCP servers
3. Select **Add Server -> Add custom server**
4. Add the following:

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.linear.app/sse"]
    }
  }
}
```

### Zed

1. `CMD + ,` to open Zed settings.
2. Add the following:

```json
{
  "context_servers": {
    "linear": {
      "command": {
        "path": "npx",
        "args": ["-y", "mcp-remote", "https://mcp.linear.app/sse"],
        "env": {}
      },
      "settings": {}
    }
  }
}
```

### Others

Hundreds of other tools now support MCP servers, you can configure them to use Linear's MCP server with the following settings:

* **Command**: `npx`
* **Arguments**: `-y mcp-remote https://mcp.linear.app/sse`
* **Environment**: None



## FAQ

<details>
<summary>Why am I seeing an internal server error when trying to connect?</summary>
Enter the following in the Terminal to clear saved auth info: `rm -rf ~/.mcp-auth` then try again to connect.  
  
Additionally you may need to update to a newer version of node if required.
</details>

<details>
<summary>I'm using WSL on Windows, and seeing an error</summary>
Try instead to connect using:   
{"mcpServers": {"linear": {"command": "wsl","args": ["npx","-y","mcp-remote","[https://mcp.linear.app/sse](https://mcp.linear.app/sse)","--transport sse-only"]}}}
</details>

<details>
<summary>Does the MCP support Streamable HTTP?</summary>
Yes, at the [`https://mcp.linear.app/mcp`](https://mcp.linear.app/mcp) endpoint
</details>

<details>
<summary>Can I authenticate with my own API keys or OAuth access tokens?</summary>
Not currently. 

Our MCP server follows the [spec](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization) for authentication using OAuth with dynamic client registration. That auth flow is not explicitly supported by most client libraries. FastMCP is an example of one that _does_ [support](https://github.com/jlowin/fastmcp/blob/9bbca0886226e61c06fd553ab8164296139f4b9a/docs/python-sdk/fastmcp-client-auth-oauth.mdx#L54) it; if your client supports stdio MCPs, you can also use `mcp-remote`. 

Either one will open a browser window for authentication, so they aren't a great fit for deployed applications. Manually copying around tokens obtained by these tools into headers may work, but these tokens will expire regularly, it's not recommended. Allowing you to pass through your own OAuth access tokens / API keys is something we're exploring, but it's not specced or implemented at the moment.
</details>