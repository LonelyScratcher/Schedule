import request from "@/util/request";
import algRequest from "@/util/algRequest";

export const uploadCover = (formData) =>{
    return request.post('/blog/uploadCover',formData)
}

export const uploadAvatar = (formData) =>{
    return request.post('/blog/uploadAvatar',formData)
}


export const publish = (blog) => {
    return request.post('/blog',blog)
}

export const browseList = () => {
    return request.get('/blog/browseList')
}

export const publishList = () => {
    return request.get('/blog/publishList')
}

export const waitVerify = () => {
    return request.get('/blog/waitVerify')
}

export const remove = (params) => {
    return request.get('/blog/remove',{
        params
    })
}

export const list = () => {
    return request.get('/blog/list')
}

export const item = (params) => {
    return request.get('/blog/item',{
        params
    })
}

export const searchList = (params) => {
    return request.get('/blog/searchList',{
        params
    })
}


export const switchGood = (params) => {
    return request.post('/blog/good',null,{
        params
    })
}

export const access = (params) => {
    return request.get('/blog/access',{
        params
    })
}

export const summaryContent = (data) => {
    return algRequest.post('/blog/summary',data)
}
