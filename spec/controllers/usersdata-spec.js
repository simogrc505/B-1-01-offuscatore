/* eslint-disable no-sequences */
/* eslint-disable no-undef */
/* global beforeEach describe it db_init expect */
/* eslint no-undef: 'error' */

const R = require('ramda')
const request = require('supertest')

describe('Userdata action', () => {
  beforeEach(db_init)

  let app

  beforeEach((done) => {
    app = require('../../src')
    done()
  })

  it('should list usersdata', (done) => {
    request(app)
      .get('/v1/userdata')
      .set('Authorization', 'Bearer admin')
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err
        }

        expect(R.map(R.pick(['id']), res.body)).toEqual([
          { id: '1' },
          { id: '2' },
          { id: '3' },
        ])

        done()
      })
  })

  it('should list usersdata ROLE_USER', (done) => {
    request(app)
      .get('/v1/userdata')
      .set('Authorization', 'Bearer user')
      .expect(200)
      .end((err, res) => {
         // console.log(res.error, res.body)
        if (err) {
          throw err
        }
        expect(R.compose(R.not, R.isEmpty)(res.body)).toEqual(true)
        done()
      })
  })
})
