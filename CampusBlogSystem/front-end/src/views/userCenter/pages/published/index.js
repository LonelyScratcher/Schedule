import './index.less'
import front from '@/assets/images/front.png'
import {useEffect, useState} from "react";
import {verifyList} from "@/api/adminBlog";
import CONSTANT from "@/util/constant";
import {dateStr} from "@/util";
import {message, Tag, Modal} from "antd";
import {useHistory} from "react-router-dom";
import {item, remove, publishList, waitVerify} from "@/api/blog";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import View from "@/components/icons/view";
import FixedGood from "@/components/icons/good/fixed";
import Comment from "@/components/icons/comment";
const { confirm } = Modal;
export default function Published(){
    const [blogList,setBlogList] = useState([])
    const history = useHistory()
    useEffect(()=>{
        publishList().then(data=>{
            setBlogList(data)
        })
    },[])
    //这里的删除其实应该把相关联更多信息删除
    const handleRemove = (blog) => {
        confirm({
            title: '删除博客',
            icon: <ExclamationCircleOutlined />,
            content: '是否确认删除博客?',
            okText:"确认",
            cancelText:"取消",
            onOk() {
                remove({blogId:blog.id}).then(data=>{
                    if(!data) return
                    message.success('删除博客成功！')
                    publishList().then(data=>{
                        setBlogList(data)
                    })
                })
            },
            onCancel() {},
        });
    }
    const handleCheck = (blog) => {
        item({blogId:blog.id}).then((data)=>{
            if (!data) return
            const obj = {blog:data}
            history.push("/access",obj)
        })
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
                                    <span className="text">发布博客 {dateStr(item.date)}</span>
                                    <span><View size={15} viewNum={item.access}/></span>
                                    <span><FixedGood size={15} goodNum={item.goodNum}/></span>
                                    <span><Comment size={15} commentNum={item.commentNum}/></span>
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
                                        handleEdit(item)
                                    }}>
                                        编辑
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
