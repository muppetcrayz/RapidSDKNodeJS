var request = require('request');
var querystring = require('querystring');
var exports = module.exports = {};
var btoa = require("btoa");

// Enter your apiKey and apiSecret here
// You can get these from the RapidSDK Dashboard
var apiKey = 'API_KEY';
var apiSecret = 'API_SECRET';

// Authorization Header
var authorizationHeader = 'Basic ' + btoa(apiKey + ':' + apiSecret);

var sessionID;
var userID;

exports.Login = function (email, password, callback) {

    try {
        var form = {
            username: email,
            password: password,
        };

        var formData = querystring.stringify(form);
        var contentLength = formData.length;

        request({
            "rejectUnauthorized": false,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': authorizationHeader
            },
            uri: 'https://api.rapidsdk.com/v1/login',
            body: formData,
            method: 'POST'
        }, function (err, res, body) {
            //response from server
            body = JSON.parse(body);
            sessionID = body['session_id'];
            userID = body['user_id'];
            callback(body);
        });


    }
    catch (ex) {
        return 'Failed';
    }

}

exports.Logout = function (callback) {

    try {
        var form = {
            session_id: sessionID,
            user_id: userID,
        };

        var formData = querystring.stringify(form);
        var contentLength = formData.length;

        request({
            "rejectUnauthorized": false,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': authorizationHeader
            },
            uri: 'https://api.rapidsdk.com/v1/logout',
            body: formData,
            method: 'POST'
        }, function (err, res, body) {
            //response from server
            body = JSON.parse(body);
            callback(body);
        });


    }
    catch (ex) {
        return 'Failed';
    }

}

exports.Register = function (firstname, lastname, email, password, callback) {

    try {
        var form = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
        };

        var formData = querystring.stringify(form);
        var contentLength = formData.length;

        request({
            "rejectUnauthorized": false,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': authorizationHeader
            },
            uri: 'https://api.rapidsdk.com/v1/register',
            body: formData,
            method: 'POST'
        }, function (err, res, body) {
            //response from server
            body = JSON.parse(body);
            callback(body);
        });


    }
    catch (ex) {
        return 'Failed';
    }

}

exports.createData = function (jsonData, callback) {

    try {
        var form = {
            session_id: sessionID,
            data: jsonData,
        };

       var form = JSON.stringify(form);

        request({
            "rejectUnauthorized": false,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorizationHeader
            },
            uri: 'https://api.rapidsdk.com/v1/data/create',
            body: form,
            method: 'POST'
        }, function (err, res, body) {
            // response from server
            // body = JSON.parse(body);
            callback(body);
        });

    }
    catch (error) {
        console.error("ERROR! ", error);
    }
}

exports.readData = function (jsonData, callback) {

    try {
        var form = {
            session_id: sessionID,
            data: jsonData,
        };

        var form = JSON.stringify(form);

        request({
            "rejectUnauthorized": false,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorizationHeader
            },
            uri: 'https://api.rapidsdk.com/v1/data/read',
            body: form,
            method: 'POST'
        }, function (err, res, body) {
            //response from server
            body = JSON.parse(body);
            callback(body);
        });

    }
    catch (error) {
        console.error("ERROR! ", error, callback);
    }

}

exports.updateData = function (jsonData, callback) {

    try {
        var form = {
            session_id: sessionID,
            data: jsonData,
        };


       var form = JSON.stringify(form);

        request({
            "rejectUnauthorized": false,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorizationHeader
            },
            uri: 'https://api.rapidsdk.com/v1/data/update',
            body: form,
            method: 'POST'
        }, function (err, res, body) {
            //response from server
            body = JSON.parse(body);
            callback(body);
        });

    }
    catch (error) {
        console.error("ERROR! ", error);
    }
}

exports.deleteData = function (jsonData, callback) {

    try {
        var form = {
            session_id: sessionID,
            data: jsonData,
        };

        var form = JSON.stringify(form);

        request({
            "rejectUnauthorized": false,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorizationHeader
            },
            uri: 'https://api.rapidsdk.com/v1/data/delete',
            body: form,
            method: 'POST'
        }, function (err, res, body) {
            //response from server
            body = JSON.parse(body);
            callback(body);
        });

    }
    catch (error) {
        console.error("ERROR! ", error);
    }

}

var username = "test@test.com";
var password = "test";
var firstname = "test";
var lastname = "test";
var createData = {"test": "test"};
var readData = ["test"];
var updateData = {"test": "hello"};

exports.Register(firstname, lastname, username, password, function(registerReturn) {
  console.log(registerReturn);
  exports.Login(username, password, function(loginReturn) {
    console.log(loginReturn);
    exports.createData(createData, function(createReturn) {
      console.log(createReturn);
      exports.readData(readData, function(readReturn) {
        console.log(readReturn);
        exports.updateData(updateData, function(updateReturn) {
          console.log(updateReturn);
          exports.readData(readData, function(readReturn) {
            console.log(readReturn);
            exports.deleteData(readData, function(deleteReturn) {
              console.log(deleteReturn);
            })
          });
        });
      });
    });
  });
});
