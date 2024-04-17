import axios from "axios";
import {message} from "antd";

const mockRequest = axios.create({
    baseURL: 'http://localhost:9000'
});


mockRequest.interceptors.response.use(function (response) {

    const res = response.data
    return res.data

}, function (error) {

    message.error(error.message || 'Error')
    return Promise.resolve(error);

});

export default mockRequest;
