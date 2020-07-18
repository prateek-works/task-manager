const express = require('express');
const path = require('path');
const port = 8000;


const db = require('./config/mongoose');
const Task = require('./models/task');
const checking = require('./assets/js/home');

const app = express();


app.set('view engine' , 'ejs');  // to tell server that ejs will be our template
app.set('views' ,path.join(__dirname , 'views') );


// to parse the data that is send to the url
// middleware for parsing the form data
 app.use(express.urlencoded());   
 app.use(express.static('assets'));


 // for finding the tasks

app.get('/', function(req,res){

    Task.find({} , function(err , tasks){
     if(err){
         console.log('error in fetching tasks');
         return;
     }
    return res.render('home' , {
        title:"My todo app",
        tasks_list: tasks
    });
});
});

// for adding the contact

app.post('/create-task', function(req , res){
    
    Task.create({
        name:req.body.name,
        category:req.body.category,
        date:req.body.date
    }, function(err , newTask){
        if(err){
            console.log('Error in creating task');
            return;
        }
        return res.redirect('back');
    });    
});


// for select the task

app.get('/select-task', function(req, res){
    
    Task.findByIdAndUpdate(req.query.id,{
        $set:{
            select: true
        }
    },
    { useFindAndModify: false },
    function(err, result){
            if(err) { console.log("Error in updating database"); return;}
            return res.redirect('back');
        }
    );
});

// for deselect the task

app.get('/deselect-task', function(req, res){
    Task.findByIdAndUpdate(req.query.id,{
        $set:{
            select: false
        }
    },
    { useFindAndModify: false },
    function(err, result){
            if(err) { console.log("Error in updating database"); return;}
            return res.redirect('back');
        }
    );
});

// to delete selected contact

app.get('/delete-selected-task/' , function(req , res){

    Task.deleteMany({"select": true},function(err){
        if(err){ console.log("Error in deleting Tasks"); return}

        return res.redirect('back');
    });
});

app.listen(port, function(err){
    if (err){
        console.log('Error in running the server');
    }

    console.log('Server is running on the port:', port);
});
