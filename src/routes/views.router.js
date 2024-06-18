const express = require('express')
const router = express.Router()

// http://localhost:8080/views?name=Gabi
// http://localhost:8080/views?name=Gabi&lastname=Fernandez
router.get('/', async (req, res) => {
    const name = req.query.name
    const lastName = req.query.lastname
    const user = {
        name: name,
        lastName: lastName
        }
        res.render("index", user)
})
module.exports = router