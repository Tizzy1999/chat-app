var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// Parse the POST request and store it, Middleware
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// tell express, we want to use ejs as our view engine
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
// map the assets routing request to the actual static folder
app.use('/assets', express.static('assets'));

app.get('/',function(req, res){
  res.render('index.ejs');
});

// get request
app.get('/contact',function(req, res){
  console.log(req.query);
  res.render('contact.ejs',{qs: req.query} );
});
// post request
app.post('/contact',urlencodedParser, function(req, res){
  console.log(req.body);
  res.render('contact-success.ejs',{data: req.body} );
});


app.get('/profile/:name',function(req, res){
  var data = {age: 19, job: 'CEO', hobbies: ['lifting','shopping','cooking']};
  res.render('profile.ejs',{person: req.params.name, data: data});
});

app.listen(3000);
