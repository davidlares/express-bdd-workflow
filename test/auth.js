"use strict"
let request = require('supertest-as-promised')
const _ = require('lodash')
const api = require('../app')
const mongoose = require('mongoose')
const config = require('../lib/config')
// defining host
const host = api

// passing host that aims the tests
request = request(host)

describe('users auth route', function(){

  before(() => {
    mongoose.connect(config.database)
  })

  after((done) => {
    mongoose.disconnect(done)
    mongoose.models = {}
  })

  describe('POST Request to Host for auth', function(){
    it.only('this should auth a user', function(done){
      let user = {
        'username': 'davidlares',
        'password': 'secret'
      }
      request
        .post('/user')
        .set('Accept', 'application/json')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      .then((res) => {
          return request
            .post('/auth')
            .set('Accept', 'application/json')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)
      })
      .then((res) => {
        let body = res.body
        expect(body).to.have.property('token')
        done()
      }, done)
    })
  })
})
