const attendeeregistermodel=require('../model/attendeeregistermodel')
const createattendeeregister = (req) => {
    return new Promise(async (res, rej) => {
        try {
            const { userName, email, phoneNO, event } = req.body;

            // Check if the user already exists
            const existingAttendee = await attendeeregistermodel.findOne({ email });
            if (existingAttendee) {
                return rej({ message: "User already registered" }); // Add return to stop execution
            }

            // Create new attendee
            const newAttendee = new attendeeregistermodel({
                userName,
                email,
                phoneNO,
                event
            });

            // Save the attendee
            await newAttendee.save();

            // Resolve the promise with the new attendee
            res({ message: "Registration successful", data: newAttendee });

        } catch (error) {
            rej({ message: error.message }); // Fix typo
        }
    });
};

const getattendeeregister=(req)=>{
    return new Promise(async(res,rej)=>{
        try {
            const limit = req.query.limit ? parseInt(req.query.limit) :10
            const skip = req.query.skip ? parseInt(req.query.skip) :0
            const result = await attendeeregistermodel.aggregate([
                {
                    $lookup: {
                        from: "eventdatas",
                        localField: "event",
                        foreignField: "_id",
                        as: "attendeeregisteredEvents"
                    }
                },
                { $unwind: "$attendeeregisteredEvents" },
                {
                    $project: {
                        _id: 1,
                        userName: 1,
                        email: 1,
                        phoneNO: 1,
                        event: 1,
                        eventName: "$attendeeregisteredEvents.eventName"
                    }
                },
                {
                    $facet: {
                        totalCount: [{ $count: "count" }],
                        paginatedResults: [{ $skip: skip }, { $limit: limit }]
                    }
                }
            ]).catch(e =>{ 
                console.log("e=====",e)
                rej({              
                message: e.message
            })})
            let totalCount = result[0].totalCount.length ? result[0].totalCount[0].count : 0;
            let attendees = result[0].paginatedResults;
        
        res({
            attendeeslist: attendees,
            count: totalCount
        })
            
        } catch (error) {
            rej({
                message: error.message
            })
            
        }

    })

}


module.exports={
    createattendeeregister,
    getattendeeregister
}