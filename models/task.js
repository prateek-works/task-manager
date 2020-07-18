
const mongoose = require('mongoose');

//create a schema
const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    select:{
        type:Boolean,
        default:false
    }
});


// 'Task' is the name of the collection in the database 
const Task = mongoose.model('Contact', taskSchema);


module.exports = Task;