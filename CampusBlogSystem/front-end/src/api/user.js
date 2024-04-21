import request from "@/util/request";

export const login = (params) =>{
    return request.get('/user/login',{params})
}

export const getAuthorInfo = (params) => {
    return request.get('/user/authorInfo',{
        params
    })
}

export const getUserInfo = () => {
    return request.get('/user/userInfo')
}

export const getAdminInfo = () => {
    return request.get('/user/adminInfo')
}


export const updateUserInfo = (data) =>{
    return request.put('/user/userInfo',data)
}


export const updateAdminInfo = (data) =>{
    return request.put('/user/adminInfo',data)
}
