import request from "@/util/request";

export const verifyList = () => {
    return request.get('/adminBlog/verifyList')
}

export const verify = (data) => {
    return request.post('/adminBlog/verify',data)
}

export const verifyCheck = (params) => {
    return request.get('/adminBlog/verifyCheck',{params})
}
