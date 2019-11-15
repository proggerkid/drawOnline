module.exports = function(app, User, transporter){
  app.post('/registration', (req, res)=>{
    let regData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      };
      makeRegistration(regData, res, User, transporter);
  });
}


function makeRegistration(regData, res, User, transporter){
  User.find({email: regData.email}, (err, data)=>{
    if(err){}
    if(data[0] != undefined){
      console.log("user allready exists");
      res.render('registration', {status: "Email allready in use"});
    }
    else{
      //make random reqID for confirm-email
      let randomID = Math.floor(Math.random() * 10000);
      console.log(randomID);
      let newUser = new User({
        username: regData.username,
        email: regData.email,
        password: regData.password,
        reqID: randomID,
        registrated: false
      });

      //set mail options
      let mailOptions = {
        from: "Drawing Online", // sender address
        to: 'proggerkid@yahoo.com', // list of receivers
        subject: 'confirm: Draw Online', // Subject line
        html: "<b><a href='http://www.localhost:8000/registration'>Confirm</a></b>"
      };
      //send mail
      transporter.sendMail(mailOptions, (err, data)=>{
        if(err){
          console.log(err);
        }
        else{
          console.log(data);
        }
      });

      newUser.save();
      res.render('index');
    }
  });
}
