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

export const commentList = (params) =>{
    return request.get('/comment/commentList',{
        params
    })
}

export const rewrite = (data) =>{
    return request.post('/comment/rewrite',data)
}

export const remove = (params) =>{
    return request.delete('/comment/remove',{
        params
    })
}
