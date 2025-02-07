
const {
    body,
    check,
    validationResult
} = require('express-validator');
const UserModel = require('../model/usermodel')
const stringFile = require('../common/string_file.json')
const md5 = require('md5')
exports.signUp = [
    check('email').not().isEmpty().withMessage('Email id does not exist').isEmail().withMessage('Invalid email'),
    check('password').not().isEmpty().withMessage('Password does not exist'),
    check('firstName').not().isEmpty().withMessage('First Name does not exist'),
    check('lastName').not().isEmpty().withMessage('Last Name does not exist'),
    check('email').custom(async (value) => {
        const user = await UserModel.findOne({
            email: value
        }, {
            _id: 1
        }).lean().catch(e => {
            throw Error(e.message)
        })
        if (user) throw Error("Email already exist")
        else return true
    }),
    (req, res, next) => {
        const errorValidation = validationResult(req)
        if (!errorValidation.isEmpty()) return res.status(422).send({
            message: errorValidation.errors.shift().msg
        })
        next()
    }
]

exports.login = [
    check('email').not().isEmpty().withMessage(stringFile.EMAIL_NOT_EMPTY).isEmail().withMessage(stringFile.VALID_EMAIL_ID).trim(),
    check('password').not().isEmpty().withMessage(stringFile.PASSWORD_NOT_EMPTY).matches(/^.{6,20}$/, 'i').withMessage(stringFile.PASSWORD_VALIDATION_MESSAGE),
    check('email').custom(async (value) => {
      const user = await UserModel.findOne({
        email: value.toLowerCase()
      }, {
        _id: 1
      }).lean().catch(e => {
        throw Error(e.message)
      })
      if (!user) throw Error(stringFile.WRONG_EMAIL)
      else return true
    }),
    check('password').custom(async (value, {
      req
    }) => {
      const user = await UserModel.findOne({
        email: req.body.email.toLowerCase(),
        password: md5(value)
      }, {
        _id: 1,
        status: 1
      }).lean().catch(e => {
        throw Error(e.message)
      })
      console,log("user====",user)
      if (!user) throw Error(stringFile.WRONG_PASSWORD)
      else return true
    }),
    (req, res, next) => {
      const errorValidation = validationResult(req)
      if (!errorValidation.isEmpty()) {
        return res.status(stringFile.VALIDATION_ERROR_STATUS_CODE)
      }
      next()
    }
  ]
exports.attendeeregister=[
    
]