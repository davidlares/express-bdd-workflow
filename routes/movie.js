"use strict"

var express = require('express');
var _ = require('lodash')
var router = express.Router();

// temporary BD
var Movie = {}

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log('POST: movie', req.body)
  if(!req.body){
    res
      .status(403)
      .json({message: 'Empty Request', error: true})
  }

  let _movie = req.body
  _movie._id = Date.now()
  Movie[_movie._id] = _movie
  res.status(201).json({movie: Movie[_movie._id]})
});

router.get('/', function(req,res,next){
  console.log('GET: ', req.body)
  res.status(200).json({movies: _.values(Movie)})
})

router.get('/:id', function(req,res,next){
  console.log('GET: ', req.params.id)
  if(!req.params.id){
    res
      .status(403)
      .json({message: 'Params Request', error: true})
  }
  let movie = Movie[req.params.id]
  res.status(200).json({movie: movie})
})

router.put('/:id', function(req,res,next){
  console.log('PUT: ', req.params.id)
  if(!req.params.id && !req.body){
    res
      .status(403)
      .json({message: 'Params Request', error: true})
  }
  let new_movie = req.body
  new_movie._id = parseInt(req.params.id, 10)
  // let old_movie = Movie[req.params.id]
  new_movie = Movie[req.params.id]
  res.status(200).json({movie: new_movie})
})

router.delete('/:id', function(req,res,next){
  console.log('DELETE: ', req.params.id)
  if(!req.params.id){
    res
      .status(403)
      .json({message: 'Params Request', error: true})
  }
  let id = req.params.id
  delete Movie[id]
  res.status(400).json({})
})

module.exports = router;
