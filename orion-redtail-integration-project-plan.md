# Orion-Redtail Integration Project Plan

## Executive Summary
This document outlines the comprehensive project plan for integrating existing Orion and Redtail data systems, ensuring clean data migration, proper mapping, and avoiding duplicates during the integration process.

## Critical Integration Dependencies

### Primary Matching Mechanism
- **SSN/Tax ID** is the PRIMARY and ONLY automatic matching field
- Without SSN match, manual linking is required
- SSN must exist in BOTH systems for automatic matching

### Integration Constraints
1. **One-to-One Relationship**: Only ONE Redtail contact can link to ONE Orion household
2. **Head of Household Priority**: Best practice is to link head of household contact only
3. **Account Sync Requirements**:
   - Account must be active
   - Account must be managed
   - Account must have value
   - Registration must have SSN/Tax ID

---

## Phase 1: Pre-Integration Data Audit & Analysis

### 1.1 Data Inventory Assessment

#### Orion Data Audit
- [ ] Export all Orion households with complete data fields
- [ ] Count total households
- [ ] Identify households WITH SSN/Tax ID in registrations
- [ ] Identify households WITHOUT SSN/Tax ID
- [ ] Document household structure (single vs. joint households)
- [ ] Export all account data with registration SSNs
- [ ] Identify sleeved accounts (will create multiple Redtail accounts)
- [ ] Document all active Rep IDs

#### Redtail Data Audit
- [ ] Export all Redtail contacts with complete data fields
- [ ] Count total contacts
- [ ] Identify contacts WITH Federal Tax ID/SSN
- [ ] Identify contacts WITHOUT Federal Tax ID/SSN
- [ ] Document contact relationships (individuals vs. couples)
- [ ] Export all existing account data
- [ ] Document all Redtail usernames requiring access

### 1.2 Critical Field Mapping Analysis

#### Primary Matching Fields
| Priority | Field | Orion Location | Redtail Location | Data Type | Required |
|----------|-------|----------------|------------------|-----------|----------|
| 1 | SSN/Tax ID | Registration > SSN/Tax ID | Contact Details > TAX ID NUMBER | 9 digits (XXX-XX-XXXX) | YES for auto-match |
| 2 | First Name | Household > First Name | Basic Info > Contact First Name | Text | YES |
| 3 | Last Name | Household > Last Name | Basic Info > Contact Last Name | Text | YES |
| 4 | Date of Birth | Household > Date of Birth | Contact Details > Date of Birth | Date (MM/DD/YYYY) | Recommended |

#### Secondary Validation Fields
| Field | Purpose | Format Requirements |
|-------|---------|-------------------|
| Email | Duplicate detection | Lowercase, trimmed |
| Phone | Secondary matching | 10 digits, no formatting |
| Address | Household verification | Standardized format |

---

## Phase 2: Data Quality & Standardization

### 2.1 SSN/Tax ID Cleanup

#### Orion SSN Standardization
```
Tasks:
1. Remove all formatting (dashes, spaces)
2. Validate 9-digit format
3. Flag invalid SSNs (000-00-0000, 123-45-6789, etc.)
4. Identify missing SSNs requiring manual entry
5. Document SSNs appearing in multiple households
```

#### Redtail Tax ID Standardization
```
Tasks:
1. Standardize format to match Orion
2. Identify contacts sharing same Tax ID
3. Flag household members vs. individual contacts
4. Document missing Tax IDs
```

### 2.2 Name Standardization

#### Formatting Rules
- [ ] Remove titles (Mr., Mrs., Dr., etc.)
- [ ] Standardize capitalization (Proper Case)
- [ ] Remove special characters except hyphens and apostrophes
- [ ] Trim leading/trailing spaces
- [ ] Handle suffixes consistently (Jr., Sr., III)

#### Common Issues to Address
- [ ] Nickname variations (Bob/Robert, Bill/William)
- [ ] Maiden name vs. married name discrepancies
- [ ] Business names in personal name fields
- [ ] Trust/Estate naming conventions

### 2.3 Address Standardization
- [ ] Use USPS address validation
- [ ] Standardize abbreviations (St. → Street, Apt → Apartment)
- [ ] Validate ZIP codes
- [ ] Separate PO Boxes from physical addresses

---

## Phase 3: Duplicate Detection & Resolution

### 3.1 Duplicate Detection Strategy

#### Within Orion
```sql
Detection Criteria:
1. Exact SSN match across households
2. Name + DOB combination match
3. Email address match
4. Phone + Last Name match
```

#### Within Redtail
```sql
Detection Criteria:
1. Exact Tax ID match
2. Name + DOB combination
3. Email match (primary and secondary)
4. Address + Last Name match
```

#### Cross-System Potential Matches
```
Match Confidence Levels:
- HIGH: SSN match + Name match
- MEDIUM: SSN match only OR Name + DOB + Address match
- LOW: Name + Phone match only
```

### 3.2 Duplicate Resolution Process

1. **Create Duplicate Resolution Matrix**
   - [ ] Document all potential duplicates
   - [ ] Assign ownership (which record is primary)
   - [ ] Plan data merge strategy
   - [ ] Document audit trail

2. **Manual Review Requirements**
   - [ ] Different SSNs but same name/address
   - [ ] Joint accounts with individual records
   - [ ] Business vs. personal account conflicts

---

## Phase 4: Household Structure Mapping

### 4.1 Household Analysis

#### Orion Household Structure
- [ ] Identify single-person households
- [ ] Identify joint households (married couples)
- [ ] Identify complex households (multi-generational)
- [ ] Document beneficiary relationships

#### Redtail Contact Structure
- [ ] Map individual contacts to Orion households
- [ ] Identify Redtail "families" or linked contacts
- [ ] Flag contacts that may need consolidation

### 4.2 Linking Strategy

| Scenario | Orion Structure | Redtail Structure | Linking Action |
|----------|-----------------|-------------------|----------------|
| Single Person | 1 household, 1 registration | 1 contact | Direct link via SSN |
| Married Couple | 1 household, 2 registrations | 2 separate contacts | Link PRIMARY contact only |
| Married Couple | 1 household, 2 registrations | 1 joint contact | Direct link via primary SSN |
| Business Entity | 1 household with EIN | 1 business contact | Link via EIN |

---

## Phase 5: Rep ID Mapping

### 5.1 Rep ID Configuration
- [ ] Document all Orion Rep IDs
- [ ] Map Rep IDs to Redtail usernames
- [ ] Validate user permissions in both systems
- [ ] Create Rep ID assignment matrix

### 5.2 User Access Matrix
| Redtail Username | Orion Rep ID(s) | Account Access | Integration Role |
|-----------------|-----------------|----------------|------------------|
| [Username] | [Rep ID] | [List] | Admin/User |

---

## Phase 6: Pre-Integration Testing

### 6.1 Test Environment Setup
- [ ] Create Orion sandbox/test environment
- [ ] Create Redtail test environment
- [ ] Load subset of clean data (100-200 records)

### 6.2 Test Scenarios

#### Scenario 1: Clean SSN Match
- Both systems have matching SSN
- All required fields populated
- Expected: Automatic linking

#### Scenario 2: Missing SSN in Orion
- Redtail has SSN, Orion missing
- Expected: No automatic match, manual linking required

#### Scenario 3: Joint Household
- Orion has joint household
- Redtail has two individual contacts
- Expected: Link primary contact only

#### Scenario 4: Duplicate SSN
- Same SSN in multiple records
- Expected: System prompts for selection

---

## Phase 7: Integration Implementation

### 7.1 Technical Setup

#### Orion Configuration
1. [ ] Enable Redtail integration in Integrations Center
2. [ ] Configure Rep ID access
3. [ ] Set up account feed parameters
4. [ ] Verify API connectivity

#### Redtail Configuration
1. [ ] Each user authorizes Orion access
2. [ ] Enable 2-way sync setting
3. [ ] Configure user permissions
4. [ ] Verify Portfolio privileges

### 7.2 Phased Data Migration

#### Wave 1: High-Confidence Matches (Week 1)
- [ ] Contacts with exact SSN matches
- [ ] Complete data in both systems
- [ ] No duplicates identified
- Target: 60-70% of records

#### Wave 2: Manual Review Required (Week 2)
- [ ] Missing SSN in one system
- [ ] Name variations identified
- [ ] Requires data cleanup
- Target: 20-25% of records

#### Wave 3: Complex Cases (Week 3)
- [ ] Duplicate resolutions
- [ ] Household structure conflicts
- [ ] Business/Trust accounts
- Target: Remaining 5-10%

---

## Phase 8: Post-Integration Validation

### 8.1 Data Validation Checks

#### Daily Sync Validation
- [ ] Verify 9 AM CST sync completion
- [ ] Check sync error logs
- [ ] Validate record counts
- [ ] Confirm bi-directional updates

#### Field-Level Validation
| Field | Validation Check | Frequency |
|-------|-----------------|-----------|
| SSN | Match between systems | Daily |
| Names | Sync updates properly | Daily |
| Addresses | Format maintained | Weekly |
| Phone/Email | Updates reflected | Weekly |
| Account Data | Values match | Daily |

### 8.2 Reconciliation Reports

#### Weekly Reports
1. **Sync Status Report**
   - Total records synced
   - Failed sync attempts
   - Pending manual links

2. **Data Quality Report**
   - Missing critical fields
   - Data inconsistencies
   - Duplicate warnings

3. **User Access Report**
   - Active user count
   - Permission issues
   - Integration usage stats

---

## Phase 9: Ongoing Maintenance

### 9.1 Regular Maintenance Tasks

#### Daily Tasks
- [ ] Monitor sync status
- [ ] Review error logs
- [ ] Process new account additions

#### Weekly Tasks
- [ ] Run duplicate detection
- [ ] Review unlinked records
- [ ] Update Rep ID mappings

#### Monthly Tasks
- [ ] Full data reconciliation
- [ ] User access audit
- [ ] Performance optimization review

### 9.2 Issue Resolution Procedures

#### Common Issues & Solutions
| Issue | Root Cause | Resolution | Prevention |
|-------|------------|------------|------------|
| Sync failure | Missing SSN | Add SSN to registration | Require SSN for new accounts |
| Duplicate creation | Manual entry in both systems | Merge and link | Training on proper workflow |
| Data mismatch | Update in one system only | Force re-sync | Enable real-time sync |
| Access denied | Permission changes | Update user roles | Regular permission audits |

---

## Risk Mitigation

### Critical Risks

1. **Data Loss Risk**
   - Mitigation: Complete backups before each phase
   - Recovery: Maintain 30-day backup retention

2. **Duplicate Client Records**
   - Mitigation: Thorough SSN validation
   - Recovery: Duplicate merge procedures

3. **Incorrect Household Linking**
   - Mitigation: Manual review of joint accounts
   - Recovery: Unlink and relink procedures

4. **Sync Interruption**
   - Mitigation: Monitor daily sync status
   - Recovery: Manual sync trigger process

---

## Success Metrics

### Integration KPIs
- [ ] 95% of records successfully linked
- [ ] <2% duplicate rate post-integration
- [ ] 100% of active accounts syncing daily
- [ ] Zero data loss incidents
- [ ] <5% manual intervention required ongoing

### Timeline Estimates
- Phase 1-2: 2 weeks (Audit & Cleanup)
- Phase 3-4: 1 week (Duplicate Resolution & Mapping)
- Phase 5-6: 1 week (Testing)
- Phase 7: 3 weeks (Phased Implementation)
- Phase 8-9: Ongoing

**Total Project Duration: 6-8 weeks**

---

## Appendix A: SQL Queries for Data Analysis

### Find Duplicates in Orion
```sql
SELECT SSN, COUNT(*) as count
FROM orion_registrations
WHERE SSN IS NOT NULL
GROUP BY SSN
HAVING COUNT(*) > 1;
```

### Find Missing SSNs in Redtail
```sql
SELECT contact_id, first_name, last_name
FROM redtail_contacts
WHERE tax_id IS NULL OR tax_id = '';
```

### Match Candidates Cross-System
```sql
SELECT 
  o.household_id,
  r.contact_id,
  o.ssn,
  r.tax_id,
  o.first_name,
  r.first_name,
  o.last_name,
  r.last_name
FROM orion_data o
JOIN redtail_data r ON o.ssn = r.tax_id
WHERE o.ssn IS NOT NULL;
```

---

## Appendix B: Data Cleaning Scripts

### SSN Formatting
```python
def standardize_ssn(ssn):
    # Remove all non-numeric characters
    clean_ssn = re.sub(r'[^0-9]', '', str(ssn))
    
    # Validate length
    if len(clean_ssn) != 9:
        return None
    
    # Format as XXX-XX-XXXX
    return f"{clean_ssn[:3]}-{clean_ssn[3:5]}-{clean_ssn[5:]}"
```

### Name Standardization
```python
def standardize_name(name):
    # Remove titles
    titles = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.']
    for title in titles:
        name = name.replace(title, '')
    
    # Proper case
    name = name.strip().title()
    
    # Remove extra spaces
    name = ' '.join(name.split())
    
    return name
```

---

## Document Control
- **Version:** 1.0
- **Created:** 2025-08-18
- **Last Updated:** 2025-08-18
- **Project Owner:** [To be assigned]
- **Technical Lead:** [To be assigned]