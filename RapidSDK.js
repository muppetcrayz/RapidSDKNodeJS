var request = require('request');
var querystring = require('querystring');
var exports = module.exports = {};
var btoa = require("btoa");

// Enter your apiKey and apiSecret here 
// You can get these from the RapidSDK Dashboard
var apiKey = '748f65163e1412c1f3a5276e02678fca4985be1d21b57abfdf1f2e2d26ef8d05';
var apiSecret = 'e1789307502436255fbe79fddbc3ffecd48af3b7790d78c59f6d4e2ab76ae88b';

// Authorization Header
var authorizationHeader = 'Basic ' + btoa(apiKey + ':' + apiSecret);



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
            callback(body);

        });


    }
    catch (ex) {
        return 'Failed';
    }

}

exports.Logout = function (userID, sessionID, callback) {

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

exports.createData = function (jsonData, sessionID, callback) {

    try {
        var form = {
            session_id: sessionID,
            data: jsonData,
        };

         // DEBUG
         console.log("formData =", form);
       
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
            //response from server
            body = JSON.parse(body);
            callback(body);
        });

    }
    catch (error) {
        console.error("ERROR! ", error);
    }
}

exports.readData = function (jsonData, sessionID, callback) {

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
        console.error("ERROR! ", error);
    }

}

exports.updateData = function (jsonData, sessionID, callback) {

    try {
        var form = {
            session_id: sessionID,
            data: jsonData,
        };

         // DEBUG
         console.log("formData =", form);
       
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

exports.deleteData = function (jsonData, sessionID, callback) {

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












