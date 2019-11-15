let express = require('express');
let app = express();
let http = require('http');
let httpServer = http.createServer(app);
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let nodemailer = require('nodemailer');
let handleMongodb = require('./handler/handleMongodb');
let routing = require('./routes/routing');
let handleRegistration = require('./handler/handleRegistration');




//config
app.set('view engine', 'ejs');
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 't.sieber66@gmail.com',
    pass: '1Meta-Mesa1'
  }
});

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//handel db
handleMongodb.connect(mongoose);
let User = handleMongodb.makeUserModel(mongoose);

//logic
routing(app);
handleRegistration(app, User, transporter);


httpServer.listen(8000);
