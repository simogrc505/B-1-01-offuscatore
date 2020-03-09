const { assoc, omit, compose, pick, mergeDeepLeft, toLower } = require('ramda')
const { if_exists, if_already_exists } = require('../../utilities/errors_code')
const Product = require('../user-data')

module.exports = {
  list: (params) => {
    return Product.find(params)
  }
}
