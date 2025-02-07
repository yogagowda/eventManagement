const mongoose = require('mongoose'); // Use lowercase 'mongoose'

let attendeeRegisterSchema = new mongoose.Schema({ // Use lowercase 'mongoose'
    userName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phoneNO: {
        type: Number,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId, // Use lowercase 'mongoose'
        ref: 'Event' // Add reference if needed
    }
});

// Correctly export the model using the schema
module.exports = mongoose.model("AttendeeRegister", attendeeRegisterSchema);
