# Critical Questions for Orion Integration Team
## Project: Orion-Redtail Data Integration

*Document Date: 2025-08-18*  
*Prepared by: Project Manager*  
*Priority: URGENT - Required before Phase 1 implementation*

---

## 1. SSN/Tax ID Matching Logic - CRITICAL PATH

### 1.1 SSN Format & Storage
- **Q1.1.1:** What is the EXACT format stored in Orion's Registration SSN field? 
  - With dashes (XXX-XX-XXXX)?
  - Without dashes (XXXXXXXXX)?
  - Mixed formats allowed?
  
- **Q1.1.2:** Are there any SSN validation rules enforced at the Orion database level?
  - Can invalid SSNs (000-00-0000, 111-11-1111) exist in production data?
  - Are partial SSNs (last 4 digits only) stored anywhere?

- **Q1.1.3:** For the automatic SSN matching during household linking:
  - Is the match case-sensitive for any alphanumeric Tax IDs?
  - Does the system strip formatting before comparison?
  - What happens if SSN format differs between systems (e.g., "123456789" vs "123-45-6789")?

### 1.2 Multiple SSN Scenarios
- **Q1.2.1:** The documentation mentions "multiple SSN matches" - how does Orion handle:
  - Same SSN across different households (divorced couples, data errors)?
  - Multiple SSNs for same person (SSN changes, data entry errors)?
  - Joint registrations with two different SSNs?

- **Q1.2.2:** What is the EXACT selection interface when multiple SSN matches are found?
  - Can we bulk-select the correct household?
  - Is there an API to programmatically handle multiple matches?
  - What metadata is shown to help users choose (account values, dates, rep IDs)?

### 1.3 EIN/Business Tax IDs
- **Q1.3.1:** How are EINs (XX-XXXXXXX format) handled differently from SSNs?
  - Are they stored in the same SSN/Tax ID field?
  - Different matching logic for business entities?
  - Can an EIN match to multiple business accounts?

---

## 2. Household-to-Contact Relationship Constraints

### 2.1 One-to-One Limitation Clarification
- **Q2.1.1:** The constraint states "Two Redtail contacts cannot be linked to one Orion household" - what happens when:
  - We have joint Orion household with both spouses as Redtail contacts?
  - Attempting to link second spouse - does it fail silently or show error?
  - Is there an "unlink" API to remove incorrect links?

- **Q2.1.2:** For the "best practice" of linking head of household only:
  - How is "head of household" determined in Orion (first registration, primary SSN, designated field)?
  - What functionality is lost for the non-linked spouse in Redtail?
  - Can the non-linked spouse still see account data through family relationships?

### 2.2 Household Structure Edge Cases
- **Q2.2.1:** How are these complex structures handled:
  - Multi-generational households (parents + adult children)?
  - Trusts with multiple trustees?
  - Business partnerships with multiple partners?
  - Guardian/ward relationships?

- **Q2.2.2:** Can a single Redtail contact be linked to multiple Orion households?
  - Client with personal AND business accounts in separate households?
  - Trustee managing multiple trust households?

---

## 3. Account Feed Synchronization Mechanics

### 3.1 Daily Sync Process Details
- **Q3.1.1:** For the "9 AM CST daily sync":
  - Exact time window (start/end)?
  - Is this configurable per firm?
  - What happens if sync fails - automatic retry?
  - Maximum number of records per sync batch?
  - Timeout limits?

- **Q3.1.2:** During the sync window:
  - Are systems locked for updates?
  - What happens to changes made during sync?
  - Is there a sync queue for pending changes?

### 3.2 Account Sync Requirements
- **Q3.2.1:** "Account must have value" requirement:
  - Minimum value threshold?
  - Does $0.01 count as "having value"?
  - What about negative values (margin accounts)?
  - Are cash accounts with $0 balance excluded?

- **Q3.2.2:** "Account must be managed" criterion:
  - How is "managed" defined in Orion?
  - Held-away accounts excluded?
  - Self-directed accounts excluded?
  - What specific account types qualify?

### 3.3 Sleeved Account Handling
- **Q3.3.1:** For sleeved accounts creating multiple Redtail accounts:
  - How are sleeve relationships maintained?
  - Is there a parent-child account structure?
  - How to identify all sleeves belonging to same master account?
  - Naming convention for sleeve accounts in Redtail?

---

## 4. Data Field Mapping Ambiguities

### 4.1 Registration vs Household Data
- **Q4.1.1:** Documentation shows SSN at "Registration" level but names at "Household" level:
  - Which registration if multiple exist?
  - What if registration names differ from household names?
  - Priority when data conflicts between levels?

- **Q4.1.2:** For "Name (on Registration)" in account feed:
  - Is this individual's name or account title?
  - How are joint registration names formatted?
  - Character limits that might cause truncation?

### 4.2 Date Field Handling
- **Q4.2.1:** "As of Date" maps to both Balance Date AND Quantity Date:
  - Why same source for two targets?
  - What if these need different dates?
  - Time zone considerations (CST vs EST vs UTC)?

### 4.3 Missing Field Mappings
- **Q4.3.1:** What happens to these Redtail fields with no Orion mapping:
  - Secondary phone numbers?
  - Work email addresses?
  - Alternate addresses?
  - Social media profiles?
  - Custom fields?

- **Q4.3.2:** What Orion fields are NOT mapped but might cause confusion:
  - Risk scores?
  - Investment objectives?
  - Net worth data?
  - Employment information?

---

## 5. Permissions & Security Architecture

### 5.1 User Permission Requirements
- **Q5.1.1:** "Portfolio (Households - Accounts)" privilege requirement:
  - Can this be granted temporarily for initial setup?
  - Minimum permission level (Read-only vs Read/Edit)?
  - Impact on users without this permission post-integration?

- **Q5.1.2:** For "each individual user must complete this step":
  - Can admin authorize on behalf of users?
  - Bulk authorization possible?
  - What if user leaves company - how to revoke?

### 5.2 Rep ID Security Model
- **Q5.2.1:** Rep ID to Username mapping:
  - Can one username access multiple Rep IDs?
  - Can multiple usernames share same Rep ID?
  - How are Rep ID changes handled (employee transitions)?
  - Audit trail for Rep ID access?

- **Q5.2.2:** Data visibility rules:
  - Can users see accounts outside their Rep ID?
  - Team/hierarchy based access?
  - How are joint Rep ID accounts handled?

---

## 6. API & Technical Integration Details

### 6.1 API Limitations
- **Q6.1.1:** Rate limiting:
  - Maximum API calls per minute/hour/day?
  - Bulk operation limits?
  - Concurrent connection limits?
  - Error response codes and retry logic?

- **Q6.1.2:** Data payload limits:
  - Maximum records per API call?
  - Field character limits?
  - Total payload size limits?
  - Pagination handling for large datasets?

### 6.2 Integration Monitoring
- **Q6.2.1:** Available monitoring endpoints:
  - Real-time sync status API?
  - Error log access?
  - Webhook notifications for sync failures?
  - Performance metrics API?

### 6.3 Rollback Capabilities
- **Q6.3.1:** If integration fails mid-process:
  - Automatic rollback available?
  - Point-in-time recovery options?
  - How to identify partially synced records?
  - Manual rollback procedures?

---

## 7. Data Consistency & Conflict Resolution

### 7.1 Bi-directional Sync Conflicts
- **Q7.1.1:** When same field updated in both systems between syncs:
  - Which system wins (last modified, designated master)?
  - Conflict detection mechanism?
  - User notification of conflicts?
  - Audit trail of overwritten data?

- **Q7.1.2:** For the 6 bi-directional fields (names, DOB, address, phone, email):
  - Can we configure field-level sync direction?
  - Exclude specific fields from sync?
  - Different rules for different client segments?

### 7.2 Data Validation Rules
- **Q7.2.1:** Field validation differences between systems:
  - Phone number format requirements?
  - Email validation rules?
  - Address standardization differences?
  - Name field special character handling?

- **Q7.2.2:** What happens when validation fails:
  - Record skipped entirely?
  - Partial sync with valid fields only?
  - Error logged but sync continues?
  - Manual intervention required?

---

## 8. Historical Data & Audit Requirements

### 8.1 Historical Data Handling
- **Q8.1.1:** For existing accounts prior to integration:
  - Historical transaction sync available?
  - How far back does data sync go?
  - Performance data history included?
  - Cost basis information transferred?

- **Q8.1.2:** Closed/inactive accounts:
  - Are they included in initial sync?
  - How are they marked in target system?
  - Retention period for closed accounts?

### 8.2 Audit Trail Requirements
- **Q8.2.1:** Integration audit logging:
  - What actions are logged?
  - Log retention period?
  - Audit log access methods?
  - Compliance reporting capabilities?

- **Q8.2.2:** Change tracking:
  - Before/after values stored?
  - User attribution for changes?
  - Timestamp precision (seconds, milliseconds)?
  - Time zone for audit timestamps?

---

## 9. Error Handling & Recovery Procedures

### 9.1 Common Error Scenarios
- **Q9.1.1:** Please provide specific error codes/messages for:
  - SSN mismatch
  - Duplicate detection
  - Permission denied
  - Data validation failures
  - Timeout errors
  - Rate limit exceeded

- **Q9.1.2:** For each error type:
  - Automated recovery possible?
  - Manual intervention steps?
  - Expected resolution time?
  - Escalation procedures?

### 9.2 Partial Failure Handling
- **Q9.2.1:** If subset of records fail during sync:
  - Continue with successful records?
  - Rollback entire batch?
  - Retry logic for failed records?
  - Maximum retry attempts?

---

## 10. Testing Environment Specifications

### 10.1 Sandbox Environment
- **Q10.1.1:** Orion sandbox capabilities:
  - Data refresh frequency from production?
  - Data anonymization applied?
  - Full API functionality available?
  - Performance comparable to production?
  - Separate sandbox for each client firm?

- **Q10.1.2:** Test data provisioning:
  - Can we load custom test datasets?
  - Standard test data available?
  - Data generation tools provided?
  - How to reset sandbox to clean state?

### 10.2 Testing Constraints
- **Q10.2.1:** Sandbox limitations:
  - Maximum number of test records?
  - Functionality disabled in sandbox?
  - Time restrictions on sandbox access?
  - Concurrent user limits?

---

## 11. Eclipse Trading Platform Integration

### 11.1 Trading Integration Scope
- **Q11.1.1:** Eclipse Insight tile functionality:
  - What trading operations available through Redtail?
  - Order types supported?
  - Real-time price feeds included?
  - Trade confirmation workflow?

- **Q11.1.2:** Trading permissions:
  - Separate trading permissions required?
  - Approval workflows enforced?
  - Trading limits configurable?
  - Audit trail for trades placed through integration?

---

## 12. Reporting & Dashboard Access

### 12.1 Report Generation
- **Q12.1.1:** "One-off Orion report" capability:
  - Which report types available?
  - Custom report templates supported?
  - Data date ranges accessible?
  - Export formats (PDF, Excel, CSV)?

- **Q12.1.2:** Report data consistency:
  - Report data real-time or delayed?
  - Same as native Orion reports?
  - Performance impact on integration?

### 12.2 Dashboard Integration
- **Q12.2.1:** Orion Dashboard in Redtail:
  - Full dashboard or limited widgets?
  - Customization options?
  - Refresh frequency?
  - Interactive features supported?

---

## 13. Migration Rollout Strategy

### 13.1 Phased Migration Support
- **Q13.1.1:** Can integration be enabled for subset of users initially?
  - Pilot group configuration?
  - Gradual rollout options?
  - A/B testing capabilities?

- **Q13.1.2:** Parallel run capabilities:
  - Can we run old and new processes simultaneously?
  - Data comparison tools available?
  - Switchback procedures if issues found?

### 13.2 Cutover Planning
- **Q13.2.1:** Production cutover requirements:
  - Downtime required?
  - Blackout windows needed?
  - Point of no return?
  - Rollback window duration?

---

## 14. Ongoing Support & Maintenance

### 14.1 Support Structure
- **Q14.1.1:** Orion integration support:
  - Dedicated integration support team?
  - Support hours/availability?
  - SLA for issue resolution?
  - Escalation path for critical issues?

- **Q14.1.2:** Documentation and training:
  - Admin guide available?
  - End-user training materials?
  - Video tutorials?
  - Regular webinars/updates?

### 14.2 Future Compatibility
- **Q14.2.1:** Version compatibility:
  - How are Orion updates communicated?
  - Breaking changes notification period?
  - Backward compatibility commitment?
  - API versioning strategy?

- **Q14.2.2:** Roadmap alignment:
  - Planned enhancements to integration?
  - Known limitations to be addressed?
  - Feature request process?
  - User feedback incorporation?

---

## 15. Compliance & Regulatory Considerations

### 15.1 Data Privacy
- **Q15.1.1:** PII handling during sync:
  - Encryption in transit?
  - Encryption at rest?
  - Data residency requirements?
  - GDPR/CCPA compliance features?

- **Q15.1.2:** Access controls:
  - SOC2 compliance evidence?
  - Penetration testing results?
  - Security audit reports?
  - Incident response procedures?

### 15.2 Regulatory Reporting
- **Q15.2.1:** Impact on regulatory reports:
  - ADV filing data affected?
  - Performance reporting implications?
  - Custody rule considerations?
  - Books and records requirements?

---

## Critical Decision Points Requiring Immediate Answers

### TOP PRIORITY - Must have before Phase 1:

1. **SSN Format Standardization**: Exact format requirements and matching logic
2. **Household Linking Constraints**: Precise rules for one-to-one limitation
3. **Rep ID Mapping**: Complete specification of user-to-rep-ID relationships
4. **Error Handling**: Comprehensive error code list with resolution procedures
5. **Sync Timing**: Detailed sync window behavior and conflict resolution
6. **Test Environment**: Sandbox provisioning and capabilities
7. **Rollback Procedures**: Complete rollback and recovery documentation

### Response Requirements

Please provide:
- Written responses to all questions
- Technical documentation referenced
- API documentation links
- Contact information for technical specialists
- Estimated timeline for any uncertain items

---

## Document Control

- **Prepared by:** Project Manager
- **Date:** 2025-08-18
- **Priority:** URGENT - Blocking Phase 1
- **Required Response Date:** [ASAP]
- **Escalation Contact:** [To be determined]

## Next Steps

1. Schedule technical deep-dive session with Orion Integration Team
2. Request access to API documentation
3. Provision sandbox environment
4. Establish technical support channel
5. Create risk register based on responses

---

*END OF QUESTIONS DOCUMENT*

**Total Questions: 100+**  
**Critical Path Items: 15**  
**Estimated Response Review Time: 4-6 hours**