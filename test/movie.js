"use strict"

let request = require('supertest-as-promised')
const _ = require('lodash')
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

  describe('GET Request', function(){
    it('should get all movies', function(done){

      let movie_id
      let movie2_id

      let movie = {
        'title': 'Movie Title',
        'year': '2012'
      }
      let movie2 = {
        'title': 'Movie Title 2',
        'year': '2013'
      }
      request
        .post('/movie')
        .set('Accept', 'application/json')
        .send(movie)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      .then((res) => {
        movie_id = res.body.movie._id
        return request
          .post('/movie')
          .set('Accept', 'application/json')
          .send(movie2)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      })
      .then((res) => {
        movie2_id = res.body.movie._id
        return request
          .get('/movie')
          .set('Accept','application/json')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })
      .then((res) => {
          let body = res.body
          expect(body).to.have.property('movies')
          expect(body.movies).to.be.an('array').and.to.have.length.above(2)

          let movies = body.movies
          movie = _.find(movies, {_id: movie_id})
          movie2 = _.find(movies, {_id: movie2_id})

          expect(movie).to.have.property('_id', movie_id)
          expect(movie).to.have.property('title', 'Movie Title')
          expect(movie).to.have.property('year', '2012')

          expect(movie2).to.have.property('_id', movie2_id)
          expect(movie2).to.have.property('title', 'Movie Title 2')
          expect(movie2).to.have.property('year', '2013')

          done()
      }, done)
    })
  })

  describe('GET request /:id', function(){
    it('should get one movie only', function(done){
      let movie_id
      let movie = {
        "title": "her",
        "year": "2014"
      }

      request
        .post('/movie')
        .set('Accept', 'application/json')
        .send(movie)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      .then((res) => {
        movie_id = res.body.movie._id
        return request
          .get('/movie/' + movie_id)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })
      .then((res) => {
        let body = res.body
        expect(body).to.have.property('movie')
        movie = body.movie
        expect(movie).to.have.property('_id', movie_id)
        expect(movie).to.have.property('title','her')
        expect(movie).to.have.property('year','2014')
        done()
      }, done)
    })
  })

  describe('PUT Request :/movie', function(){
    it('should modify a movie', function(done){
      let movie_id
      let movie = {
        "title": "Pulp Fiction",
        "year": "2015"
      }

      request
        .post('/movie')
        .set('Accept', 'application/json')
        .send(movie)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      .then((res) => {
        movie_id = res.body.movie._id
        return request
          .put('/movie/' + movie_id)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })
      .then((res) => {
        let body = res.body
        expect(body).to.have.property('movie')
        movie = body.movie
        expect(movie).to.have.property('_id', movie_id)
        expect(movie).to.have.property('title','Pulp Fiction')
        expect(movie).to.have.property('year','2015')
        done()
      }, done)
    })
  })
})
