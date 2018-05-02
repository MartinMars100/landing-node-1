'use strict';
console.log('log app.js 2222222');
console.log('process.env.EMAIL== ' + process.env.EMAIL);
console.log('process.env.EMAIL_PASSWORD == ' + process.env.EMAIL_PASSWORD);
var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');
// var connect = require('connect');
var methodOverride = require('method-override');
var nodemailer = require('nodemailer');

var app = express();

// set our port
app.set('port', process.env.PORT || 6000);

// setup our static route to serve files from the "public" folder
app.use('/static', express.static(__dirname + '/src/public'));

// setup our dist route to serve files from the "dist" folder
app.use('/dist', express.static(__dirname + '/dist'));

// setup our views
app.set('view engine', 'pug');  
app.set('views', __dirname + '/src/public/views'); //Use __dirname since we
//sometimes run with a nodemon command with a path to the server.js file.

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(methodOverride('_method'));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/send', (req, res) => {
  console.log(req.body);
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Note: ${req.body.note}</li>
    </ul>
    {req.body,email},
    {req.body.note}
  `
  
  const mailOptions = {
    from: 'kunsmanmassage@gmail.com', // sender address
    to: 'kunsmanmassage@gmail.com', // list of receivers
    subject: 'Test Email', // Subject line
    html: output  //html body
  }
  
  // nodeMailer
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
      }
  });

   transporter.sendMail(mailOptions, function (err, info) {
    console.log('log transporter.sendMail function');
    if(err)
      console.log(err)
    else
      console.log(info);
  });
  console.log('The Note has been sent.');   
  res.render('index');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Basic Listen
var server = app.listen(app.get('port'), function() {
  console.log('THE Express server is listening on port ' + server.address().port);
});

module.exports = app;
