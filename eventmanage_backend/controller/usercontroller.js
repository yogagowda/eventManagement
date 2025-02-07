const md5 = require('md5')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const usermodel=require('../model/usermodel')
const signUp=(req)=>{
    return new Promise(async(res,rej)=>{
        try {
            let body=req.body;
            let userList = new usermodel({
                firstName: body.firstName,
                lastName:body.lastName,
                username:body.firstName+body.lastName,
                password: md5(body.password),
                email: body.email,
                role: body.role
            })
            await userList.save().catch(error => rej({
                message: error.message
            }))
            res({
                userList,
                message: 'user created',
            })

        } catch (error) {
            rej({
                message:error.messege
            })
            
        }

    })
}
const login = (req) => {
    return new Promise(async (res, rej) => {
        try {
            let body = req.body;
            const user = await usermodel.findOne({
                email: body.email.toLowerCase(), // Assuming emails are stored in lowercase
                password: md5(body.password)
            }).catch(err => {
                console.log("err====", err);
                rej({
                    message: err.message
                });
            });

            console.log("user=====", user);

            if (!user) {
                return rej({
                    message: "Username or Password not matching!!!"
                });
            }

            const jwtBody = {
                name: user.username,
                password: user.password,
                email: user.email,
                _id: user._id
            };

            const token = await jwt.sign(jwtBody, `${process.env.AUTH_KEY}`);

            res({
                user,
                token,
                message: 'success'
            });

        } catch (error) {
            rej({
                message: error.message
            });
        }
    });
};

module.exports = {
    signUp,
    login
}