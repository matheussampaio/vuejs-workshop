'use strict'

const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  MOVIES_URL: `"${process.env.MOVIES_URL}"`,
  API_KEY: `"${process.env.API_KEY}"`,
  NODE_ENV: '"production"'
}
