var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var StudentSchema = new Schema({
  username: String, // 用户名
  password: String, // 密码
  exams: [{ // 参加的考试
    _paper: { type: Schema.Types.ObjectId, ref: 'Paper' },
    date: Date,
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
