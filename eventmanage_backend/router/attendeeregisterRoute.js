const express = require('express')
const router = express.Router()
const attendeeregisterController=require('../controller/attendeeregisterController')

router.post('/createattendeeregister',(req, res) => { 
    attendeeregisterController.createattendeeregister(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})
router.get('/getattendeeregister',(req, res) => { 
    attendeeregisterController.getattendeeregister(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})














module.exports=router