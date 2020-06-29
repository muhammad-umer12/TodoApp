const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('../models/user');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route('/')
.get((req,res,next) => {
    
    user.find({})
    .then((dishes)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log(dishes)
        res.json(dishes);
    
    },(error)=> next(error))
    .catch((err)=> next(err))
})
.post((req, res,next) => {
    

    console.log(req.body)
    user.create(req.body)
    .then((result)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        console.log(result);
        res.json(result)
    },(err)=>{
        next(err)
    })
    .catch((err)=> {

          next(err)
            })

})

userRouter.route('/login')
.post((req, res, next) => {
    console.log(req.body)
    user.findOne(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
    
        if(data == null)
        {
       
         return next(error)
  
        }
        else
        {
          console.log("data : "+ data);
  
          const token = jwt.sign({username :data.email},'encryptionkey')
          var obj = {
            _id : data._id,
            token : token
          }
          
        res.json({id:data._id, token : token})
        }
       
      }
    })
  });

module.exports = userRouter;




