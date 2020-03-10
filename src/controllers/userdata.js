const repo = require('../models/repo/users-data')
const input = require('../input-filters/userdata')
const error = require('../views/error')
const view = require('../views/userdata')
const { mergeDeepLeft, compose, assoc, tap, prop } = require('ramda')


// AUTH
const auth = require('@wdalmut/mini-auth')
const token = require('@wdalmut/token-auth')
const me = require('../microservices/auth')
const { create_filters, append_headers } = require('../utilities/pagination')

// UTILITIES
const {randomEmail,
  randomDate,
  randomNumber,
  randomString} = require('../utilities/index')

const list = (req, res) => {
  let params = compose(
    mergeDeepLeft(req.query),
    assoc('page', 1),
    assoc('limit', 25),
    assoc('orderBy', '_id'),
    assoc('order', 'ASC')
  )({})

  repo
    .list(params)
    .then(create_filters(params))// ASSOC OFFSET E LIMIT AL RISULTATO DA PASSARE AD APPEND HEADERS(PER SETTARE I VARI CUSTOM HEADERS)
    .then(tap(append_headers(res)))
    .then(prop('docs'))
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
