import { LinearClient } from '@linear/sdk';
import * as dotenv from 'dotenv';

dotenv.config();

export class LinearIntegration {
  private client: LinearClient;

  constructor() {
    const apiKey = process.env.LINEAR_API_KEY;
    
    if (!apiKey) {
      throw new Error('LINEAR_API_KEY is required in environment variables');
    }

    this.client = new LinearClient({
      apiKey: apiKey
    });
  }

  async testConnection(): Promise<void> {
    try {
      const viewer = await this.client.viewer;
      console.log(`Connected to Linear as: ${viewer.displayName} (${viewer.email})`);
    } catch (error) {
      console.error('Failed to connect to Linear:', error);
      throw error;
    }
  }

  async getMyIssues(): Promise<void> {
    const me = await this.client.viewer;
    const myIssues = await me.assignedIssues();

    if (myIssues.nodes.length) {
      console.log(`\n${me.displayName}'s assigned issues:`);
      for (const issue of myIssues.nodes) {
        const state = issue.state ? await issue.state : null;
        console.log(`- [${issue.identifier}] ${issue.title} (${state?.name || 'No state'})`);
      }
    } else {
      console.log(`${me.displayName} has no assigned issues`);
    }
  }

  async getTeams(): Promise<void> {
    const teams = await this.client.teams();
    
    console.log('\nAvailable teams:');
    teams.nodes.forEach(team => {
      console.log(`- ${team.name} (ID: ${team.id})`);
    });
  }

  async getProjects(): Promise<void> {
    const projects = await this.client.projects();
    
    console.log('\nAvailable projects:');
    projects.nodes.forEach(project => {
      console.log(`- ${project.name} (ID: ${project.id})`);
    });
  }

  async createIssue(title: string, description: string, teamId?: string): Promise<void> {
    try {
      const team = teamId || process.env.LINEAR_TEAM_ID;
      
      if (!team) {
        throw new Error('Team ID is required to create an issue');
      }

      const issuePayload = await this.client.createIssue({
        title,
        description,
        teamId: team
      });

      if (issuePayload.success) {
        const issue = await issuePayload.issue;
        if (issue) {
          console.log(`\nIssue created successfully:`);
          console.log(`- Identifier: ${issue.identifier}`);
          console.log(`- Title: ${issue.title}`);
          console.log(`- URL: ${issue.url}`);
        }
      } else {
        console.error('Failed to create issue');
      }
    } catch (error) {
      console.error('Error creating issue:', error);
      throw error;
    }
  }

  async searchIssues(query: string): Promise<void> {
    const issues = await this.client.issues({
      filter: {
        searchableContent: { contains: query }
      }
    });

    console.log(`\nSearch results for "${query}":`);
    if (issues.nodes.length) {
      issues.nodes.forEach(issue => {
        console.log(`- [${issue.identifier}] ${issue.title}`);
      });
    } else {
      console.log('No issues found');
    }
  }
}