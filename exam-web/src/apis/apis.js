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
export const getQuestionAll = data => axios.get('/api/getQuestionAll', data)

export const deleteQuestion = data => axios.post('/api/deleteQues', data)
export const getQuestionOne = data => axios.post('/api/getQuestionOne', data)

export const addPaper = data => axios.post('/api/addPaper', data)
export const getPaperAll = data => axios.get('/api/getPaperAll', data)

export const deletePaper = data => axios.post('/api/deletePaper', data)
export const getOnePaper = data => axios.post('/api/getOnePaper', data)
export const submitExam = data => axios.post('/api/submitExam', data)
export const getSInfo = data => axios.post('/api/getSInfo', data)
export const getStuAll = data => axios.post('/api/getStuAll', data)
export const updateStudent = data => axios.post('/api/updateStudent', data)