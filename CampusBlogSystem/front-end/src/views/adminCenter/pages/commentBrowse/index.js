import './index.less'
import {Space, Table, Tag} from "antd";
import CONSTANT from "@/util/constant";
import {useHistory} from "react-router-dom";
import {dateStr} from "@/util";
import {useEffect, useState} from "react";
import {accessList, list} from "@/api/comment";
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
        dataIndex: 'blogId',
        render: (blogId) => {
            const handleClick = (e) =>{
                e.preventDefault()
                const history = useHistory()
                const data = {blogId}
                history.push("/access",data)
            }
            return <a onClick={handleClick}>{text}</a>
        },
    },
    {
        title: '审核状态',
        dataIndex: 'state',
        render: (state) => stateTag(state),
    },
    {
        title: '操作',
        render: () => (
            <Space size="middle">
                <a>重新提交</a>
                <a>删除</a>
            </Space>
        ),
    },
];
export default function CommentBrowse(){
    const [commentList,setCommentList] = useState([])
    useEffect(()=>{
        accessList().then(data=>{
            setCommentList(data)
        })
    },[commentList])
    return (
        <div className="comment-view-container">
            <Table columns={columns} dataSource={commentList} />
        </div>
    )
}
