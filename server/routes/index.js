var express = require('express');
const routeFn = require('./routes')
var bodyParser = require('body-parser');
// var router = express.Router();
var app = express()
app.use(bodyParser.json()); // 加载解析json的中间件

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

// module.exports = function(app) {
// 	app.get('/api', (req, res) => {
// 		res.render('index', {title: 'Express'});
// 	})
// }
routeFn(app)
app.listen('1234', () => { console.log('success') })