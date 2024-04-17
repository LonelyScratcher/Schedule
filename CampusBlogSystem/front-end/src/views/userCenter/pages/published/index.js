import './index.less'
import front from '@/assets/images/front.png'
import {useEffect, useState} from "react";
import {verifyList} from "@/api/adminBlog";
import CONSTANT from "@/util/constant";
import {dateStr} from "@/util";
import {Tag} from "antd";
import {useHistory} from "react-router-dom";
import {userSelf} from "@/api/blog";
export default function WaitVerifyBlog(){
    const [blogList,setBlogList] = useState([])
    const history = useHistory()
    useEffect(()=>{
        userSelf().then(data=>{
            setBlogList(data)
        })
    },[])
    const partContent = (content) =>{
        const max = 110
        if (content.length>max) return content.slice(0,max)+'......'
        return content
    }
    const handleRemove = (data) => {

    }
    const handleCheck = (data) => {
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
                            <p className="body">{partContent(item.content)}</p>
                            <div className="footer">
                                <div className="left">
                                    <span>发布博客 {dateStr(item.date)}</span>
                                </div>
                                <div className="right">
                                    <a onClick={(e)=>{
                                        e.preventDefault()
                                        handleCheck(item)
                                    }}>
                                        查看
                                    </a>
                                    <a onClick={(e)=>{
                                        e.preventDefault()
                                        handleRemove(item)
                                    }}>
                                        删除
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
