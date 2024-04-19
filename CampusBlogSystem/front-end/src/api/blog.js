import request from "@/util/request";

export const uploadCover = (formData) =>{
    return request.post('/blog/uploadCover',formData)
}

export const publish = (blog) => {
    return request.post('/blog',blog)
}

export const userSelf = () => {
    return request.get('/blog')
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
