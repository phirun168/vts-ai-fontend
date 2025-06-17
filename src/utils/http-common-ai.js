import axios from 'axios'
//
import Config from './config'

const httpCommonAI = axios.create({
    baseURLAI: Config.baseURLAI,
    // baseURL: 'http://localhost:8800/',
    // withCredentials: true, // req with cookies
    headers: {
        'Content-type': 'application/json',
    },
})
//
export default httpCommonAI
