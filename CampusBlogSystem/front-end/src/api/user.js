import request from "@/util/request";

export const login = (params) =>{
    return request.get('/user/login',{params})
}
