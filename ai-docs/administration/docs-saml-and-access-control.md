# SAML

Customers can opt to enable SAML for their workspace to manage logins through an Identity Provider.

> [!NOTE]
> Available to workspaces on our [Enterprise](https://linear.app/pricing) plan

![Login screen on the Linear desktop app](https://webassets.linear.app/images/ornj730p/production/8f3cc06f38271644cc9bbe3868f3c18e66b09807-2160x1327.png?q=95&auto=format&dpr=2)

## Overview

We currently support most identity providers (Okta, OneLogin, LastPass, Auth0, Bitum, etc.).

Once SAML is enabled, all members in your workspace will be required to login via SAML by default, thus, disabling any other login method type. User sessions won't be logged out or notified at the time of enabling, but the next time they sign in they will have to use SAML to regain access.

Members can login via your identity provider's website or by clicking the option to **Continue with SAML SSO** on the login page.

Guests are an exception, who will be able to sign in by selecting **Continue via email**.

> [!NOTE]
> Admins can log in through any method to prevent lockouts.

## Configure

1. Navigate to [Settings > Administration > Security](https://linear.app/settings/security)_._
2. Under the "Authentication" section, click **Configure** next to "SAML & SCIM".
3. Click the toggle next to **Enable SAML**.
4. You can paste in an XML URL or the raw XML text to connect with your identity provider. If you're not sure where to find this in your identity provider, take a look at their documentation or reach out to us for help.

You can make changes to your configuration later on from `...` > **Edit Configuration** within the SAML authentication & SCIM provisioning settings page.

If you want to add our logo in your Identity Provider, our Brand Assets are available for download [here](https://linear.app/brand).

## Domain rules

### Allowed domains

Once you have added this information, you can add approved domains for logging in with SAML. You will need to provide an email for our verification process when adding a new domain.

### Other auth methods for other domains

You can choose to allow non-SAML logins only for other email domains (ideal for contractors or guests).

### Disable new workspace creation

Once SAML is enabled, you have the option to prevent non-admins from creating new Linear workspaces with their email credential from the domain you claimed during setup. This can be useful to make sure all work is consolidated in a single Linear workspace.

## FAQ

<details>
<summary>I get an error when logging in. Can you help?</summary>
If SAML is enabled for your workspace, you must login via your SAML service's website or by selecting the SAML login option on the Linear login page (it's a bit small and in gray letters, right under the other options). 

If you're getting an error about the workspace not being accessible and it is your first time logging into Linear with SAML, please try logging out of the SAML provider and then logging in. 

If you get repeated errors, then please [contact support](https://linear.app/docs/tutorials#contact-us).
</details>

<details>
<summary>How can I add new users?</summary>
For [SAML-enabled Workspaces](https://linear.app/docs/saml-and-access-control), you can still invite Members as normal from Linear's side. However, you'll need to make sure that members are given access in your identity provider(IdP) in order to log in.   
  
New members who login successfully with SSO will be automatically provisioned using Just-In-Time (JIT) provisioning and an account will be created for them.
</details>

<details>
<summary>Do you support SCIM? (System for Cross-domain Identity Management)</summary>
We support enabling SCIM 2.0 for you on the Enterprise plan if you have SAML enabled. More details [here](https://linear.app/docs/scim).
</details>

<details>
<summary>How can I add Guests?</summary>
Guests must be invited over email to make sure they're permissioned appropriately. In order to invite them, enable a login method for users outside of your claimed domain as pictured, then choose "Invite" in Settings > Administration > Members to invite your Guests.



![Security > Allow other authentication methods for all additional email domains > On](https://webassets.linear.app/images/ornj730p/production/c85fef522711eac3e180daedcb57d89c4767625b-797x528.png?q=95&auto=format&dpr=2)
</details>