const express = require('express')
const router = express.Router();
const eventcontroller=require('../controller/eventcontroller')

router.post('/createdeevent',(req, res) => { 
    eventcontroller.createevent(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})
router.get('/getevent',(req, res) => { 
    eventcontroller.getevent(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})
router.get('/geteventById/:eventid',(req, res) => { 
    eventcontroller.geteventByID(req).then((data) => {
        res.status(200).send(data)
    }).catch(e => res.status(500).send({
        message: e.message
    }))
})
router.put('/updateevent/:eventid', (req, res) => { 
    eventcontroller.updtaevent(req)
      .then((data) => res.status(200).json(data))
      .catch(e => res.status(500).json({ message: e.message }));
});
router.delete('/deleteUser/:eventid', (req, res) => { 
    eventcontroller.deleteevent(req)
          .then((data) => res.status(200).json(data))
          .catch(e => res.status(500).json({ message: e.message }));
    });
    router.get('/geteventattendies/:eventId',(req, res) => { 
        eventcontroller.getEventAttendees(req).then((data) => {
            res.status(200).send(data)
        }).catch(e => res.status(500).send({
            message: e.message
        }))
    })




module.exports=router