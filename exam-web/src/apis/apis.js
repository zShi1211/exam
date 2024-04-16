import axios from './index'
export const fetchRegister = (data) => {

    return axios.post('/api/studentregister', data)
}

export const stuLogin = (data) => {

    return axios.post('/api/studentlogin', data)
}

export const teaLogin = (data) => {

    return axios.post('/api/login', data)
}


export const addQues = data => axios.post('/api/addQues', data)
export const getQuestionAll = data => axios.post('/api/getQuestionAll', data)

export const deleteQuestion = data => axios.post('/api/deleteQues', data)
export const getQuestionOne = data => axios.post('/api/getQuestionOne', data)

export const addPaper = data => axios.post('/api/addPaper', data)
export const getPaperAll = data => axios.post('/api/getPaperAll', data)

export const deletePaper = data => axios.post('/api/deletePaper', data)
export const getOnePaper = data => axios.post('/api/getOnePaper', data)
export const submitExam = data => axios.post('/api/submitExam', data)
export const getSInfo = data => axios.post('/api/getSInfo', data)
export const getStuAll = data => axios.post('/api/getStuAll', data)
export const updateStudent = data => axios.post('/api/updateStudent', data)
export const signupExam = data => axios.post('/api/signupExam', data)
export const addComment = data => axios.post('/api/addComment', data)
export const deleteStu = data => axios.post('/api/deleteStu', data)
export const updateQuestion = data => axios.post('/api/updateQuestion', data)