//const express = require("express");
//this is brought to device from iternet via npm install express
const express = require('express')
const app = express()
const port = 3000
//similar to fs. 

app.get("/route-handler", function(req, res) {
    res.json({
        name: "harkirat", 
        age: 21
    })
})
//we need ports to run different servers and requests.
//http 1, 2, 3 differences are that protocols get better
//you can use http and rest api interchangeably

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/hi-there', function (req, res) {
    res.send('<b>hi there</b>');
})

app.post('/conversations', function (req, res) {
    console.log(req.headers)
    res.send('<b>hi there</b>');
})


//for gpt app.post('/backend-api/conversation' would be the function
app.listen(port)
//node js also gives http module to create an http server