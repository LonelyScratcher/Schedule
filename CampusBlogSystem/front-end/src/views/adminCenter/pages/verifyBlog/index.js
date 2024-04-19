import './index.less'
import {useEffect, useState} from "react";
import {verifyList} from "@/api/adminBlog";
import CONSTANT from "@/util/constant";
import {dateStr} from "@/util";
import {Tag} from "antd";
import {useHistory} from "react-router-dom";
export default function VerifyBlog(){
    const [blogList,setBlogList] = useState([])
    const history = useHistory()
    useEffect(()=>{
        verifyList().then(data=>{
            setBlogList(data)
        })
    },[])
    const partContent = (content) =>{
        const max = 110
        if (content.length>max) return content.slice(0,max)+'......'
        return content
    }
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
    const handleVerify = (data) => {
        history.push("/admin-center/verify-detail",data)
    }
    const handleCheck = (data) => {
        history.push("/admin-center/verify-check",data)
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
                                    <span>用户 {item.username}</span>
                                    <span>作者 {item.author}</span>
                                    <span>{stateTag(item.state)}</span>
                                </div>
                                {
                                    item.state === VERIFY.PEND_REVIEW ?
                                        (
                                            <div className="right">
                                                <a onClick={(e)=>{
                                                    e.preventDefault()
                                                    handleVerify(item)
                                                }}>
                                                    审核
                                                </a>
                                            </div>
                                        ):
                                        (
                                            <div className="right">
                                                <a onClick={(e)=>{
                                                    e.preventDefault()
                                                    handleCheck(item)
                                                }}>
                                                    查看
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
