var mongoose = require('mongoose');
var dbUrl = 'mongodb://127.0.0.1:27017/examSystem';
mongoose.connect(dbUrl).then(() => {
	console.log("连接成功")
})


// module.exports = db;
