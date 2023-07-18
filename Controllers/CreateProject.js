var axios = require("axios");
require("dotenv").config();

const username = process.env.ATLASSIAN_USERNAME;
const password = process.env.ATLASSIAN_API_KEY;
const domain = process.env.DOMAIN;

const auth = {
  username: username,
  password: password,
};

// Membuat Project Untuk Cloud JIRA
async function createProject(projectName, projectKey) {
  try {
    const leadAccountID = process.env.LEAD_ACCT_ID;
    const baseUrl = "https://" + domain + ".atlassian.net";
    const projKey = projectKey;

    const data = {
      key: projKey,
      name: projectName,
      projectTypeKey: "software",
      leadAccountId: leadAccountID,
    };

    const config = {
      headers: { "Content-Type": "application/json" },
      auth: auth,
    };

    const response = await axios.post(
      `${baseUrl}/rest/api/3/project`,
      data,
      config
    );
    return response.data.key;
  } catch (error) {
    console.log(error.response.data.errors);
  }
}

module.exports = createProject;
