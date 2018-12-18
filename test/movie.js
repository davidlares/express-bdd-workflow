"use strict"

let request = require('supertest-as-promised')
const api = require('../app')
// defining host
const host = api

// passing host that aims the tests
request = request(host)

describe('movie route', function(){
  describe('POST Request to Host', function(){
    it('this should create a movie', function(done){

      let movie = {
        'title': 'Movie Title',
        'year': '2012'
      }

      request
        .post('/movie')
        .set('Accept', 'application/json')
        .send(movie)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      .end((err, res) => {
        let body = res.body
        expect(body).to.have.property('movie')
        movie = body.movie
        expect(movie).to.have.property('title', 'Movie Title')
        expect(movie).to.have.property('year', '2012')
        expect(movie).to.have.property('_id')
        // all expect have a callback at the start and when it finish
        done(err)
      })
    })
  })
})
