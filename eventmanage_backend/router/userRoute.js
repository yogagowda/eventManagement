const express = require('express')
const router = express.Router();
const userControlletr=require('../controller/usercontroller')
let userValidator = require('../validator/user')


router.post('/signUp', userValidator.signUp, (req, res) => {
    userControlletr.signUp(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})
router.post('/login', (req, res) => {
    userControlletr.login(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})



module.exports = router