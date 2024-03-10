var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var StudentSchema = new Schema({
  nickname: String,
  username: String, // 用户名
  password: String, // 密码
  age: Number,
  gender: Boolean,
  type: Number,
  exams: [{ // 参加的考试
    _paper: { type: Schema.Types.ObjectId, ref: 'Paper' },
    date: Date,
    examName: String,
    isSure: Boolean,
    score: Number,
    startTime: Date,
    answers: [{
      _question: { type: Schema.Types.ObjectId, ref: 'Question' },
      answer: String
    }]
  }]
})
module.exports = mongoose.model('Student', StudentSchema);
