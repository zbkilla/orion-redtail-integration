# Product Intelligence

Assign and route issues with confidence by using LLMs to suggest issue properties and relationships.

> [!NOTE]
> Available on our [Business](https://linear.app/pricing) and [Enterprise](https://linear.app/pricing) plans.

![Hero image showing the product intelligence pane underneath issue title](https://webassets.linear.app/images/ornj730p/production/d2fb7ac8794718a14ba545a5ba2915e53ef5f84d-1364x502.png?q=95&auto=format&dpr=2)

## Configure

Enable Product Intelligence by navigating to Settings > Product Intelligence and toggling the feature on; this will enable the feature for every team. Taking this action requires admin permissions.

In teams where the functionality won't be useful, turn it off in that team's individual  Product Intelligence settings. Or, if the scope of suggestions should be limited to that team and its sub-teams (don't suggest related issues in other teams, for example), set that behavior in the "Include suggestions from" menu. 

## Triage suggestions

Product Intelligence automates the time consuming assessment and routing steps required when triaging issues. 

When enabled, issues in your workspace are analyzed by agentic models. Every future issue that entering triage is assessed against the rest of your data. This allows Product Intelligence to proactively surface suggested issue properties and relationships. Accept, decline, or view more information about why a suggestion was made before making a decision. Properties suggested include teams, projects, assignees, and labels.

### Issue property suggestions

![Assignee suggestion detail explaining why the suggestion was made](https://webassets.linear.app/images/ornj730p/production/80106a08f7e6c3581b0dd8aa282223d2fad57aeb-1200x682.png?q=95&auto=format&dpr=2)

As organizations scale, questions like "who should work on this" or "what labels are usually applied in these scenarios" become harder to answer. Product Intelligence uses historical trends evaluated against the current issue's content to proactively surface these suggestions. These suggestions appear alongside suggested duplicates and when issues are in Triage.

### Duplicate and relationship detection

![suggested related issue](https://webassets.linear.app/images/ornj730p/production/3b0b8fa66e5925a2519f8292e0c46f9c9137ffab-1206x716.png?q=95&auto=format&dpr=2)

When Product Intelligence determines there is a strong semantic similarity between an issue in Triage and an existing issue, a suggestion appears to accept the relation. Hover over the suggestion to see why it's appearing, and optionally accept it, dismiss it, or follow the reference to the secondary issue to analyze further.

### Refine suggestion behavior

In Product Intelligence settings at any level (sub-team, parent team, or workspace) you can provide additional guidance to refine suggestion behavior. This is best used reactively (for example, if you're seeing persistent suggestion themes that are incorrect) rather than as part of initial configuration for Product Intelligence. When additional guidance is set at multiple levels like team and workspace, all are considered but the most local guidance is considered first and weighted most heavily.

### Triggering on issues outside Triage

Product Intelligence can still be run on issues in other statuses (if you're looking at a backlog issue for instance, and would like to double-check for duplicates).

To do so, use the `Cmd` / `Ctrl` + `K` menu to search for _Find Suggestions._ This will run in the background and enrich the issue with suggestions when available.

### FAQ

<details>
<summary>AI Privacy</summary>
Linear does not utilize your data to train its own AI models. Any data processed to enable Linear’s AI features is shared with our trusted partners (AI subprocessors, see our DPA) exclusively to deliver those AI functionalities to you without permission to train on provided data.

To provide features powered by AI and large language models (LLMs), Linear utilizes voluntary data provided by the user in terms of labeling feature outputs (thumbs up/down) or in other opt-in ways. If you have any questions or concerns, please let us know at security@linear.app.

For further information, please see AI Security FAQ in our [Trust Center](https://trustcenter.linear.app/).
</details>

<details>
<summary>Can I get see reasoning about why suggestions are made?</summary>
Yes! Click on the Product Intelligence window in an issue in Triage while it's processing, or on the suggestion overflow menu once suggestions have been made. Optionally, expand

![Expanded reasoning for Product Intelligence suggestion](https://webassets.linear.app/images/ornj730p/production/1ebe7390a9bb84355abb0e761696b5712df3bcde-1600x1718.png?q=95&auto=format&dpr=2)
</details>

<details>
<summary>Why is this feature in Technology Preview?</summary>
We plan for Product Intelligence to contain a suite of LLM driven features that make work easier. Please let us know your feedback on what we have now, or what you'd like to see in the future at support@linear.app.

Product Intelligence is free to use on Business and Enterprise plans while in Technology Preview. If billing changes become necessary in the future, this will be communicated clearly well in advance of any changes.
</details>

<details>
<summary>I'm on another plan and I still see suggestions. How do these work?</summary>
Quick suggestions in the issue composer and property menus are available in all plans in Linear. These leverage search, so they're faster but less much thorough than Product Intelligence's suggestions.
</details>

<details>
<summary>How long does it take to generate suggestions?</summary>
Processing new issues in Triage is expected to take 1-4 minutes to generate high-quality suggestions. Because most issues aren’t triaged this quickly, we make a tradeoff here with spending more time to yield better results. We do expect speed improvements over time as models improve.
</details>