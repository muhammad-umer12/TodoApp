const mongoose = require('mongoose');

const schema = mongoose.Schema;


const todoSchema =  new schema({
    name:{
        type: String,
        required:true,
        
    },
    check:{
        type: Boolean,
        required: true
    },
    
},
    {
        timestamps: true
    }    
    
    
);

const Todo = mongoose.model('Todo',todoSchema)
module.exports = Todo;