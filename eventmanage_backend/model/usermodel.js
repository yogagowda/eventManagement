const Mongoose = require("mongoose");
let User = new Mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
      },
      lastName: {
        type: String,
        required: true,
        trim: true
      },
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
      role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
      },
      password: {
        type: String,
        required: true
      }
})



module.exports=Mongoose.model("User", User);