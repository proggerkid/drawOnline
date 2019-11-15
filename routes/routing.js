module.exports = function(app){
  app.get('/', (req, res)=>{
    res.render('index');
  });


  app.get('/registration', (req, res)=>{
    res.render('registration', {status: ""});
  });


}
