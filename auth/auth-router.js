const router = require('express').Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../database/dbConfig')

router.post('/register', (req, res) => {
  // implement registration
  const credentials = req.body

  if (credentials.username && credentials.password && typeof credentials.password === "string"){
    const rounds = 4
    const hash = bcrypt.hashSync(credentials.password, rounds)

    credentials.password = hash

    db('users').insert(credentials)
    .then((id) => {
      const token = signToken(id)
      res.status(201).json({ data: credentials, token })
    })
    .catch((error) => {
      res.status(500).json({ error: error.message})
    })

  } else {
    res.status(400).json({
      message: "Please provide username and password"
    })
  }
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body

  if (username && password && typeof password === "string") {
    db('users').where({ username: username})
    .then(([user]) => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user)
        res.status(200).json({ message: 'Welcome to our API', token})
      }
      else {
        res.status(401).json({ message: "Invalid credentials"})
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message })
    })
  } else {
    res.status(400).json({
      message: "Please provide username and password"
    })
  }
});


function signToken(user) {
  const payload = {
    username: user.username,
  }

  const secret = process.env.JWT_SECRET || "is it secret, is it safe?"

  const options = {
    expiresIn: "1d"
  }

  return jwt.sign(payload, secret, options)
}

module.exports = router;
