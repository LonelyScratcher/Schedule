import './index.less'
import HomeLayout from "@/components/homeLayout";
import avatar from '@/assets/images/avatar.jpg'
import {useLocation} from "react-router-dom";
import {dateStr, getUser} from "@/util";
import {useEffect, useState} from "react";
import {marked} from "marked";
import Good from "@/components/icons/good";
import Collection from "@/components/icons/collection";
import Comment from "@/components/icons/comment";
import {RightOutlined} from "@ant-design/icons";
import {Button, Drawer, message} from "antd";
import {getAuthorInfo} from "@/api/user";
import {access, summaryContent} from "@/api/blog";
import {blogOwn, insert} from "@/api/comment";

const generalAttr = [
    {name:'博客数', value:0},
    {name:'总访问', value:0}
]
const detailAttr = [
    {name:'获赞', value:0},
    {name:'评论', value:0},
]
const initAuthorInfo = {generalAttr,detailAttr}
export default function Access(){
    const {state} = useLocation()
    const [open, setOpen] = useState(false);
    const blog = state?.blog || {title:'',content:'',tagName:'',
        date:'',author:'',goodNum:0,commentNum:0,good:false}
    const [authorInfo,setAuthorInfo] = useState(initAuthorInfo)
    const {generalAttr,detailAttr} = authorInfo;
    const [commentInput,setCommentInput] = useState("");
    const [commentList,setCommentList] = useState([])
    const [summary,setSummary] = useState("")
    const isSummary = false;
    useEffect(()=>{
        document.getElementById('md-body').innerHTML = marked.parse(blog.content);
    },[])

    useEffect(()=>{
        getAuthorInfo({userId:blog.userId}).then(data=>{
            if (!data) return
            setAuthorInfo(data)
        })
    },[])

    useEffect(()=>{
        blogOwn({blogId:blog.id}).then(data=>{
            if (!data) return
            setCommentList(data)
        })
    },[])

    useEffect(()=>{
        access({blogId: blog.id}).then(()=>{})
    },[])

    useEffect(()=>{
        if (!isSummary) return
        const content = blog.content.replace(/\s|#/g, '');
        console.log(content)
        summaryContent({content}).then(data=>{
            setSummary(data.content)
        })
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

    const handleInput = (e) =>{
        setCommentInput(e.target.value)
    }

    const submitComment = () =>{
        const user = getUser()
        if (commentInput==='') {
            message.error('评论内容不能为空！')
            return
        }
        const comment = {
            userId:user.id,
            blogId:blog.id,
            content:commentInput,
            date:new Date()
        }
        insert(comment).then(data=>{
            if (!data) return
            if (data) message.success('提交评论成功，请等待审核！')
        })
    }

    return (
        <>
            <HomeLayout>
                <div className="access-whole-container">
                    <div className="access-container">
                        <div className="access-left-container">
                            <div className="author-container">
                                <div className="avatar-container">
                                    <img src={avatar} alt="头像"/>
                                    <span>{blog.author}</span>
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
                                <span className="content">{summary}</span>
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
                                    <Good goodNum={blog.goodNum} isGood={blog.good} blogId={blog.id}/>
                                    <Collection/>
                                    <Comment commentNum={blog.commentNum}/>
                                </div>
                            </div>
                            <div className="comment-container">
                                <span className="comment-num">{commentList.length} 条评论</span>
                                <RightOutlined style={{fontSize:'14px'}}/>
                                {
                                    commentList.length>0&&
                                    <>
                                        <img src={avatar}/>
                                        <span className="username">{commentList[0].author}</span>
                                        <span className="content">{commentList[0].content}</span>
                                    </>
                                }
                                <Button onClick={handleClickComment} className="btn">写评论</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </HomeLayout>
            <Drawer width={450} title={`评论 ${commentList.length}`} placement="right" onClose={onClose} open={open}>
                <div className="right-comment-container">
                    <div className="comment-input-area">
                        <img src={avatar}/>
                        <div className="input-area">
                            <textarea value={commentInput} onChange={handleInput}/>
                            <div className="footer">
                                <span onClick={submitComment}>评论</span>
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
