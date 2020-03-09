const repo = require('../models/repo/users-data')
const input = require('../input-filters/userdata')
const error = require('../views/error')
const view = require('../views/userdata')

// AUTH
const auth = require('@wdalmut/mini-auth')
const token = require('@wdalmut/token-auth')
const me = require('../microservices/auth')

// UTILITIES
const {randomEmail,
  randomDate,
  randomNumber,
  randomString} = require('../utilities/index')

const list = (req, res) => {
  repo
    .list(req.query)
    .then(users => {
      if (req.user.role === 'ROLE_ADMIN') {
        return res.status(200).json(view.many(users))
      } else {
        let newUsers = users.map(user => {
          let newUser = {
            id: user.id,
            firstname: randomString(2, 10),
            lastname: randomString(2, 10),
            email: randomEmail(),
            date_of_birth: randomDate(new Date(1000,1, 1), new Date()),
            number: user.number.substring(0,3)+randomNumber(2, 1000000)
          }
          newUser.avatar_url = 'https://via.placeholder.com/150x150.png?text='+newUser.firstname.charAt(0)+newUser.lastname.charAt(0)
          return newUser;
        })
        return res.status(200).json(view.many(newUsers));
      }
    })
    .catch(error.generic(res))
}

let userdata = require('express').Router()

userdata.get('/',
  auth(token(me)),
  input.validate_userdata_input,
  list
)

module.exports = userdata
