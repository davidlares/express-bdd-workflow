"use strict"

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

// chai use chaiAsPromised to make it async
chai.use(chaiAsPromised)

// global config
global.AssertionError = chai.AssertionError
global.expect = chai.expect
