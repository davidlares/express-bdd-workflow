"use strict"
let request = require('supertest-as-promised')
const _ = require('lodash')
const api = require('../app')
const mongoose = require('mongoose')
const config = require('../lib/config/')
// defining host
const host = api

// passing host that aims the tests
request = request(host)

describe('users route', function(){

  before(() => {
    mongoose.connect(config.database)
  })

  after((done) => {
    mongoose.disconnect(done)
    mongoose.models = {}
  })

  describe('POST Request to Host', function(){
    it('this should create a user', function(done){
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
      .end((err, res) => {
        let body = res.body
        expect(body).to.have.property('user')
        let user = body.user
        // expect(user).to.have.property('_id')
        // expect(user).to.have.property('password')
        expect(user).to.have.property('username','davidlares')
        done(err)
      })
    })
  })
})
