# Salesforce

Our Salesforce integration is available as an add-on to our Enterprise plan.

## Overview

The Salesforce integration enables a two-way sync between Salesforce and Linear. Users in Salesforce—regardless of whether or not they use Linear—can effortlessly link cases to existing issues/projects or create new issues using a template from Linear.

Real-time updates ensure Salesforce users stay informed of issue/project status and priority changes as they happen, streamlining collaboration between support and product teams.

> [!NOTE]
> Issue creation is 100% template-driven—ensuring consistency across submissions

## Configure

Configuration of the Salesforce integration has three parts:

### Configure from Linear

1. Navigate to **Settings > Integrations > Salesforce**
2. Click **Enable**
3. Copy the URL from _any_ page from your Salesforce installation
4. Paste the URL in the pop-up box in Linear Settings

### Configure from Salesforce

1. Install the Linear from the Salesforce Marketplace
2. Find the **Linear Development** app from the Salesforce **App Launcher**
3. Click **Login with Linear** to OAuth into Linear
4. Select the Linear workspace you want to connect
5. Confirm the integration _between_ Salesforce and Linear

### Enable the Linear Component

1. Navigate to a case detail from Service Cloud or Sales Cloud
2. Edit the case page
3. Find Linear in the list of Custom components
4. Place the component in the location of your choice on the page

---

## Permissions

Three permission sets will become available in Salesforce:

* **Linear Admin** - This user will have admin permissions in Linear as well and allows full access and configuration rights.
* **Linear create issues** - Can create and/or link issues and/or projects.
* **Linear link-only** - Can only link existing issues. This is useful for large support teams who want more control to issues being created in order to limit noise in Linear.

---

## Settings

### Restrict visibility of issues

Once enabled, only Linear issues that were created or previously linked to Salesforce can be found when searching from the Linear component. This allows teams with privacy concerns to reduce the scope of what’s visible in the Salesforce workspace.

### Internal notes

Notify your team in Salesforce for when an issue in Linear changes to any status. Changes will be added to “All updates” section of a case.

### Automatic case reopen

Once the linked Linear issue is completed or cancelled, you can auto-mate reopening the case with the case status of your choice. This provides a signal to support teams to follow up with customers.

_Case statuses are customizable. If a new case status is created, Linear refresh every time you go into the integration settings page._

### Templates

Once a template has been created in Linear, click the “+” icon to enable a template to Salesforce.

---

## Using the integration

### Create a new issue

1. From within a case details, click the option to **Create issue**
2. Select the template you want to use
3. Include a title
4. Write a new issue description, or enable the toggle called **Include case description** to automatically insert the case description into the Linear issue description. The “Case description” will sync over to Linear as the Customer Request.

### Link to an existing issue or project

1. Click **Link issue or project** (_depending on permission levels_)
2. Search for the issue or project

### Link to a case from Linear

You can also link a Linear issue to a case by pasting the case URL into the Linear issue as a link attachment.

---

## Synced details

### Status and priority

Status and priority data here are always up-to-date.

### User account

If a Salesforce user is also a Linear user, their name will be displayed as creator in relevant issue activity sections. If the user does not have a Linear account, the issue creator will display as “User User” (the name of the Salesforce developer account) and show the email of the Salesforce user who created or linked the issue.

### Customer information

Linear will sync customer information from Salesforce workspace. Currently, we pull in Revenue and Size from the default attributes of the account. Future iterations of this integration will allow for custom attributes for Revenue, Size, and Tier.

---

## FAQ

<details>
<summary>What happens if an issue is marked as a duplicate in Linear?</summary>
The Linear status will say it’s duplicate and it will still link to the original case instead. We do not merge Salesforce cases.
</details>

<details>
<summary>Does this integrate with Sales Cloud?</summary>
Our Salesforce integration does not yet integrate with Sales Cloud, but we aim to support it soon.
</details>