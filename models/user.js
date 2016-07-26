var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: { type: String, required: true}
});


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  cb(null, this.password == candidatePassword);
}; 


module.exports = mongoose.model('User', UserSchema);
