import request from "@/util/request";

export const insert = (data) =>{
    return request.post('/comment',data)
}


export const list = () =>{
    return request.get('/comment')
}

export const accessList = () =>{
    return request.get('/comment/accessList')
}

export const verifyList = () =>{
    return request.get('/comment/verifyList')
}

export const browseList = () =>{
    return request.get('/comment/browseList')

}

export const commentList = (params) =>{
    return request.get('/comment/commentList',{
        params
    })
}

export const rewrite = (data) =>{
    return request.post('/comment/rewrite',data)
}

export const update = (data) =>{
    return request.post('/comment/update',data)
}

export const remove = (params) =>{
    return request.delete('/comment/remove',{
        params
    })
}

export const verify = (data) =>{
    return request.post('/comment/verify',data)
}

export const check = (params) =>{
    return request.get('/comment/check', {
        params
    })
}

export const blogOwn = (params) =>{
    return request.get('/comment/blogOwn', {
        params
    })
}
export const reason = (params) =>{
    return request.get('/comment/reason', {
        params
    })
}
