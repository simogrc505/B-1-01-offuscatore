const Userdata = require('../../src/models/userdata')
/**
 * Make any changes you need to make to the database here
 */
async function up() {
  // Write migration here
  return Userdata.createIndexes({ created_at: 1 }) // schema level
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  // Write migration here
}

module.exports = { up, down }
