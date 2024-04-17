import axios from "axios";
import {message} from "antd";
import CODE from "@/util/code";
import {getUser} from "@/util/index";

const request = axios.create({
    baseURL: 'http://localhost:8080'
});

// Add a request interceptor
request.interceptors.request.use(function (config) {

    const user = getUser()
    if(user!==null) config.headers.userId = user.id
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const res = response.data
    if (res.code !== CODE.REQUEST_OK) {
        message.error(res.message)
    }
    return Promise.resolve(res.data)
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    switch (error.code){
        case CODE.ERR_NETWORK:
            message.error('网络错误请稍后重试！');
            break;
        default:
            message.error(error.message);
    }
    return Promise.resolve(null);
});

export default request;
