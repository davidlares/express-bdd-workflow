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

module.exports = router;
