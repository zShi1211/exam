var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TeacherSchema = new Schema({
  username: String, // 用户名
  password: String, // 密码
  nickname: String,
  type: Number,
  age: Number,
  gender: Boolean,
})
module.exports = mongoose.model('Teacher', TeacherSchema);
