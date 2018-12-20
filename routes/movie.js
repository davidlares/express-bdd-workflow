"use strict"

const express = require('express');
const _ = require('lodash')
const router = express.Router();
const Movie = require('../lib/models/movie')

// temporary BD
// var Movie = {}
router.post('/', function(req, res, next) {
  console.log('POST: movie', req.body)
  if(!req.body){
    res.status(403).json({message: 'Empty Request', error: true})
  }
  let _movie = req.body
  new Movie({
    title: _movie.title,
    year: _movie.year
  })
  .save((err, movie) => {
    if(err){
      res.status(403).json({message: 'Error Request', error: true})
    }
    // _movie._id = Date.now()
    // Movie[_movie._id] = _movie
    // res.status(201).json({movie: Movie[_movie._id]})
    res.status(201).json({movie: movie})
  })
});

router.get('/', function(req,res,next){
  console.log('GET: ', req.body)
    Movie.find({}, (err, movies) => {
      if(err){
        res
        .status(403)
        .json({message: 'Error Request', error: true})
      }
      res.status(200).json({movies: movies})
  })
  // res.status(200).json({movies: _.values(Movie)})
})

router.get('/:id', function(req,res,next){
  console.log('GET: ', req.params.id)
  if(!req.params.id){
    res
      .status(403)
      .json({message: 'Params Request', error: true})
  }
  // let movie = Movie[req.params.id]
  let _id = req.params.id
  Movie.findOne({_id: _id}, (err, movie) => {
    if(err){
      res
      .status(403)
      .json({message: 'Error Request', error: true})
    }
    res.status(200).json({movie: movie})
  })
})

router.put('/:id', function(req,res,next){
  console.log('PUT: ', req.params.id)
  if(!req.params.id && !req.body){
    res.status(403).json({message: 'Params Request', error: true})
  }
  let _id = req.params.id
  let new_movie = req.body
  Movie.findByIdAndUpdate(_id, {
    $set: {
      title: new_movie.title,
      year: new_movie.year
    }
  }, {new: true}, (err, mov) => {
    res.status(200).json({movie: mov})
  })
})

router.delete('/:id', function(req,res,next){
  console.log('DELETE: ', req.params.id)
  if(!req.params.id){
    res
      .status(403)
      .json({message: 'Params Request', error: true})
  }
  let _id = req.params.id
  // delete Movie[id]
  Movie.findByIdAndRemove(_id, (err, done) => {
    if(err){
      res.status(403).json({message: 'Error Request', error: true})
    }
    res.status(400).json({})
  })
})

module.exports = router;
