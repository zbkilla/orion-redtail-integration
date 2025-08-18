import { LinearIntegration } from './linear-client';
import { OrionRedtailProjectTracker } from './project-tracker';
import { OrionRedtailProjectEnhancer } from './project-enhancer';

async function main() {
  const action = process.argv[2];
  
  try {
    switch (action) {
      case 'test':
        await testConnection();
        break;
      case 'issues':
        await getIssues();
        break;
      case 'teams':
        await getTeams();
        break;
      case 'projects':
        await getProjects();
        break;
      case 'setup-project':
        await setupProject();
        break;
      case 'create-blockers':
        await createBlockers();
        break;
      case 'enhance-project':
        await enhanceProject();
        break;
      default:
        showHelp();
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

async function testConnection() {
  const linear = new LinearIntegration();
  await linear.testConnection();
}

async function getIssues() {
  const linear = new LinearIntegration();
  await linear.getMyIssues();
}

async function getTeams() {
  const linear = new LinearIntegration();
  await linear.getTeams();
}

async function getProjects() {
  const linear = new LinearIntegration();
  await linear.getProjects();
}

async function setupProject() {
  const tracker = new OrionRedtailProjectTracker();
  await tracker.createProjectStructure();
}

async function createBlockers() {
  const tracker = new OrionRedtailProjectTracker();
  await tracker.createCriticalQuestions();
}

async function enhanceProject() {
  const enhancer = new OrionRedtailProjectEnhancer();
  await enhancer.enhanceFullProject();
}

function showHelp() {
  console.log(`
Orion-Redtail Linear Integration

Usage: npm run linear [command]

Commands:
  test           Test Linear API connection
  issues         Get your assigned issues
  teams          List available teams
  projects       List available projects
  setup-project  Create full project structure in Linear
  create-blockers Create critical blocker issues
  enhance-project Add milestones, updates, and advanced features

Setup:
1. Get your Linear API key from: https://linear.app/settings/api
2. Create a .env file with:
   LINEAR_API_KEY=your_api_key_here
   LINEAR_TEAM_ID=your_team_id (optional)
   LINEAR_PROJECT_ID=your_project_id (optional)

Example:
  npm run linear test
  npm run linear setup-project
`);
}

main().catch(console.error);