var http = require('http');
var request = require('request');
var querystring = require('querystring');
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser')
var RapidSDK = require('./RapidSDK');


// On successful login, this will be used later
global.userID = "";
global.sessionID = "";

app.use(express.static(__dirname + "/"));

var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port


    console.log("Example app listening at http://%s:%s", host, port)

})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



// Requesting Homepage (Login Page)
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "login.html");
});

// Login Post
app.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    RapidSDK.Login(email, password, function (result) {
        console.log(result);
        if (result.status == 'Success') {
            console.log('Login Successful'); 

            userID = result.user_id;
            sessionID = result.session_id;
            res.send(result);                
        }
        else {
            console.log('Login Failed');  
            res.send(result);             
        }
    });
});

// Requesting Register
app.get('/logout', function (req, res) {
   

    RapidSDK.Logout(userID, sessionID, function (result) {
        console.log(result);
        if (result.status == 'Success') {
            console.log('Logout Successful'); 
            res.sendFile(__dirname + "/" + "logout.html");     
        }
        else {
            console.log('Logout Failed');  
            res.send(result);             
        }
    });

});

// Requesting Register
app.get('/register', function (req, res) {
    res.sendFile(__dirname + "/" + "register.html");
});

// Register Post
app.post('/register', function (req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;

    RapidSDK.Register(firstname, lastname, email, password, function (result) {
        console.log(result);
        if (result.status == 'Success') {
            res.send(result);        
        }
        else {
            console.log('Register Failed');      
            res.send(result);       
        }
    });
});

// Requesting Datademo
app.get('/datademo', function (req, res) {
    res.sendFile(__dirname + "/" + "datademo.html");
    console.log(sessionID);
});


// Create Data Post
app.post('/createData', function (req, res) {

    // This is going to be a JSON as a string
    jsonData = req.body;

    var currentSessionID = global.sessionID;

    RapidSDK.createData(jsonData, currentSessionID, function (result) {
        console.log(result);
        if (result.status == 'Success') {
            console.log('Data Create Successful'); 
            res.send(result);                
        }
        else {
            console.log('Data Create Failed');  
            res.send(result);             
        }
    });
});

// Read Data Post
app.post('/readData', function (req, res) {

    // This is going to be a JSON as a string
    jsonData = req.body;
    
    var currentSessionID = global.sessionID;

    RapidSDK.readData(jsonData, currentSessionID, function (result) {
        console.log(result);
        res.send(result);        
    });
});

// Update Data Post
app.post('/updateData', function (req, res) {

    // This is going to be a JSON as a string
    jsonData = req.body;

    var currentSessionID = global.sessionID;

    RapidSDK.updateData(jsonData, currentSessionID, function (result) {
        console.log(result);
        if (result.status == 'Success') {
            console.log('Data Update Successful'); 
            res.send(result);                
        }
        else {
            console.log('Data Update Failed');  
            res.send(result);             
        }
    });
});

// Delete Data Post
app.post('/deleteData', function (req, res) {

    // This is going to be a JSON as a string
    jsonData = req.body;
    
    var currentSessionID = global.sessionID;

    RapidSDK.deleteData(jsonData, currentSessionID, function (result) {
        console.log(result);
        if (result.status == 'Success') {
            console.log('Data Delete Successful'); 
            res.send(result);                
        }
        else {
            console.log('Data Delete Failed');  
            res.send(result);             
        }        
    });
});

