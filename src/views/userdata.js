const { map, pick } = require('ramda')

const fields = ['id', 'firstname', 'lastname', 'email', 'date_of_birth', 'avatar_url', 'number']

module.exports = {
  many: map(pick(fields)),
}
