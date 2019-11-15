module.exports = {
  connect: function(mongoose){
    mongoose.connect('mongodb://localhost/drawing');
    mongoose.connection.on('error', ()=>{
      console.log("fail to connect to db");
    });
    mongoose.connection.once('open', ()=>{
      console.log("connected to db");
    });
  },
  makeUserModel: function(mongoose){
    let userSchema = new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      reqID: Number,
      registrated: false
    });
    return mongoose.model('user', userSchema);
  }
}
