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
    return request.get('/commentList',{
        params
    })
}
