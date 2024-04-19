import './index.less'
import {Modal, Space, Table, Tag, message} from "antd";
import CONSTANT from "@/util/constant";
import {useHistory} from "react-router-dom";
import {dateStr} from "@/util";
import {useEffect, useState} from "react";
import {accessList, list, remove, rewrite} from "@/api/comment";
import TextArea from "antd/es/input/TextArea";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {item} from "@/api/blog";
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
const { confirm } = Modal;
export default function CommentView(){
    const [commentList,setCommentList] = useState([])
    const history = useHistory()
    useEffect(()=>{
        accessList().then(data=>{
            setCommentList(data)
        })
    })

    //for rewrite
    const [isRewriteOpen, setIsRewriteOpen] = useState(false);
    const showRewrite = (comment) => {
        setCurComment(comment)
        setCommentInput("")
        setIsRewriteOpen(true);
    };


    const handleCancel = () => {
        setCurComment(null)
        setCommentInput("")
        setIsRewriteOpen(false);
    };

    const showRemove = (comment) => {
        confirm({
            title: '删除评论',
            icon: <ExclamationCircleOutlined />,
            content: '是否确认删除评论?',
            okText:"确认",
            cancelText:"取消",
            onOk() {
                remove({commentId:comment.id}).then(data=>{
                    if (!data) return
                    message.success('删除评论提交成功！')
                    accessList().then(data=>{
                        setCommentList(data)
                    })
                })
            },
            onCancel() {},
        });
    };


    //评论模块
    const [commentInput,setCommentInput] = useState("")

    const [curComment,setCurComment] = useState(null)

    const handleRewrite = () =>{
        if (curComment==='') {
            message.error('未选择评论不可提交！')
            return
        }
        if (commentInput==='') {
            message.error('评论内容不可为空！')
            return
        }
        const newComment = {
            id:curComment.id,
            date:new Date(),
            content:commentInput
        }
        rewrite(newComment).then(data=>{
            if (!data) return;
            message.success('提交评论成功！')
            setIsRewriteOpen(false);
            accessList().then(data=>{
                setCommentList(data)
            })
        })
    }


    const handleInput = (e) =>{
        setCommentInput(e.target.value)
    }
    const columns = [
        {
            title: '评论内容',
            dataIndex: 'content'
        },
        {
            title: '评论时间',
            dataIndex: 'date',
            render: (date) => <span>{dateStr(date)}</span>,
        },
        {
            title: '评论博客',
            dataIndex: 'blog',
            render: (_,comment) => {
                const {blogId,blogTitle} = comment
                const handleClick = (e) =>{
                    e.preventDefault()
                    item({blogId}).then((data)=>{
                        if (!data) return
                        const obj = {blog:data}
                        history.push("/access",obj)
                    })
                }
                return <a onClick={handleClick}>{blogTitle}</a>
            },
        },
        {
            title: '操作',
            render: (_,comment) => {
                return (
                    <Space size="middle">
                        <a onClick={(e)=>{
                            e.preventDefault()
                            showRewrite(comment)
                        }}>编辑</a>
                        <a onClick={(e)=>{
                            e.preventDefault()
                            showRemove(comment)
                        }}>删除</a>
                    </Space>
                )
            },
        },
    ];

    return (
        <>
            <div className="comment-wait-container">
                <Table columns={columns} dataSource={commentList} />
            </div>
            <Modal
                title="重新提交"
                open={isRewriteOpen}
                onOk={handleRewrite}
                onCancel={handleCancel}
                okText="确认"
                cancelText="取消">
                <div>
                    <span>评论内容</span>
                    <TextArea value={commentInput} onChange={handleInput}/>
                </div>
            </Modal>
        </>
    )
}
