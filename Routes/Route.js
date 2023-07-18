const express = require("express");
const router = express.Router();
router.use(express.json());

const createIssue = require("./../Controllers/CreateIssue.js");
const createProject = require("./../Controllers/CreateProject.js");
const getIssueByID = require("./../Controllers/GetIssueByID.js");
const deleteIssueByID = require("./../Controllers/DeleteIssueByID.js");
const getIssues = require("./../Controllers/GetIssues.js");
const getTransitions = require("./../Controllers/GetTransitions.js");
const getUsers = require("./../Controllers/GetUsers.js");
const updateStatus = require("./../Controllers/UpdateStatus.js");
const getProjects = require("../Controllers/GetProject.js");

// Define the route and handler function
// 1=="To Do", 11 == "In Progress", 21== "Done"
router.post("/createProjectIssue", async (req, res) => {
  try {
    var { projectName, projectKey, issueType, summary, description, statusID } =
      req.body;

    const key = await createProject(projectName, projectKey);
    const issueKey = await createIssue(key, issueType, summary, description);
    const update = await updateStatus(issueKey, statusID);

    var status;

    if (statusID === "11" && update === 204) {
      status = "In Progress";
    } else if (statusID === "21" && update === 204) {
      status = "Done";
    } else {
      status = "To Do";
    }

    res.status(200).json({ key, issueKey, status });
    // console.log(key, issueKey, status);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/createProject", async (req, res) => {
  try {
    var { projectName, projectKey } = req.body;

    const key = await createProject(projectName, projectKey);

    if (key) {
      res.status(200).json({ projectName, projectKey, key });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
    // console.log(key);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/createIssue", async (req, res) => {
  try {
    var { projectKey, issueType, summary, description } = req.body;

    const issueKey = await createIssue(
      projectKey,
      issueType,
      summary,
      description
    );

    if (issueKey) {
      res.status(200).json({ message: `Issue ${issueKey} Berhasil Dibuat!` });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
    // console.log(key);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/updateStatus", async (req, res) => {
  try {
    var { issueKey, statusID } = req.body;
    const update = await updateStatus(issueKey, statusID);

    if (update === 204) {
      res.status(200).json({ message: `Update ${issueKey} Berhasil!` });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/getProjects", async (req, res) => {
  try {
    const recentProject = await getProject();
    res.status(500).json(recentProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/getIssues", async (req, res) => {
  try {
    const issues = await getIssues();
    res.status(500).json(issues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/getUsers", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(500).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/getTransitions", async (req, res) => {
  try {
    var { issueKey } = req.body;
    const transitions = await getTransitions(issueKey);

    res.status(200).json(transitions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/getIssueByID", async (req, res) => {
  try {
    var { issueKey } = req.body;
    const issue = await getIssueByID(issueKey);

    res.status(200).json(issue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
