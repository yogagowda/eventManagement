const eventmodel=require('../model/eventmodel');
const mongoose = require("mongoose"); 

const createevent=(req)=>{
    return new Promise(async(res,rej)=>{
        try {
             const createevent=new eventmodel({
                eventName : req.body.eventName,
                description:req.body.description,
                date:req.body.date,
                Type:req.body.Type,
            })
            await createevent.save().then().catch(err=>{
                rej({
                    messege:err.messege
                })
            })
            res({
                createevent

            }) 
        } catch (error) {
            console.log("error===",error)
            rej({
                messege:error.messege
            })
            
        }
    })
}
const getevent = (req) => {
  return new Promise(async (res, rej) => {
      try {
          const limit = req.query.limit ? parseInt(req.query.limit) : 10;
          const skip = req.query.skip ? parseInt(req.query.skip) : 0;

          let response = await eventmodel.aggregate([
              {
                  $lookup: {
                      from: "attendeeregisters",
                      localField: "_id",
                      foreignField: "event",
                      as: "eventregister"
                  }
              },
              {
                  $addFields: {
                      totalAttende: { $size: "$eventregister" }
                  }
              },
              {
                  $project: {
                      eventName: 1,
                      _id: 1,
                      description: 1,
                      date: 1,
                      Type: 1,
                      totalAttende: 1
                  }
              },
              { $skip: skip },   // Apply pagination
              { $limit: limit }
          ]);

          // Getting total count separately
          let totalCount = await eventmodel.countDocuments();

          res({
              list: response,  // response is already an array
              count: totalCount // Return total count separately
          });

      } catch (error) {
          rej({
              message: error.message
          });
      }
  });
};

const updtaevent=(req)=>{
    return new Promise(async(res,rej)=>{
        try {
            console.log("req.query._id ===",req.params.eventid);
            const eventid = req.params.eventid; 
            const updateData = req.body; // Extract data to update from request body

            if (!eventid) {
              return rej(new Error("eventid is required to update user"));
            }
            const updtaevent= await eventmodel.findOneAndUpdate(
                { _id: eventid }, // Find user by _id
        updateData, // Update fields
        { new: true } 
            );
            if (updtaevent) {
                res(updtaevent);
              } else {
                rej(new Error("event not found"));
              }
        } catch (error) {
            rej({
                message:error.message
            })
            
        }
    })

}
const deleteevent = (req) => {
    return new Promise(async (resolve, reject) => {
      try {
        const eventid = req.params.eventid;  
  
        if (!eventid) {
          return reject(new Error("_id is required to delete a user"));
        }
  
        const deleteResult = await eventmodel.deleteOne({ _id: eventid });
  
        if (deleteResult.deletedCount > 0) {
          resolve({
            message: "User deleted successfully",
            result: deleteResult
          });
        } else {
          reject(new Error("User not found or already deleted"));
        }
  
      } catch (error) {
        reject({ message: error.message });
      }
    });
  };
  const geteventByID = (req) => {
    return new Promise(async (res, rej) => {
        try {
            console.log("req.params.eventid ===", req.params.eventid);
            const eventid = req.params.eventid; 

            if (!eventid) {
                return rej({ message: "eventid is required to fetch event" });
            }

            const geteventData = await eventmodel.findById(eventid);

            if (geteventData) {
                res(geteventData);
            } else {
                rej({ message: "Event not found" });
            }
        } catch (error) {
            rej({ message: error.message });
        }
    });
};

const getEventAttendees = (req) => {
  return new Promise(async (res, rej) => {
    try {
      const eventId = req.params.eventId;

      if (!eventId) {
        return rej({ message: "Event ID is required" });
      }

      const response = await eventmodel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(eventId),
          },
        },
        {
          $lookup: {
            from: "attendeeregisters",
            localField: "_id",
            foreignField: "event",
            as: "eventRegister",
          },
        },
      ]);

      if (!response || response.length === 0) {
        return rej({ message: "No event found with the given ID" });
      }

      return res({ data: response });

    } catch (error) {
      return rej({ message: error.message });
    }
  });
};




module.exports={
    createevent,
    getevent,
    updtaevent,
    deleteevent,
    geteventByID,
    getEventAttendees
}
