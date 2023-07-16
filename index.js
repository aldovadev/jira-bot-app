const createIssue = require("./CreateIssue.js");
const createProject = require("./CreateProject.js");
const getIssueByID = require("./GetIssueByID.js");
const deleteIssueByID = require("./DeleteIssueByID.js");
const getIssues = require("./GetIssues.js");
const getTransitions = require("./GetTransitions.js");
const getUsers = require("./GetUsers.js");
const updateStatus = require("./UpdateStatus.js");
const getProjects = require("./GetProjects.js");

// Common call pattern 1: create project, create issue in that project, and move that
// issue into in progress. This function will do exactly as described in the previous sentence
// by making 3 async calls to different functions which we imported at the top. See function logic
// in the individual function files which are named as obviously as possible :)
const createProjectIssueAndUpdate = async () => {
  const projectName = process.env.PROJECT_NAME;
  const projectKey = await createProject(projectName);
  console.log(`Created project with key: ${projectKey}`);

  const issueType = "backend";
  const summary = "NODEJS2-2";
  const description = "urgent task";

  const issueKey = await createIssue(
    "NODEJS2-2",
    issueType,
    summary,
    description
  );
  console.log(`Created issue with key: ${issueKey}`);

  // 11 == "To Do", 21== "In Progress", 31=="In Review", 41=="Done"
  const statusID = "21";

  const update = await updateStatus(issueKey, statusID);
  console.log(update);
};

const getRecentProjects = async () => {
  const recentProjects = await getProjects();
  console.log(recentProjects);
};

const getIssuesFunc = async () => {
  const issues = await getIssues();
  console.log(issues);
};

const getTransitionsFunc = async (issueKey) => {
  const transitions = await getTransitions(issueKey);
  console.log(transitions);
};

const getIssueByIDFunc = async (issueKey) => {
  const issue = await getIssueByID(issueKey);
  console.log(issue);
};

const deleteIssueByIDFunc = async (issueKey) => {
  const issue = await deleteIssueByID(issueKey);
  console.log(issue);
};

const updateStatusFunc = async (issueKey, statusID) => {
  const status = await updateStatus(issueKey, statusID);
  console.log(status);
};

const getUsersFunc = async () => {
  const users = await getUsers();
  console.log(users);
};

// Step 1, get user account ID to be able to assign a new project to a user
// Get users - needed to get the leadAccountID to be able to create a project!

getUsersFunc();

// Step 2, add the accountID to the env file, save the file and run source .env and then
// uncomment the function call below to create a project, create an issue in that project,
// and mark that issue as in progress

// createProjectIssueAndUpdate();

// Step 3, uncomment the function call below to get issues to see the newly created issue

// getIssuesFunc();

// Step 4, uncomment the function call below to get issues to see the newly created project
// Get recent projects

// getRecentProjects();

// Step 4, uncomment the function call below to get issues to see the newly created project
// Get recent projects

// getRecentProjects();

// Optional -- uncomment the function call below to get an issue by ID

// getIssueByIDFunc('NODEJS2-3')

// Optional -- uncomment the function call below to get transitions of a newly created project
// Get transitions - needed to see how to update the status of an issue

// getTransitionsFunc('NODEJS2-3')

// updateStatusFunc('12281', '31')

// Optional -- uncomment the function call below to delete an issue by ID
// deleteIssueByIDFunc('NODEJS2-4');
