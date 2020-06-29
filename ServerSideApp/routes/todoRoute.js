const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const todo = require('../models/todo');



const todoRouter = express.Router();

todoRouter.use(bodyParser.json());

todoRouter.route('/')
.get((req,res,next)=>{
 
    todo.find({})
    .then((result)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result)
    },(err)=> next(err))
    .catch((err)=> {return next(err)})
    
    
})
.post((req,res,next)=>{
   

    todo.create(req.body)
    .then((result)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result)
    },(err)=>    next(err))
    .catch((err)=>  { return next(err)})


})

todoRouter.route('/:id')
.delete((req,res,next)=>{
    
    todo.findOneAndRemove(req.params.id)
    .then((result)=>{
        console.log(result)
        if(result==null){
            
            res.status(404)        // HTTP status 404: NotFound
       .send('Not found');
        }
        else{
        res.statusCode=200;
        res.json(result)
        }
    },
    (err)=> next(err))
    .catch((err)=>{return next(err)})
})


module.exports = todoRouter;