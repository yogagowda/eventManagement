const express = require('express')
const router = express.Router();
router.use("/user",require('./router/userRoute'))
router.use("/event",require('./router/event'))
router.use("/attendeeregister",require('./router/attendeeregisterRoute'))





module.exports = router