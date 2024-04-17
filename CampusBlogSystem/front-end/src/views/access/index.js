import './index.less'
import HomeLayout from "@/components/homeLayout";
import avatar from '@/assets/images/avatar.jpg'
import {useLocation} from "react-router-dom";
import {dateStr} from "@/util";
import {useEffect, useState} from "react";
import {marked} from "marked";
import Good from "@/components/icons/good";
import Collection from "@/components/icons/collection";
import Comment from "@/components/icons/comment";
import {RightOutlined} from "@ant-design/icons";
import {Button, Drawer} from "antd";
import TextArea from "antd/es/input/TextArea";
export default function Access(){
    const {state} = useLocation()
    const [open, setOpen] = useState(false);
    const blog = state?.blog || {title:'',content:'',tagName:'',date:''}
    const generalAttr = [
        {name:'博客数', value:0},
        {name:'总访问', value:0}
    ]
    const detailAttr = [
        {name:'获赞', value:0},
        {name:'评论', value:0},
        {name:'收藏', value:0},
    ]
    useEffect(()=>{
        document.getElementById('md-body').innerHTML = marked.parse(blog.content);
    },[])
    const handleClickComment = () =>{
        showDrawer()
    }
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const commentList = [
        {author:'小明',content:'评论内容'},
        {author:'小明',content:'评论内容'},
        {author:'小明',content:'评论内容'},
        {author:'小明',content:'评论内容'},
        {author:'小明',content:'评论内容'},
    ]
    return (
        <>
            <HomeLayout>
                <div className="access-whole-container">
                    <div className="access-container">
                        <div className="access-left-container">
                            <div className="author-container">
                                <div className="avatar-container">
                                    <img src={avatar} alt="头像"/>
                                    <span>username</span>
                                </div>
                                <div className="general-attr">
                                    {
                                        generalAttr.map((item,index)=>
                                            <div className={`attr ${index===0&&"first"}`}>
                                                <span>{item.value}</span>
                                                <span>{item.name}</span>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="detail-attr">
                                    {
                                        detailAttr.map((item,index)=>
                                            <div className={`attr ${index===0&&"first"}`}>
                                                <span>{item.value}</span>
                                                <span>{item.name}</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="summary-container">
                                <span className="title">博客摘要</span>
                                <span className="content">这是博客摘要内容...</span>
                            </div>
                        </div>
                        <div className="access-right-container">
                            <div className="access-right">
                                <h2 className="title">{blog.title}</h2>
                                <div className="top-describe">
                                    <span>发布时间：{dateStr(blog.date)}</span>
                                    <span className="row-mt">
                                    博客标签：
                                    <span className="tag">{blog.tagName}</span>
                                </span>
                                </div>
                                <div id="md-body" className="blog-content"/>
                                <div className="bottom-describe">
                                    <Good/>
                                    <Collection/>
                                    <Comment/>
                                </div>
                            </div>
                            <div className="comment-container">
                                <span className="comment-num">8 条评论</span>
                                <RightOutlined style={{fontSize:'14px'}}/>
                                <img src={avatar}/>
                                <span className="username">username</span>
                                <span className="content">评论内容</span>
                                <Button onClick={handleClickComment} className="btn">写评论</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </HomeLayout>
            <Drawer width={450} title="评论 8" placement="right" onClose={onClose} open={open}>
                <div className="right-comment-container">
                    <div className="comment-input-area">
                        <img src={avatar}/>
                        <div className="input-area">
                            <textarea/>
                            <div className="footer">
                                <span>评论</span>
                            </div>
                        </div>
                    </div>
                    {
                        commentList.map(item=>(
                            <div className="comment-item">
                                <img src={avatar}/>
                                <div className="comment-detail">
                                    <span className="username">{item.author}</span>
                                    <span className="content">{item.content}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Drawer>
        </>
    )
}
