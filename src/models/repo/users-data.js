const { assoc, omit, compose, pick, mergeDeepLeft, toLower } = require('ramda')
const { if_exists, if_already_exists } = require('../../utilities/errors_code')
const Userdata = require('../user-data')

module.exports = {
  list: (params) => {
    let where = omit(
      ['limit', 'offset', 'orderBy', 'page', 'order'],
      params
    )

    return Promise.all([
      Userdata
        .find(where)
        .skip((params.page - 1) * params.limit)
        .limit(params.limit)
        .sort({ [params.orderBy]: toLower(params.order) }),
      Userdata.countDocuments(where),
    ])
      .then(([docs, total]) => {
        return {
          docs,
          total,
        }
      })
  },
}
