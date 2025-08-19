# Members and roles

Admins use the Members page in settings to manage members and assign roles.

## Overview

> [!NOTE]
> This page is only accessible by Admins in the workspace. On Enterprise plans with [SCIM](https://linear.app/docs/scim) enabled, some or all member management will be accomplished through your IdP instead of this settings page.

The Members page, which can be found by going to [Preferences > Administration > Members](https://linear.app/settings/members), shows a list of current and suspended (former) members. Here, you can see all workspace members and filter based on their roles and status: Pending invites, Suspended, or whether they have left the workspace.

## Roles

To manage roles, navigate to the Members page and click the overflow menu next to the member that appears when hovering your cursor over that row.

### Admin

Admins have access to an "Administration" section on their sidebar in the Settings, which allows them to manage many workspace-level configurations like login methods and billing. 

> [!NOTE]
> On free plans, all members of the workspace have Admin privileges. Once a workspace upgrades to a paid plan, the creator of the workspace and/or the member who upgrades the workspace to a paid subscription are granted Admin roles.

#### View your workspace admins

For Members who need to see a list of workspace Admins to get assistance with inviting other members/guests, enable integrations, etc.:

* Open Command menu `Cmd/Ctrl`  `K` and select **View workspace admins**
* Click on [https://linear.app/settings/view-admins](https://linear.app/settings/view-admins)

### Member

Members have full access to issue, project and initiative data in their workspace, excepting data present only in private teams they don't belong to. Members are not able to modify workspace-level settings or see administration pages.

### Guest

> [!NOTE]
> Guest accounts are only available on Business and Enterprise plans.

Guests are given access to one or many teams by admins. They can only access issues, projects, and related documents in the teams they’ve been invited to join. 

They can take the same actions as members on data they can access, but cannot see any workspace-wide features like workspace views, customer requests or initiatives. In settings, Guests can only view the Account section managing personal details and preferences.

#### Sharing projects with guests

When a project is shared between multiple teams, Guests can only see issues  in the project in the team/s they belong to. Issues in the team they do not belong to will not be visible to them.

**For example:** a Guest belongs to team A. Project 1 is shared between teams A and  B. The guest can see the project itself, but inside the project they only see issues associated with Team A.

#### Guests & Integration Security

Integrations that are enabled for the workspace will be accessible to guest users, which means they could access Linear data from teams outside of those they are invited to join through these services.

For integrations built by Linear, these include GitHub, GitLab, Figma, Sentry, Intercom, Zapier, and Airbyte. To avoid leaking data to guests, ensure that guest users do not have access to your accounts on those services. Integrations that require users to authenticate with their email should limit access to only issues and data in invited teams. This includes Slack, Discord, Front, and Zendesk.

The above is applicable to integrations listed and built by the Linear team. For third-party integrations, please review access individually or reach out to the contact listed in the [Integrations directory](https://linear.app/integrations).

## Suspend members

With admin permissions, you can suspend a member from the workspace (most frequently when an employee offboards.)

1. Go to [Settings > Administration > Members](https://linear.app/settings/members)
2. Click on the three dot menu next to the member's name
3. Select **Suspend user...**

The member will be removed from the workspace and unable to access it unless they are unsuspended. Suspended users will be removed from your next bill, as detailed in our Billing [documentation](https://linear.app/docs/billing-and-plans#billing).

There isn't a way to remove or hide suspended members from the member list, but you can filter the list to not show these members. We keep suspended users for historical reasons (they will show up in issues where the user was mentioned or involved) On paid plans, regular members will not see suspended users in the list.

To view issues created by or assigned to suspended users, navigate to the suspended member's profile. You can do this with the direct link `linear.app/workspace-name/profiles/username`. If you do not know the username, an admin can find the link by clicking on the user's photo or filter for "Suspended" members in the [Members](https://linear.app/settings/members) page.