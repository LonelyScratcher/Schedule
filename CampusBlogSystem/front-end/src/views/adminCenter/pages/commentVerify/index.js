import './index.less'
import {Modal, Space, Table, Tag, message, Switch} from "antd";
import CONSTANT from "@/util/constant";
import {useHistory} from "react-router-dom";
import {dateStr} from "@/util";
import {useEffect, useState} from "react";
import {check, list, remove, rewrite, verify, verifyList} from "@/api/comment";
import TextArea from "antd/es/input/TextArea";
import {ExclamationCircleOutlined} from "@ant-design/icons";
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
export default function CommentVerify(){
    const [commentList,setCommentList] = useState([])

    useEffect(()=>{
        verifyList().then(data=>{
            setCommentList(data)
        })
    },[commentList])

    //for Verify
    const [isVerifyOpen, setIsVerifyOpen] = useState(false);
    const showVerify = (comment) => {
        setCurComment(comment)
        setReasonInput("")
        setIsVerify(true)
        setIsVerifyOpen(true);
    };

    const verifyCancel = () => {
        setCurComment(null)
        setReasonInput("")
        setIsVerifyOpen(false);
    };

    //for check
    const [isCheckOpen, setIsCheckOpen] = useState(false);
    const [checkRes, setCheckRes] = useState({result:true,reason:''});

    const checkHidde = () => {
        setIsCheckOpen(false);
    };

    const handleCheck = (comment) =>{
        if (comment.state===VERIFY.APPROVED_ADOPT){
            setCheckRes({result: true,reason: ''})
            setIsCheckOpen(true)
            return
        }
        check({commentId:comment.id}).then(data=>{
            if (!data) return
            setCheckRes(data)
            setIsCheckOpen(true)
        })
    }


    //审核模块
    const [reasonInput,setReasonInput] = useState("")

    const [curComment,setCurComment] = useState(null)
    const [isVerify,setIsVerify] = useState(true)

    const handleVerify = () =>{
        if (curComment==='') {
            message.error('未选择评论不可审核！')
            return
        }
        if (!isVerify&&reasonInput==='') {
            message.error('审核原因不可为空！')
            return
        }
        const verifyRes = {
            commentId:curComment.id,
            result:isVerify,
            reason:reasonInput
        }
        verify(verifyRes).then(data=>{
            if (!data) return;
            message.success('审核评论成功！')
            setIsVerifyOpen(false);
            verifyList().then(data=>{
                setCommentList(data)
            })
        })
    }


    const handleInput = (e) =>{
        setReasonInput(e.target.value)
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
                    const history = useHistory()
                    const data = {blogId}
                    history.push("/access",data)
                }
                return <a onClick={handleClick}>{blogTitle}</a>
            },
        },
        {
            title: '审核状态',
            dataIndex: 'state',
            render: (state) => stateTag(state),
        },
        {
            title: '操作',
            render: (_,comment) => {
                return (
                    <Space size="middle">
                        {
                            comment.state===VERIFY.PEND_REVIEW?
                                <a onClick={(e)=>{
                                    e.preventDefault()
                                    showVerify(comment)
                                }}>审核</a>
                                :
                                <a onClick={(e)=>{
                                    e.preventDefault()
                                    handleCheck(comment)
                                }}>查看</a>
                        }
                    </Space>
                )
            },
        },
    ];

     const handleChange = (value) =>{
         setIsVerify(value)
    }

    return (
        <>
            <div className="comment-wait-container">
                <Table columns={columns} dataSource={commentList} />
            </div>
            <Modal
                title="审核评论"
                open={isVerifyOpen}
                onOk={handleVerify}
                onCancel={verifyCancel}
                okText="确认"
                cancelText="取消">
                <div>
                    <span>审核结果</span>
                    <Switch onClick={handleChange} checked={isVerify} checkedChildren="同意" unCheckedChildren="拒绝"/>
                    {
                        !isVerify&&
                        <>
                            <br/>
                            <span>拒绝原因</span>
                            <TextArea value={reasonInput} onChange={handleInput}/>
                        </>
                    }
                </div>
            </Modal>
            <Modal
                title="查看审核"
                open={isCheckOpen}
                onOk={checkHidde}
                onCancel={checkHidde}
                okText="确认"
                cancelText="取消">
                <div>
                    <span>审核结果</span>
                    <Switch disabled checked={checkRes.result} checkedChildren="同意" unCheckedChildren="拒绝"/>
                    {
                        !checkRes.result&&
                        <>
                            <br/>
                            <span>拒绝原因</span>
                            <TextArea value={checkRes.reason} disabled/>
                        </>
                    }
                </div>
            </Modal>
        </>
    )
}
