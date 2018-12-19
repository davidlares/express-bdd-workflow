"use strict"
const express = require('express');
const jwt = require('jsonwebtoken')
const User = require('../lib/models/user')
const config = require('../lib/config')
const crypto = require('crypto'), algorithm = 'aes-256-ctr', password = 'davidhi'
const router = express.Router();

function encrypt(text){
  let cipher = crypto.createCipher(algorithm, password)
  let crypted = cipher.update(text, 'utf8','hex')
  crypted += cipher.final('hex')
  return crypted
}

function decrypt(text){
  let decipher = crypto.createDecipher(algorithm, password)
  let dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

router.post('/', function(req, res, next) {
  console.log("POST AUTH")
  if(!req.body){
    res.status(403).json({error: true, message: 'Body empty'})
  }
  let _user = req.body
  User.findOne({username: _user.username}, (err, user) => {
    if(err){
      res.status(403).json({error: true, message: 'Error'})
    } else if(user) {
      if(user.password === encrypt(_user.password)){
        let token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: '24hr'
        })
        console.log(token)
        res.status(201).json({token: token})
      } else {
        res.status(403).json({error: true, message: 'User not found'})
      }
    }
  })
})

module.exports = router;
