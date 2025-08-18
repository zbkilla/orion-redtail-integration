import { LinearClient, Issue } from '@linear/sdk';
import * as dotenv from 'dotenv';

dotenv.config();

interface ProjectPhase {
  name: string;
  description: string;
  estimatedDuration: string;
  tasks: string[];
}

export class OrionRedtailProjectTracker {
  private client: LinearClient;
  private teamId: string;
  private projectId?: string;

  constructor() {
    const apiKey = process.env.LINEAR_API_KEY;
    this.teamId = process.env.LINEAR_TEAM_ID || '';
    this.projectId = process.env.LINEAR_PROJECT_ID;

    if (!apiKey) {
      throw new Error('LINEAR_API_KEY is required');
    }

    this.client = new LinearClient({ apiKey });
  }

  private getProjectPhases(): ProjectPhase[] {
    return [
      {
        name: 'Phase 1-2: Data Audit & Cleanup',
        description: 'Comprehensive data inventory and standardization',
        estimatedDuration: '2 weeks',
        tasks: [
          'Export all Orion households with complete data fields',
          'Export all Redtail contacts with complete data fields',
          'Identify SSN/Tax ID coverage in both systems',
          'Document household structures and relationships',
          'Standardize SSN/Tax ID formats',
          'Standardize name fields and addresses',
          'Create data quality report'
        ]
      },
      {
        name: 'Phase 3-4: Duplicate Resolution & Mapping',
        description: 'Identify and resolve duplicate records, create mapping strategy',
        estimatedDuration: '1 week',
        tasks: [
          'Run duplicate detection within Orion',
          'Run duplicate detection within Redtail',
          'Identify cross-system potential matches',
          'Create duplicate resolution matrix',
          'Map Orion households to Redtail contacts',
          'Document Rep ID to username mappings',
          'Create linking strategy documentation'
        ]
      },
      {
        name: 'Phase 5-6: Testing',
        description: 'Set up test environments and validate integration scenarios',
        estimatedDuration: '1 week',
        tasks: [
          'Provision Orion sandbox environment',
          'Set up Redtail test environment',
          'Load test data subset (100-200 records)',
          'Test clean SSN match scenario',
          'Test missing SSN scenarios',
          'Test joint household scenarios',
          'Test duplicate SSN handling',
          'Document test results and issues'
        ]
      },
      {
        name: 'Phase 7: Implementation',
        description: 'Phased rollout of integration',
        estimatedDuration: '3 weeks',
        tasks: [
          'Enable Redtail integration in Orion Integrations Center',
          'Configure Rep ID access',
          'Set up account feed parameters',
          'Each user authorizes Orion access in Redtail',
          'Enable 2-way sync settings',
          'Wave 1: Migrate high-confidence matches',
          'Wave 2: Process manual review required records',
          'Wave 3: Handle complex cases and edge scenarios'
        ]
      },
      {
        name: 'Phase 8-9: Validation & Maintenance',
        description: 'Post-integration validation and ongoing maintenance setup',
        estimatedDuration: 'Ongoing',
        tasks: [
          'Verify daily 9 AM CST sync completion',
          'Validate bi-directional field updates',
          'Run reconciliation reports',
          'Document sync error patterns',
          'Create maintenance procedures',
          'Train support team',
          'Establish monitoring and alerting'
        ]
      }
    ];
  }

  async createProjectStructure(): Promise<void> {
    console.log('Creating Orion-Redtail Integration project structure in Linear...\n');

    const phases = this.getProjectPhases();
    
    for (const phase of phases) {
      console.log(`Creating issues for ${phase.name}...`);
      
      const parentIssue = await this.createParentIssue(phase);
      
      for (const task of phase.tasks) {
        await this.createSubTask(task, parentIssue);
      }
      
      console.log(`✓ Created ${phase.tasks.length + 1} issues for ${phase.name}\n`);
    }

    console.log('Project structure created successfully!');
  }

  private async createParentIssue(phase: ProjectPhase): Promise<Issue | null> {
    const result = await this.client.createIssue({
      title: phase.name,
      description: `${phase.description}\n\nEstimated Duration: ${phase.estimatedDuration}`,
      teamId: this.teamId,
      projectId: this.projectId
    });
    
    if (result.success) {
      const issue = await result.issue;
      if (issue) {
        console.log(`  ✓ Parent: ${issue.title}`);
        return issue;
      }
    }
    
    return null;
  }

  private async createSubTask(taskName: string, parent: Issue | null): Promise<void> {
    const result = await this.client.createIssue({
      title: taskName,
      teamId: this.teamId,
      projectId: this.projectId,
      parentId: parent?.id
    });
    
    if (result.success) {
      console.log(`    ✓ Task: ${taskName}`);
    }
  }

  async createCriticalQuestions(): Promise<void> {
    console.log('Creating critical questions for Orion team...\n');

    const criticalQuestions = [
      'SSN Format & Matching Logic - URGENT',
      'Household-to-Contact One-to-One Constraint Clarification',
      'Daily Sync Process Mechanics (9 AM CST)',
      'API Rate Limits and Bulk Operation Constraints',
      'Sandbox Environment Provisioning',
      'Error Handling and Recovery Procedures',
      'Rollback and Data Recovery Options'
    ];

    for (const question of criticalQuestions) {
      const result = await this.client.createIssue({
        title: `[BLOCKER] ${question}`,
        description: 'Critical question requiring Orion team response before Phase 1 can begin.',
        teamId: this.teamId,
        projectId: this.projectId,
        priority: 1 // Urgent priority
      });
      
      if (result.success) {
        console.log(`✓ Created blocker: ${question}`);
      }
    }

    console.log('\nCritical questions created successfully!');
  }
}