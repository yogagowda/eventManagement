const mongoose = require('mongoose')
const eventSchema=new mongoose.Schema({
    eventName : {type:String,
        require:true
    },
    description:{
        type:String
    },
    date:{
        type:String
    },
    Type:{
        type:String,
        enum:["Conference", "Workshop", "Meetup"]
    }
})
let eventdata=mongoose.model("eventdata",eventSchema)
module.exports=eventdata