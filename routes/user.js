const express = require('express')
const { saveUser,loginUser ,getUser} = require('../db')
const {userSchema} = require('../models/user')


const router = express.Router()

router.post('/user', (req, res) => {
    const user = req.body
    console.log(req.body)
    const result = userSchema.validate(user)
  if (result.error) {
    console.log(result.error)
    res.status(400).end()
    return
  }
  getUser(user.userName)
      .then((getuser) => {
        console.log("sdf"+getuser)
        console.log("sdf"+getuser!=[])

        if(getuser!=[]){
          if(getuser[0].userName==user.userName){
            res.json({message: 'UserName Already Existed'})
          }
        }
         
        else{
          saveUser(user)
          .then((succ) => {
            res.status(200).json({
              message: 'User Saved Successfully',
              userId:succ.insertedId
          });    
          })
          .catch((err) => {
            console.log(err)
            res.status(500).end()
          })
            }
      })
      .catch((err) => {
        console.log(err)
        res.status(500).end()
      })
    
      })
  router.post('/login', (req, res) => {
    const loginuser = req.body
    console.log(req.body)
    console.log(loginuser.userName)

    loginUser(loginuser.userName)
      .then((user) => {
        if(loginuser.password==user[0].password){
          res.json({message: 'User LoggedIn Successfully',
          userId:user[0]._id})  
        }  
        else{
          res.json({message: 'UserName/Password Invalid'})  
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(500).end()
      })
  })
  module.exports = router
