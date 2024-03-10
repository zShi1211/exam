var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PapersSchema = new Schema({
    name: String, // 试卷名
    totalPoints: Number, // 总分
    time: Number, // 考试时间
    startTime: Date, // 开始时间
    _questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }] // 题
})
module.exports = mongoose.model('Paper', PapersSchema);

