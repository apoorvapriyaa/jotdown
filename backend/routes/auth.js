const express = require('express')
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')
let fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'apoorva77cupcake'

// ROUTE 1: create a user using: POST "/api/auth/createuser". No login required.
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('username', 'Username must be atleast 5 characters').isLength({ min: 5 }),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
    body('email', 'Enter a valid email').isEmail(),
], async (req, res) => {
    let success = false
    // if there are errors, return Bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    //check whether the email or username already exists
    let user
    let userEmail = await User.findOne({ email: req.body.email })
    let userUsername = await User.findOne({ username: req.body.username })
    if (userEmail) {
        return res.status(400).json({ success, error: "Sorry, a user with this email already exists." })
    }
    if (userUsername) {
        return res.status(400).json({ success, error: "Sorry, a user with this username already exists." })
    }

    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)
    user = await User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: secPass,
    })
    const data = {
        user: {
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
    success = true
    res.json({ success, authtoken })
})

// ROUTE 2: authenticate a user using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank!').exists()
], async (req, res) => {
    let success = false
    // if there are errors, return Bad request and the errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials." })
        }
        const passCompare = await bcrypt.compare(password, user.password)
        if (!passCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials." })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

// ROUTE 3: Get logged in user details: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

module.exports = router