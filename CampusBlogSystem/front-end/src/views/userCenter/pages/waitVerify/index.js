import './index.less'
import {useEffect, useState} from "react";
import CONSTANT from "@/util/constant";
import {dateStr} from "@/util";
import {Tag} from "antd";
import {useHistory} from "react-router-dom";
import {remove, waitVerify} from "@/api/blog";
import {message} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";

export default function WaitVerifyBlog(){
    const [blogList,setBlogList] = useState([])
    const history = useHistory()
    useEffect(()=>{
        waitVerify().then(data=>{
            setBlogList(data)
        })
    },[])
    const VERIFY = CONSTANT.VERIFY
    const stateTag = (state) =>{
        switch (state){
            case VERIFY.PEND_REVIEW:
                return <Tag className="tag" color="gold">待审核</Tag>
            case VERIFY.APPROVED_ADOPT:
                return <Tag className="tag" color="green">已通过</Tag>
            case VERIFY.APPROVED_REFUSE:
                return <Tag className="tag" color="red">已拒绝</Tag>
        }
        return null
    }

    const handleRemove = (blog) => {
        confirm({
            title: '删除博客提交',
            icon: <ExclamationCircleOutlined />,
            content: '是否确认删除博客提交?',
            okText:"确认",
            cancelText:"取消",
            onOk() {
                remove({blogId:blog.id}).then(data=>{
                    if(!data) return
                    message.success('删除博客提交成功！')
                    waitVerify().then(data=>{
                        setBlogList(data)
                    })
                })
            },
            onCancel() {},
        });
    }
    const handleEdit = (data) => {
        history.push("/user-center/rewrite",data)
    }
    return (
        <div className="blog-list-container">
            {
                blogList.map((item,index)=>(
                    <div className={`blog-item ${index===0 && 'first'}`}>
                        <img src={CONSTANT.COVER_PREFIX+item.coverUrl}/>
                        <div className="detail">
                            <p className="title">{item.title}</p>
                            <p className="body">{item.content}</p>
                            <div className="footer">
                                <div className="left">
                                    <span>发布博客 {dateStr(item.date)}</span>
                                    <span>{stateTag(item.state)}</span>
                                </div>
                                {
                                    item.state === VERIFY.APPROVED_ADOPT ?
                                        (
                                            <div className="right">
                                                <a onClick={(e)=>{
                                                    e.preventDefault()
                                                    handleRemove(item)
                                                }}>
                                                    删除
                                                </a>
                                            </div>
                                        ):
                                        (
                                            <div className="right">
                                                <a onClick={(e)=>{
                                                    e.preventDefault()
                                                    handleEdit(item)
                                                }}>
                                                    重新提交
                                                </a>
                                                <a onClick={(e)=>{
                                                    e.preventDefault()
                                                    handleRemove(item)
                                                }}>
                                                    删除
                                                </a>
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
