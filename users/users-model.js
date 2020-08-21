const db = require('../database/dbConfig')

module.exports = {
    find
}

function find() {
    return db("users").select("id", "username").orderBy("id")
}