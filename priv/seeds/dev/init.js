const mongoose = require('mongoose')
const config = require('config')
// const config = require('../../../config/development.json')
const data_userdata = require('./load-users-data')

mongoose.connect(config.db.host, config.db.options)
data_userdata.seed()
  .then(() => console.log('done'))
  .catch((err) => {
    if (err) {
      throw err
    }
    console.log(err)
  })
  .finally(() => {
    mongoose.disconnect()
  })
