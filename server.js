const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body Parser Middleware

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 

mongoose
.connect('mongodb://localhost/test',{useNewUrlParser: true});
mongoose.connection.once('open',function(){
    console.log("Connection has been made");
}).on('error', function(error) {
    console.log('Error is: ', error)
})

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport.js')(passport);

//USE ROUTES

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running on port ${port}`));

