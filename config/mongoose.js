// require the library
const mongoose = require('mongoose');

// connect to the databse
mongoose.connect('mongodb://localhost/contacts_list_db');

// acquire the connection(to check if it is successful)
const db = mongoose.connection;

// if there is an error
db.on('error', console.error.bind(console,'error connecting to db'));

// if it is up and runnng show this msg on console
db.once('open', function(){
    console.log('successfully connected to the database');
});