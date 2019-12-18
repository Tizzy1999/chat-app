## HTTP Methods
A set of HTTP requests we make
- Get
- Post
- Delete
- Put

### Responding to requests
- Get
  - app.get('route', fn)
- Post
  - app.post('route', fn)
- Delete
  - app.delete('route', fn)

## Express Route Params
```javaScript
var express = require('express');
var app = express();
// Set up routes, response for get requests
app.get('/',function(req, res){
  // using express, we don't need to specify heads, automatically done for us
  res.send('Home Page Arrived');
});

app.get('/contact',function(req, res){
  res.send('Contact Page Arrived');
});
// dynamic paging based on id entered by user
app.get('/profile/:id',function(req, res){
  res.send('You requested to see a profile with the id of '+req.params.id);
});

app.listen(3000);

```

## Template Engine
- we can embed data and javaScript code into our html files
- ejs view engine: allows us to embed javaScript code into html
- render a view, instead of sending files

## Partial Views
- relative to the views folder
- ejs will render the ejs file in views folder by default
```javeScript
<%- include('partials/nav.ejs'); -%>
```

```javeScript

```


## Middleware & Static Files
- Respond with both html and css
- Middleware: the code thet runs between the request and response, code in the middle
```javeScript

```

## Query Strings
- Additional data added into a HTTP request in the form of name-value pairs
- Parse the request, and pull out the data

## Post Requests
- Post is a request method
- Post requests, ask the server to accept/store data which is enclosed in the body of the request
- Often used when submitting forms
- POST request to the server
