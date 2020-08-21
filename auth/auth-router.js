const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { isValid } = require('./users-service')

router.post('/register', (req, res) => {
  // implement registration
  let credentials = req.body

  if (isValid(credentials)){
    const rounds = 4
    const hash = bcrypt.hashSync(credentials.password, rounds)

    credentials.password = hash

    
  }
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
