const Home = () => import("../views/home/Index.vue")
const question = () => import("../views/question/List.vue")
const questionAdd = () => import("../views/question/Add.vue")
const competition = () => import("../views/competition/List.vue")
const competitionAdd = () => import("../views/competition/Add.vue")
const competitionStuList = () => import("../views/competition/StuList.vue")
const Exam = () => import("../views/competition/Exam.vue")
const EndExam = () => import("../views/competition/EndList.vue")
const TEndExam = () => import("../views/competition/TEndList.vue")
const Sort = () => import("../views/competition/Sort.vue")
const SignUp = () => import("../views/competition/SignUp.vue")
const Wrong = () => import("../views/competition/Wrong.vue")
const UserOperate = () => import("../views/admin/userAdmin.vue")
const homes = [
    {
        path: '/home',
        component: Home,
        name: 'Home',
        children: [
            {
                path: "UserOperate",
                component: UserOperate,
                name: 'UserOperate',
                meta: {
                    title: '我的课程'
                }
            },
            {
                path: "question-list",
                component: question,
                name: 'question-list',
                meta: {
                    title: '我的课程'
                }
            },
            {
                path: "question-add",
                component: questionAdd,
                name: 'question-add',
                meta: {
                    title: '我的课程'
                }
            },
            {
                path: "competition-list",
                component: competition,
                name: 'competition-list',
                meta: {
                    title: '我的课程'
                }
            },
            {
                path: "competition-add",
                component: competitionAdd,
                name: 'competition-add',
                meta: {
                    title: '我的课程'
                }
            },
            {
                path: "stu-competition-list",
                component: competitionStuList,
                name: 'stu-competition-list',
                meta: {
                    title: '我的课程'
                }
            },
            {
                path: "end-competition-list",
                component: EndExam,
                name: 'end-competition-list',
                meta: {
                    title: '我的课程'
                }
            },
            {
                path: "tend-competition-list",
                component: TEndExam,
                name: 'tend-competition-list',
                meta: {
                    title: '我的课程'
                }
            },
            {
                path: "sort-list",
                component: Sort,
                name: 'sort-list',
                meta: {
                    title: '我的课程'
                }
            },
            {
                path: "attend-competition-list",
                component: SignUp,
                name: 'attend-competition-list',
                meta: {
                    title: '我的课程'
                }
            },
            {
                path: "Wrong",
                component: Wrong,
                name: 'Wrong',
                meta: {
                    title: '我的课程'
                }
            },
        ]
    }, {
        path: '/exam/:id',
        component: Exam,
        name: 'exam'
    }
]
export default homes;