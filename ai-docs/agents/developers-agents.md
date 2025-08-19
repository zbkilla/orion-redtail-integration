# Developing agents

This guide describes how to best integrate an AI agent into Linear. It includes implementation guidelines on how to design an experience that feels native to Linear’s workflows and interaction patterns.

**Developer Preview**

Linear for Agents APIs are currently in active development and available as a Developer Preview. Functionality and Agent APIs may change before general availability. 

## Overview

Agents behave similar to other users in a workspace. They can be @mentioned, delegated issues through assignment, create and reply to comments, collaborate on projects and documents, etc. App users are installed and managed by workspace admins.

You can build agents for internal use within your own workspace or for distribution to other organizations. It does not cost anything to develop agents in Linear. To make your agent available to other workspaces, [submit](https://linear.app/docs/integration-directory#submit-your-integration) your agent to Linear's integration directory.

Additionally, agents installed in your workspace do not count as billable users.

> [!NOTE]
> **Sample agent**
> We've created a demo agent built on our Typescript SDK and Cloudflare, if you want to dive straight into an example codebase. 
> 
> [Weather Bot](https://github.com/linear/weather-bot) is an agent that will help you look up the weather of any location within a Linear issue.

## Setup

Create a new [Application](https://linear.app/settings/api/applications/new) and configure the settings as you would for a standard OAuth application.

In the configuration, enable webhooks and make sure to select **Agent session events** at the bottom. Enabling this category will notify your webhook when events occur that are directly relevant to your app's user.

> [!NOTE]
> Note that the name and icon of your application will be how the agent appears in workspaces where it is installed (e.g. in the mention and filter menus), so it is best to choose something short, recognizable, but unique.

## Authentication

### Actor and scopes

App authentication is built on top of the standard [OAuth2](https://linear.app/developers/oauth-2-0-authentication) flow. To install your agent into a Linear workspace in the OAuth authorization url add the `actor=app` parameter to switch to an app installation rather than requesting authentication as the installing user. Because this will be installed with a workspace scope _admin permissions are required_ to complete the installation.

This new actor type supersedes any references to `actor=application` and can be used for all agent, app, and service account use-cases.

#### Mention + assign scopes

To allow for flexibility, the ability to mention and assign your agent is optional and must be requested through the use of two new additional scopes added to the `scope` query parameter:

Scope | Description
--- | ---
app:assignable | Allow the app to be assigned as a delegate on issues and made a member of projects
app:mentionable | Allow the app to be mentioned in issues, documents, and other editor surfaces

Assigning an issue to your app now sets it as the `delegate`, not the `assignee`—so humans maintain ownership while agents act on their behalf.

#### Customer access scopes

The ability to access customer-related entities in your workspace for your agent must be requested through scopes:

Scope | Description
--- | ---
customer:read | Allow the app to read customer data in the workspace
customer:write | Allow the app to read and write customer data in the workspace

#### Initiative access scopes

The ability to access initiative-related entities in your workspace for your agent must be requested through scopes:

Scope | Description
--- | ---
initiative:read | Allow the app to read initiative data in the workspace
initiative:write | Allow the app to read and write initiative data in the workspace

#### Admin

Note that integrations using the `actor=app` mode are not able to also request `admin` scope.

### Installation

Your app will have a _unique ID for each workspace_ it is installed within, you can find this ID with the following query using the OAuth access token received as part of the installation flow:

```graphql
query Me {
  viewer {
    id
  }
}
```

We highly recommend storing this ID alongside your access token so that you can confidently identify your app in different workspaces.

### Management

The team access available to your app can be changed or revoked at any time by workspace admins. If you're subscribed to the **Permission changes** webhook category, a `PermissionChange` webhook will be sent when access changes occur.

## Agent Interaction

Agent status and activity can be surfaced natively in Linear through two main primitives:

### Agent Session

`AgentSession` tracks the lifecycle of an agent run. Session states let the user know if the agent is currently working, waiting for user input, in an error state, or has finished work. An `AgentSession` is created automatically when an agent is mentioned or delegated an issue. 

#### Agent Session State

Agent sessions can have one of 5 states: `pending`, `active`, `error`, `awaitingInput`, `complete`. These will be visible to users.

You don’t need to manage agent session state manually. Linear tracks session lifecycle automatically based on the last emitted activity. 

### Agent Activity

Agents communicate progress by emitting semantic agent activities to an `AgentSession`. These activities can represent thoughts, tool calls, prompts for clarification, final responses, or errors.

### Agent Session Webhooks

An `AgentSession` webhook is sent to notify your agent when it's mentioned, delegated an issue through assignment, or when a user provides additional prompts. 

To receive these events, enable the agent session events webhooks category in your OAuth application configuration. 

You must acknowledge receipt of a webhook within 5 seconds.

> [!NOTE]
> Once you subscribe to `AgentSessionEvent` webhooks, customers will begin seeing Agent Session UI in Linear. This happens as soon as the event category is enabled, even if you’re only listening for debugging purposes.
> 
> If you receive a `created` event, you are expected to respond within the 10 seconds to avoid the session being marked as unresponsive.

#### Agent Session Webhook Events

`AgentSessionEvent` webhooks only send events to your specific agent. 

There will be two types of actions in the `AgentSessionEvent` category, denoted by the action field of the payload:

Action | Behavior
--- | ---
created | A new Agent Session has been created (triggered by a user mention or delegation). You should start a new agent loop in response. Relevant input may be included in the agentSession.issue, agentSession.comment, or agentSession.previousComments body. Your agent can use all of this context to determine what action to take. 
prompted | A user sent a new message into an existing Agent Session. You should insert that message into the conversation history and take action. You should mainly pay attention to the `agentActivity` field’s body, as the user’s input is usually located there.

**View Session on External URL**

You can set an `externalUrl` on an `AgentSession` so users can open the current session on your web dashboard.

Use the [`agentSessionUpdateExternalUrl`](https://studio.apollographql.com/public/Linear-API/variant/current/schema/reference/objects/Mutation?query=AgentSessionUpdate#agentSessionUpdateExternalUrl) mutation to set this value. Pass `null` to remove it.

![Agent Session UI showing an Open button that links to the session’s external URL, allowing users to view the session in the agent provider’s dashboard.](https://webassets.linear.app/images/ornj730p/production/7910d30de48f26d50ca543ee91b4f2d61fa71096-2880x1434.png?q=95&auto=format&dpr=2)

### Sending Agent Activities

Agents should communicate progress by emitting Agent Activities to Linear. These activities can represent thoughts, actions, prompts for clarification, final responses, or errors.

You can emit activities using either the TypeScript SDK or a direct GraphQL mutation:

**TypeScript SDK**

```ts
const { success, agentActivity } = await linearClient.createAgentActivity({
  agentSessionId: "...",
  content: {
    type: "...", 
    ... // other payload fields - see below
  },
});
```

**GraphQL**

```graphql
# Operation
mutation AgentActivityCreate($input: AgentActivityCreateInput!) {
  agentActivityCreate(input: $input) {
    success
    agentActivity {
      ...
    }
  }
}

# Variables
{
	"input": {
		"agentSessionId": "...",
		"content": {
			"type": "...",
			... # other payload fields - see below
		} 
	}
}
```

```graphql
# Variables
{
	"input": {
		"agentSessionId": "...",
		# Shape of content varies by activity type
		# See below for more details
		"content": {
			"type": "...",
			... # other payload fields
		} 
	}
}
```

#### Activity Content Payload

Your agent may emit one of five allowed activity types. These are validated server-side, and invalid shapes will be rejected. Unless otherwise noted, all fields shown are required. Markdown is supported in `body` fields.

<details>
<summary>thought</summary>
A thought or internal note.

```json
{
  "content": {
    "type": "thought",
    "body": "The user asked about the weather."
  }
}
```
</details>

<details>
<summary>elicitation</summary>
Requests clarification or confirmation from the user.

```json
{
  "content": {
    "type": "elicitation",
    "body": "Where are you located? I will find the current weather for you"
  }
}
```
</details>

<details>
<summary>action</summary>
Describes a tool invocation. You may optionally include a result if the action has completed.

Without result (starting an action):

```json
{
  "content": {
    "type": "action",
    "action": "Searching",
    "parameter": "San Francisco Weather",
    // "result": undefined (optional)
  }
}
```

With result (after completion):

```json
{
  "content": {
    "type": "action",
    "action": "Searched",
    "parameter": "San Francisco Weather",
    "result": "12°C, mostly clear" // Markdown OK
  }
}
```
</details>

<details>
<summary>response</summary>
Indicates work has been completed or a final result is available.

```json
{
  "content": {
    "type": "response",
    "body": "The weather in San Francisco is currently **foggy**, no surprise there."
  }
}
```
</details>

<details>
<summary>error</summary>
Used to report an error or failure.

```json
{
  "content": {
    "type": "error",
    "body": "Out of credits. [Pay up!](https://agent.com/pay)"
  }
}
```
</details>

Additionally, you may see references to a `prompt` type `AgentActivity`. That is a user-generated message, usually as a follow-up prompt or responding to an elicitation. These are the messages that emit a `prompted` webhook to you on creation.

An agent cannot generate a `prompt` type activity.

#### Agent Activity Signals

Agent Activity Signals are optional modifiers that give your agent additional context on how to interpret or handle an activity.

A signal is metadata set by either an agent or a human user that tells the recipient how to respond—effectively communicating the sender’s intent beyond just reading the content.

##### Prompt Signals

Agents will receive the `signal` field as part of their `prompted` webhook payload.

Signal | Description
--- | ---
stop | Applies to prompt-type activities sent by users. Indicates the user is instructing the agent to stop work immediately. 

The agent should disengage and respond with a final activity (response or error) to confirm it has stopped and communicate its current state.

##### Agent Signals

Agents can include a `signal` when emitting an Agent Activity by setting it alongside the `content` field.

Signal | Description
--- | ---
continue | Applies to response-type activities emitted by agents. Indicates the response should not transition the session to a terminal state. 

> [!NOTE]
> Avoid using this signal unless necessary, to prevent unnecessary session updates or notifications.

## Interaction best practices

Linear users have high expectations for the quality and consistency of the experience inside Linear. We aim to extend this to agents, which should act in a predictable and natural manner.

### Recommendations

Upon receiving the `created` webhook, your agent should respond immediately with a `thought` activity to acknowledge that the agent has started working. This lets the user know right away that their prompt has been received.  

> [!NOTE]
> The first response must be sent within 10 seconds of receiving the `created` event, or the agent will be shown as unresponsive. 
> 
> Follow-up activities after the first response can still be sent for up to 30 minutes before the session is considered stale. Note that this stale state is recoverable by sending another agent activity.

If your agent is delegated to work on an issue that is not in a `started`, `completed`, or `canceled` status type, move the issue to the first status in `started` when your agent begins work.

When work is complete, emit an `AgentActivity` with type `response`; or if you require additional actions from the user, emit an `AgentActivity` with type `elicitation` or `error`. We will automatically create a comment under the comment thread as well.

#### Agent Activities

<details>
<summary>GraphQL</summary>
```graphql
query AgentSession($agentSessionId: String!) {
  agentSession(id: $agentSessionId) {
    activities {
      edges {
        node {
          updatedAt
          content {
            ... on AgentActivityThoughtContent {
              body
            }
            ... on AgentActivityActionContent {
              action
              parameter
              result
            }
            ... on AgentActivityElicitationContent {
              body
            }
            ... on AgentActivityResponseContent {
              body
            }
            ... on AgentActivityErrorContent {
              body
            }
	        ... on AgentActivityPromptContent {
              body
            }
          }
        }
      }
    }
  }
}
```
</details>

<details>
<summary>TypeScript SDK (53.0.0+)</summary>
```ts
// @linear/sdk@^53.0.0
const agentSessionActivities = await agentSession.activities();
agentSessionActivities.nodes.forEach(activity => {
	switch (activity.content.__typename) {
		// type narrowing
		case "AgentActivityThoughtContent":
			const { body } = activity.content;
			...
			break;
		case "AgentActivityActionContent":
			const { action, parameter, result } = activity.content;
			...
			break;
		case "AgentActivityElicitationContent":
			const { body } = activity.content;
			...
			break;
		case "AgentActivityResponseContent":
			const { body } = activity.content;
			...
			break;
		case "AgentActivityErrorContent":
			const { body } = activity.content;
			...
			break;
		case "AgentActivityPromptContent":
			const { body } = activity.content;
			...
			break;
		default:
			throw Error("Not reachable")
	}
})
```
</details>

> [!NOTE]
> Comments may not be reliable to read from, as they are editable and may have changed since your agent’s last run. Agent Activities are frozen-in-time snapshots of user input. To reconstruct the full conversation, list the Agent Activities associated with the Agent Session instead—see above for examples.

## Additional Webhooks

In addition to the core `AgentSession` webhooks, there are additional webhooks that your agent can listen to in order to build a richer agent experience within Linear. In addition, you can utilize any of the existing GraphQL APIs.

#### Inbox Notifications Webhooks

Inbox Notification events are triggered when something directly involves your app user—like when an agent is unassigned from an issue or a user reacts to a comment from the agent. 

Enable this category by selecting **Inbox Notifications** in your OAuth app config.

The received webhook payload will have the following shape:

```json
{
  type: "AppUserNotification",
  action: NotificationType,
  createdAt: string,
  organizationId: string,
  oauthClientId: string,
  appUserId: string,
  notification: Notification,
}
```

Here are a few action types that could be useful while developing your agent:

```md
issueMention
issueEmojiReaction
issueCommentMention
issueCommentReaction
issueAssignedToYou
issueUnassignedFromYou
issueNewComment
issueStatusChanged
```

#### Permission Change Webhooks

Permission Change events are triggered when your agent gains or loses access to a team.

Enable this category by selecting **Permission changes** in your OAuth app config. The webhook will be of type `PermissionChange` with action `teamAccessChanged`.

The received webhook payload will have the following shape when team access is granted or removed:

```json
{
  type: "PermissionChange",
  action: "teamAccessChanged",
  createdAt: string,
  organizationId: string,
  oauthClientId: string,
  appUserId: string,
  canAccessAllPublicTeams: boolean,
  addedTeamIds: string[],
  removedTeamIds: string[],
  webhookTimestamp: number,
  webhookId: string
}

```

You’ll receive a separate webhook when revoking your OAuth app:

```json
{
  type: "OAuthApp",
  action: "revoked",
  createdAt: string,
  organizationId: string,
  oauthClientId: string,
  webhookTimestamp: number,
  webhookId: string
}

```

## Existing integrations

### When to build an integration or agent

If your integration primarily reads data from Linear or performs actions that should be attributed to individual team members, an integration is the right choice.

Build an agent if you want your application to appear as a distinct workspace member with its own identity and actions within Linear. 

### Convert an existing integration

If you have an existing Linear integration it can be converted to use the new authentication and gain the new functionality.

The new `actor=app` actor type works quite differently at the core to our legacy `actor=application` approach. However, if you are using `actor=application` today to request a token that is _only_ used to create issues or comments as an app, then it is backwards compatible – you can simply change this parameter.

`actor=application` allows for dual-purpose authentication tokens that can be used both as the authenticating user in some circumstances and as an "app" in others. If you currently are using a token like this, then to migrate you will need to ask users to authenticate twice: once for their personal access and secondarily for the app installation.

## Feedback, requests, questions

Please join the **#api-agents** channel in our [community Slack](https://linear.app/join-slack) to provide feedback on this guide, request API's, and interact with other engineers developing agentic integrations.