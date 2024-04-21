import './index.less'
import {Modal, Space, Table, Tag, message, Switch} from "antd";
import CONSTANT from "@/util/constant";
import {useHistory} from "react-router-dom";
import {dateStr} from "@/util";
import {useEffect, useState} from "react";
import {browseList, check, list, remove, rewrite, update, verify, verifyList} from "@/api/comment";
import TextArea from "antd/es/input/TextArea";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {item} from "@/api/blog";
const VERIFY = CONSTANT.VERIFY
const { confirm } = Modal;
export default function CommentBrowse(){
    const [commentList,setCommentList] = useState([])
    const history = useHistory()
    useEffect(()=>{
        browseList().then(data=>{
            setCommentList(data)
        })
    },[])


    //for update
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [curComment, setCurComment] = useState(null);


    const handleRemove = (comment) =>{
        confirm({
            title: '删除评论',
            icon: <ExclamationCircleOutlined />,
            content: '是否确认删除评论?',
            okText:"确认",
            cancelText:"取消",
            onOk() {
                remove({commentId:comment.id}).then(data=>{
                    if (!data) return
                    message.success('删除评论成功！')
                    browseList().then(data=>{
                        setCommentList(data)
                    })
                })
            },
            onCancel() {},
        });
    }

    const showUpdate = (comment) => {
        setCurComment(comment)
        setCommentInput(comment.content)
        setIsUpdateOpen(true);
    };

    const handleUpdate = () =>{
        const comment = {
            id:curComment.id,
            content:commentInput
        }
        update(comment).then(data=>{
            if (!data) return
            message.success('更新评论成功！')
            browseList().then(data=>{
                setCommentList(data)
            })
            setIsUpdateOpen(false);
        })
    }

    const updateCancel = () => {
        setCurComment(null)
        setCommentInput("")
        setIsUpdateOpen(false);
    };

    const handleInput = (e) =>{
        setCommentInput(e.target.value)
    }
    const columns = [
        {
            title: '评论作者',
            dataIndex: 'author'
        },
        {
            title: '评论用户',
            dataIndex: 'username'
        },
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
                            showUpdate(comment)
                        }}>修改</a>
                        <a onClick={(e)=>{
                            e.preventDefault()
                            handleRemove(comment)
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
                title="修改评论"
                open={isUpdateOpen}
                onOk={handleUpdate}
                onCancel={updateCancel}
                okText="确认"
                cancelText="取消">
                <div>
                    <span>修改内容：</span>
                    <TextArea onChange={handleInput} value={commentInput}/>
                </div>
            </Modal>
        </>
    )
}
