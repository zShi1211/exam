const Teacher = require('./model/teacher');
const Student = require('./model/student');
const Question = require('./model/question');


// (async () => {

//     try {
//         const r = await Teacher.create({
//             username: 'admin', // 用户名
//             password: '123456', // 密码
//             nickname: '管理员',
//             age: 19,
//             gender: 0,
//             type: 1
//         })
//         console.log(r)
//     } catch (error) {
//         console.log(error)
//     }
// })()


// const arr = []
// for (let i = 1; i <= 10; i++) {
//     arr.push({
//         nickname: "学生" + i,
//         username: "student" + i, // 用户名
//         password: '123456', // 密码
//         age: 18,
//         gender: i % 2,
//         type: 0,
//     })
// }
// Student.insertMany(arr)


// const qarr = [{
//     content: "HTML 指的是（ ）",
//     type: "single",
//     score: 10,
//     answer: 'B',
//     selection: [
//         "A、超链接的文本标记语言", "B、超文本标识语言",
//         "C、家庭工具标记语言", " D、以上都不是"
//     ]
// }, {
//     content: "下列能够实现美化页面的语言是（ ）",
//     type: "single",
//     score: 10,
//     answer: 'B',
//     selection: [
//         "A、HTML", "B、CSS",
//         "C、VFP", " D、JavaScript"
//     ]
// }, {
//     content: "以下标记中用于设置内部样式表的标记的是（ ）",
//     type: "single",
//     score: 10,
//     answer: 'A',
//     selection: [
//         "A、<style> ", "B、<title>",
//         "C、<script> ", "D、<head>"
//     ]
// }, {
//     content: "要在段落的首行空两个汉字，要插入（ ）个空格&nbsp;",
//     type: "single",
//     score: 10,
//     answer: 'D',
//     selection: [
//         "A、1 ", "B、3",
//         "C、2", " D、4"
//     ]
// }, {
//     content: "定义列表的 HTML 代码是（ ）。",
//     type: "single",
//     score: 10,
//     answer: 'B',
//     selection: [
//         "A、<dt><dl>...<dd>...</dl>", "B、<dd><dt>...<dl>...</dd>",
//         "C、<dt><dd>...<dl>...<t> ", " D、<dl><dt>...<dd>...</dl>"
//     ]
// }, {
//     content: "将超链接的目标网页在上一级的窗口中打开的方式是（ ）",
//     type: "Q&A",
//     score: 10,
//     answer: '_parent',

// }, {
//     content: "设置表格边框颜色的 HTML 代码是 <table bordercolor=''>吗",
//     type: "judgement",
//     score: 10,
//     answer: 0,

// }]
// Question.insertMany(qarr)
