

const os = require('os');

const config = {
  gcloud: {
    bucket: "fldemo-files",
    hash: "833495298f6da5546203b3e472d62ff9"
  },
  bcrypt: {
    saltRounds: 12
  },
  admin_pass: "f78773b7",
  user_pass: "4d98c12475ca",
  admin_email: "admin@flatlogic.com",
  providers: {
    LOCAL: 'local',
    GOOGLE: 'google',
    MICROSOFT: 'microsoft'
  },
  secret_key: process.env.SECRET_KEY || '',
  remote: '',
  port: process.env.NODE_ENV === "production" ? "" : "8080",
  hostUI: process.env.NODE_ENV === "production" ? "" : "http://localhost",
  portUI: process.env.NODE_ENV === "production" ? "" : "3000",
  portUIProd: process.env.NODE_ENV === "production" ? "" : ":3000",
  swaggerUI: process.env.NODE_ENV === "production" ? "" : "http://localhost",
  swaggerPort: process.env.NODE_ENV === "production" ? "" : ":8080",

  uploadDir: os.tmpdir(),
  email: {
    from: 'abletonCookBook <app@flatlogic.app>',
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  },
  roles: {
    admin: 'Administrator',
    user: 'User',
  },

  project_uuid: 'f78773b7-d9e7-42c4-a3fc-4d98c12475ca',
  flHost: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'dev_stage' ? 'https://flatlogic.com/projects' : 'http://localhost:3000/projects',

};

config.host = process.env.NODE_ENV === "production" ? config.remote : "http://localhost";
config.apiUrl = `${config.host}${config.port ? `:${config.port}` : ``}/api`;
config.swaggerUrl = `${config.swaggerUI}${config.swaggerPort}`;
config.uiUrl = `${config.hostUI}${config.portUI ? `:${config.portUI}` : ``}/#`;
config.backUrl = `${config.hostUI}${config.portUI ? `:${config.portUI}` : ``}`;

module.exports = config;
