# Labels

Use labels to categorize issues.

![Linear app showing labels being added to an issue](https://webassets.linear.app/images/ornj730p/production/3a4ffc89117bc3bd582ef96ee1a120607adfa5ad-1688x1325.png?q=95&auto=format&dpr=2)

## Overview

### Labels

Labels allow you to organize issues in a way that doesn't require association with a project or cycle. Labels can be created on the workspace or team level, so they can be scoped to your needs. Workspace-level can be used by all teams. You should create labels that are used by all teams (e.g. "Bug") in the workspace-level.

### Label groups

Label groups create one level of nesting in your workspace and team labels, giving you more options when organizing issues. Each label group is limited to 250 labels.

Please note that labels within groups are _not multi-selectable_, so when applying labels to issues only one label from each group may be applied. 

## Configure

Create and/or manage labels in either the [Settings > Workspace > Labels](https://linear.app/settings/labels) page or _Team settings > Labels_.

### Create a label during add label workflow

You can also create labels in the _Add label_ flow. Take the action to apply a label, then type the name of the label you want to create. The label will be automatically be saved to your team's labels.

If you'd like to create a label or label group directly from the _Add label_ flow, this is available with the syntax `label group`_/`label`_ or `label group:_label_` . For example, using _Type/Bug or Type:Bug_  will create the label group "Type" and the label "Bug".

![Type/Bug syntax being used to create a label in the group "Type" with the label "Bug"](https://webassets.linear.app/images/ornj730p/production/9074377f9a2bda6f688ee1e008ea1c2249581aad-1312x238.png?q=95&auto=format&dpr=2)

### Edit or delete labels

Hover over the label name to bring up the option to edit or delete the label. Deleting a label is not reversible. If a label is in use, you will still be able to delete the label and doing so will remove it from any issues.

### Customize label colors

While creating or editing a label, select the colored dot to bring up a color picker. Select the _#_ option to specify a hex code.

### Convert to workspace label

If you have team labels that need to be converted to a workspace label, simply create a workspace label with the same name and it will convert existing team labels.

You cannot convert a workspace label to a team label.

## Apply a label

Apply labels to any issue with the shortcut `L`.

## Filtering and views

Team-specific labels "act" like workspace labels when filtering All teams or multi-team views. As long as labels in different teams share the same name, filtered results will show all issues across all teams that match the label. This holds true in custom Views, My Issues, Project All team view_s_, and general search (/). Unfortunately, it does not extend to the API (you'll have to use the unique identifier for each team's label).

If you only want to see results for a specific team's labels in a multi-team view, add a team filter on top of the label filter. Creating a workspace label with the same name as existing team label(s), will present the option to convert the team label(s) to the workspace level.

Learn more about [Label views](https://linear.app/docs/label-views) and how to [filter](https://linear.app/docs/filters) for labels.

## Reserved label names

We reserve the following label names that are duplicative of existing features to not cause confusion:

"assignee", "cycle", "effort", "estimate", "hours", "priority", "project", "state", "status",