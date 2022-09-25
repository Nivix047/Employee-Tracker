// Index.js initiates the app and prompts the questions

const { prompt } = require("inquirer");
const logo = require("asciliart-logo");
const db = require("./db");
require("console.table");
const utils = require("util");
db.query = utils.promisify(db.query);
