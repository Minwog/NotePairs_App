// Server Node pour faire tourner l'application angular.
//------------------------------------

var express = require('express');

//------------------------------------

var app=express();

app.use(express.static(__dirname));


app.get('/', function(req, res) {
    res.sendfile('index.html');
});

app.get('/admin',function (req,res) {
    res.sendfile('app/Admin/pages/index.html')
});



app.listen('3000',function () {
    console.log('server listening on port 3000');
});