# Linear API Quick Reference Index
*Optimized for rapid API lookup and code generation*

## 🚀 Most Common API Operations

### Authentication Setup
```typescript
// Personal API Key
Authorization: lin_api_xxxxxxxxxxxx

// OAuth Bearer Token  
Authorization: Bearer xxxxxxxxxxxx

// SDK Client
import { LinearClient } from '@linear/sdk';
const client = new LinearClient({ apiKey: 'lin_api_xxx' });
```
📖 **Docs**: [GraphQL Auth](developers-graphql.md) | [OAuth](developers-oauth-2-0-authentication.md) | [SDK](developers-sdk.md)

---

## 📊 Core Operations Matrix

| Operation | GraphQL Query/Mutation | SDK Method | Webhook Event |
|-----------|------------------------|------------|---------------|
| **List Issues** | `query { issues(first: 50) { ... } }` | `client.issues()` | - |
| **Get Issue** | `query { issue(id: "...") { ... } }` | `client.issue("id")` | - |
| **Create Issue** | `mutation { issueCreate(input: {...}) }` | `client.createIssue({...})` | `Issue.create` |
| **Update Issue** | `mutation { issueUpdate(id: "...", input: {...}) }` | `issue.update({...})` | `Issue.update` |
| **Delete Issue** | `mutation { issueDelete(id: "...") }` | `issue.delete()` | `Issue.delete` |
| **Archive Issue** | `mutation { issueArchive(id: "...") }` | `issue.archive()` | `Issue.update` |

📖 **Deep Dive**: [GraphQL](developers-graphql.md) | [SDK Operations](developers-sdk-fetching-and-modifying-data.md) | [Webhooks](developers-webhooks.md)

---

## 🔍 Query Patterns

### Filtering
```graphql
query {
  issues(
    filter: { 
      state: { name: { eq: "In Progress" } }
      assignee: { email: { eq: "user@example.com" } }
    }
  ) { ... }
}
```
📖 **Docs**: [Filtering](developers-filtering.md)

### Pagination
```graphql
query {
  issues(first: 50, after: "cursor_string") {
    nodes { ... }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```
📖 **Docs**: [Pagination](developers-pagination.md)

### Including Relations
```graphql
query {
  issue(id: "...") {
    id
    title
    assignee { name email }
    project { name }
    team { name }
    labels { nodes { name } }
  }
}
```

---

## 🎯 Common Use Cases

### 1. Create Issue with Full Details
```typescript
// SDK
const issue = await client.createIssue({
  title: "Bug: Login fails",
  description: "Users cannot login...",
  teamId: "team_id",
  priority: 1, // Urgent
  labelIds: ["label1", "label2"],
  assigneeId: "user_id",
  projectId: "project_id"
});
```
📖 **Docs**: [SDK Create](developers-sdk-fetching-and-modifying-data.md) | [Creating Issues](docs-creating-issues.md)

### 2. Bulk Update Issues
```typescript
// SDK
const issues = await client.issues({ 
  filter: { state: { name: { eq: "Todo" } } } 
});

for (const issue of issues.nodes) {
  await issue.update({ 
    stateId: "in_progress_state_id" 
  });
}
```

### 3. Subscribe to Issue Changes
```typescript
// Webhook Registration
{
  url: "https://your-app.com/webhook",
  resourceTypes: ["Issue", "Comment"],
  teamId: "team_id"
}

// Webhook Handler
app.post('/webhook', (req, res) => {
  const { action, data, type } = req.body;
  if (type === 'Issue' && action === 'create') {
    // Handle new issue
  }
});
```
📖 **Docs**: [Webhooks](developers-webhooks.md) | [SDK Webhooks](developers-sdk-webhooks.md)

### 4. File Upload
```typescript
// 1. Request upload URL
const uploadUrl = await client.fileUpload({
  filename: "screenshot.png",
  contentType: "image/png",
  size: 1024000
});

// 2. Upload to S3
await fetch(uploadUrl.uploadUrl, {
  method: 'PUT',
  body: fileBuffer,
  headers: uploadUrl.headers
});

// 3. Attach to issue
await client.attachmentCreate({
  issueId: "issue_id",
  url: uploadUrl.assetUrl
});
```
📖 **Docs**: [File Upload](developers-how-to-upload-a-file-to-linear.md) | [Attachments](developers-attachments.md)

---

## ⚡ Performance & Limits

### Rate Limits
| Authentication | Limit | Window |
|----------------|-------|--------|
| OAuth App | 1500 requests | 1 hour |
| Personal API Key | 3000 requests | 1 hour |

📖 **Docs**: [Rate Limiting](developers-rate-limiting.md)

### Pagination Defaults
- Default page size: **50**
- Maximum page size: **250**
- Use cursor-based pagination for large datasets

📖 **Docs**: [Pagination](developers-pagination.md)

### Best Practices
1. **Batch operations** when possible
2. **Use webhooks** instead of polling
3. **Filter queries** to reduce payload size
4. **Cache** frequently accessed data
5. **Handle errors** with exponential backoff

---

## 🔴 Error Handling

### Common Error Codes
| Code | Meaning | Action |
|------|---------|--------|
| 400 | Bad Request | Check query syntax |
| 401 | Unauthorized | Verify API key |
| 403 | Forbidden | Check permissions |
| 404 | Not Found | Verify resource ID |
| 429 | Rate Limited | Implement backoff |
| 500 | Server Error | Retry with backoff |

### SDK Error Handling
```typescript
try {
  const issue = await client.issue("invalid_id");
} catch (error) {
  if (error.type === 'NetworkError') {
    // Retry logic
  } else if (error.type === 'InvalidInput') {
    // Fix input
  }
}
```
📖 **Docs**: [SDK Errors](developers-sdk-errors.md)

---

## 🔄 Webhook Events

### Event Types
- `*.create` - Resource created
- `*.update` - Resource updated  
- `*.delete` - Resource deleted
- `*.archive` - Resource archived
- `*.unarchive` - Resource restored

### Payload Structure
```json
{
  "action": "create|update|delete",
  "type": "Issue|Project|Comment|...",
  "data": { /* resource data */ },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "organizationId": "org_id",
  "webhookId": "webhook_id"
}
```

### Signature Verification
```typescript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return hash === signature;
}
```
📖 **Docs**: [Webhooks](developers-webhooks.md)

---

## 🛠️ Advanced Patterns

### Optimistic Updates
```typescript
// Update UI immediately
setIssueState('completed');

// Then sync with API
try {
  await issue.update({ stateId: 'completed_id' });
} catch (error) {
  // Rollback UI on failure
  setIssueState('previous_state');
}
```

### Batch Creating Issues
```typescript
const issueInputs = [
  { title: "Task 1", teamId },
  { title: "Task 2", teamId },
  { title: "Task 3", teamId }
];

const issues = await Promise.all(
  issueInputs.map(input => client.createIssue(input))
);
```

### Real-time Sync Pattern
```typescript
// 1. Initial fetch
const issues = await client.issues();

// 2. Subscribe to updates
webhookSubscribe({
  resourceTypes: ['Issue'],
  callback: (event) => {
    if (event.action === 'update') {
      updateLocalCache(event.data);
    }
  }
});
```

---

## 📚 Quick Links

### Essential Documentation
- [GraphQL API](developers-graphql.md) - Core API reference
- [SDK Overview](developers-sdk.md) - TypeScript SDK
- [Webhooks](developers-webhooks.md) - Real-time events
- [Rate Limiting](developers-rate-limiting.md) - API limits
- [OAuth 2.0](developers-oauth-2-0-authentication.md) - App authentication

### Common Integrations
- [GitHub](docs-github.md) - PR and commit sync
- [Slack](docs-slack.md) - Notifications
- [Sentry](docs-sentry.md) - Error tracking
- [Figma](docs-figma.md) - Design linking

### Migration & Upgrades
- [SDK v1 → v2](developers-migrating-from-1-x-to-2-x.md)
- [Jira → Linear](docs-jira-to-linear.md)
- [GitHub → Linear](docs-github-to-linear.md)

---

*Quick Reference v1.0 | Optimized for developers building Linear integrations*