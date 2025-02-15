const dotenv = require('dotenv-flow');
dotenv.config('../');

const path = require('path');
const fs  = require('fs');
const generateUuid = require('uuid').v4;

function configProject() {
const pluginsJsPath = path.join(__dirname, '..', 'packages', 'engine', 'src/project.ts');
const pluginsJsExamplePath = path.join(__dirname, 'project.example.js');

const uuid = generateUuid();

const newProjectId = uuid;

let projectId = process.env.PROJECT_ID

if(!projectId) {
  // check if there is a ../.env.local, if not copy .env.local.example to it
  const envLocalPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envLocalPath)) {
    const envLocalExamplePath = path.join(__dirname, '.env.local.example');
    fs.copyFileSync(envLocalExamplePath, envLocalPath);
  }
  // read the .env.local file and replace {uuid}
  const envLocalFile = fs.readFileSync(envLocalPath, 'utf8');
  let newEnvLocalFile = envLocalFile.replace('{uuid}', newProjectId);

  if (!newEnvLocalFile.includes('PROJECT_ID')) {
    newEnvLocalFile += `\nPROJECT_ID=${newProjectId}`;
  }

  fs.writeFileSync(envLocalPath, newEnvLocalFile);
  projectId = uuid;
}

  // read the example file as utf8
  const exampleFile = fs.readFileSync(pluginsJsExamplePath, 'utf8');
  // replace the text {uuid} with a uuid
  const newFile = exampleFile.replace('{uuid}', projectId);
  // write the new file
  fs.writeFileSync(pluginsJsPath, newFile);
}

configProject();