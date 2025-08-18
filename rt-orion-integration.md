# How-To and Overview: Redtail and Orion Integration

*Oct 2, 2024 - Knowledge*

## Description
Learn how to enable the integration between Orion and Redtail, link a Redtail contact to Orion, and more!

## Article Quick Links

- [Why?](#why)
- [What?](#what)
- [How?](#how)
  - [Enable Orion Integration in Redtail](#enable-orion-integration-in-redtail)
  - [Authorize Access to Orion](#authorize-access-to-orion)
  - [Enable Two-Way Contact Sync](#enable-two-way-contact-sync)
  - [Link Orion Household](#link-orion-household)
  - [Orion Dashboard](#orion-dashboard)
  - [Portfolio View](#portfolio-view)
  - [Orion Tools](#orion-tools)
- [Redtail Account Feed Setup and Data Mapping](#redtail-account-feed-setup-and-data-mapping)

## Why?

Link your Redtail Contacts and Orion Households together to streamline various processes between the two.

- Create account proposals directly in a Redtail contact's record
- Access various features like trading and reporting for your Orion Households through Redtail Contact records
- Access the Orion Dashboard from your Today page

## What?

Gain access to additional Orion features - such as the proposals tool, trading, reports, insights, and the Orion dashboard - directly in Redtail.

## How?

### Enable Orion Integration in Redtail

**Important:** You only need to complete this step one time for your account, but each individual user must also complete this step to use these Orion features:

### Authorize Access to Orion

1. Open Redtail and click your username in the upper right corner
2. Select **Manage Your Integrations** (A) and scroll down or search for Orion Advisor
3. Click the settings icon and select **Settings** (B)
4. Click **Authorize Access to Orion**
5. Enter your Orion credentials (C) and click **Sign In** (D)
6. When a prompt to confirm and accept the integration appears, Click **Allow**

### Enable Two-Way Contact Sync

**Important Note:** Users must have Read and Edit enabled for the "Portfolio (Households - Accounts)" privilege to enable the 2 way sync. (Orion Connect > Manage Users app > Roles > Double-click applicable role to Edit > Records tab)

After you complete the above steps, finish setting up the integration by going to:
- Redtail > Manage Your Integrations > Orion Advisor > Settings > check the **Enable 2 way sync with Orion Advisor** box > Save

This connects an Orion household to an individual contact in Redtail and is a two-way sync. If the client's household currently exists in Orion, the client record in Redtail automatically locates the Orion household based on the SSN within the registrations if a match is found. You must manually link each head of household contact in Redtail.

#### Data Mapping

The below mapping information reflects the Orion data that syncs between Redtail and Orion:

| Orion Field | Direction | Redtail Field | Redtail Section |
|------------|-----------|---------------|-----------------|
| First Name on Household | ↔ | Contact First Name | Basic Info |
| Last Name on Household | ↔ | Contact Last Name | Basic Info |
| Date of Birth on Household | ↔ | Date of Birth | Contact Details |
| Address 1, Address 2, City, State, Zip on Household | ↔ | Primary Address | Contact Card |
| Home Phone Number on Household | ↔ | Primary Phone Number | Contact Card |
| Email on Household | ↔ | Primary Email Address | Contact Card |

**Please Note:** This does not establish the account feed from Orion into Redtail. To set up that feed, please see [Redtail Account Feed Setup and Data Mapping](#redtail-account-feed-setup-and-data-mapping).

### Link Orion Household

Open a Contact in Redtail > click the integration icon in the upper right corner > and click Orion Advisor.

If the client is linked to an Orion household, it displays which household it's connected to.

If the client is not linked to an Orion household, you have the following options:

#### The household exists in Orion:

- Redtail automatically locates a client based on the SSN assigned to the contact record in Redtail and in the registrations in the Orion household if a match is found. Click 'Select household' next to the client to link it.
- **IMPORTANT NOTE:** Two Redtail contacts cannot be linked to one Orion household. It is best practice to link the head of household contact in Redtail to the household.
- If there is not a household listed here at all, verify there is an SSN assigned to the client in Redtail and Orion:
  - Orion Connect > Portfolio Audit > Registrations > Edit Registration > SSN/Tax ID
  - Redtail > Contacts > click on a client > TAX ID NUMBER (under Contact Details)
- If there are multiple SSN matches, you are given the option to select which household you want to link the client to.

#### The household does not exist in Orion:

Follow the steps in the Use the New Account Wizard section to create the client in Orion.

[Back to Top](#article-quick-links)

### Orion Dashboard

View the Orion Dashboard by clicking the **Today page** (A) > **Orion tab** (B)

### Portfolio View

Open a client in Portfolio View by going to Contacts > open a Contact > **Accounts page** (A) > **Orion Portfolio tab** (B).

**Note:** The Orion Portfolio tab won't show up here for a contact until household linking has been done for the client within Orion. See the Link an Orion Household to Redtail section for more information.

[Back to Top](#article-quick-links)

### Orion Tools

Open a Contact in Redtail > click the integration icon in the upper right corner > and click Orion Advisor

#### New Account Wizard

If you haven't previously sent the client to Orion, you'll be prompted to select a representative for this client. Select the applicable rep and then Send to Orion.

Clicking the New Account Wizard option pushes the client information from Redtail into the New Accounts Center app to create a new account from the information in Redtail.

#### Trading Platform

This section displays the Eclipse Insight tile. If you are using Eclipse for your trading, complete basic trade functionality right from Redtail.

#### Insight

Insight displays your default Insight dashboard, with the option to link to the full Insight app using the pop-out button.

#### Reports

Reports opens the Report generator option in Orion to run a one-off Orion report without leaving Redtail.

[Back to Top](#article-quick-links)

---

## Redtail Account Feed Setup and Data Mapping

*Oct 3, 2024 - Knowledge*

### Description
This article provides instructions on setting up the Redtail account feed and the data points that sync from Orion to Redtail.

### Set Up the Orion Account Feed into Redtail

Enable the account feed to sync your Orion accounts into your Redtail CRM based on your Rep IDs!

1. In the **Integrations Center**, locate the Redtail tile and click the **Add** button.

2. This opens the Redtail setup wizard. As part of the wizard, you need to know:
   - The Redtail User Names that will be using the system
   - The Orion Rep IDs they will need to have access to in Redtail as part of the feed

3. Follow the steps in the wizard to set up the account feed. For an account to sync, the following criteria need to be met:
   - Account must be active
   - Account must be managed
   - Account must have value
   - Registration the account is in needs to have an SSN/Tax ID number

**Please Note:** This feed will occur once daily, around 9 AM CST. This process will only set up the account feed. Please review the [Redtail Integration Overview](#how-to-and-overview-redtail-and-orion-integration) to set up the rest of the integration.

### Account Feed Mapping

The information below reflects the Orion data point that syncs to the Redtail data point as part of the account sync. This is a one-way sync from Orion into Redtail. Review the [Contact Sync Mapping](#data-mapping) section of the Redtail Integration Overview article to learn how to sync an Orion household to an individual contact in Redtail.

**Please Note:** Sleeved accounts in Orion sync into Redtail as individual accounts (i.e., each sleeve has its own account).

| Orion Field | Direction | Redtail Field |
|------------|-----------|---------------|
| SSN (on Registration) | → | Federal Tax ID |
| Account Number | → | Account Number |
| Name (on Registration) | → | Account Name |
| Symbol | → | Symbol |
| Product Name | → | Security Name |
| As of Date | → | Balance Date |
| Shares | → | Quantity |
| As of Date | → | Quantity Date |
| Price | → | Price |
| Price Date | → | Price Date |
| Balance | N/A | Balance (Calculated by Redtail) |

[Back to Top](#article-quick-links)

---

**URL Names:** 
- Redtail-Integration-Features
- Redtail-Account-Feed-Setup-and-Mapping