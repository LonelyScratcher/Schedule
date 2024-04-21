import './index.less'
import {Button, Input, Select, Upload, message, Switch} from "antd";
import {useEffect, useState} from "react";
import CoverUpload from "@/views/userCenter/pages/write/components/CoverUpload";
import {publish, uploadCover} from "@/api/blog";
import {marked} from 'marked';
import CONSTANT from "@/util/constant";
import {useHistory, useLocation} from "react-router-dom";
import {verify} from "@/api/adminBlog";

const { TextArea } = Input;

export default function VerifyDetail(){
    const [result,setResult] = useState(true)
    const [reason,setReason] = useState("")

    const history = useHistory();

    const { state } = useLocation();
    const blogObj = state

    useEffect(()=>{
        document.getElementById('md-body').innerHTML = marked.parse(blogObj.content);
    },[])

    const changeReason = (e) =>{
        setReason(e.target.value)
    }

    const submit = () =>{
        const form = {
            blogId:state.id,
            result,
            reason
        }
        verify(form).then(data=>{
            if (!data) return
            message.success('审核博客成功！')
            history.push('/admin-center/verify-blog')
        })
    }

    return (
        <div className="verify-detail-container">
            <p className="row-text">
                <span>标题：</span>
                {state.title}
            </p>
            <p className="row-text">
                <span>用户：</span>
                {state.username}
            </p>
            <p className="row-text">
                <span>作者：</span>
                {state.author}
            </p>
            <p className="row-text">
                <span>博客标签：</span>
                {state.tagName}
            </p>
            <div className="row-item">
                <span>博客封面：</span>
                <img className="cover" src={CONSTANT.COVER_PREFIX+state.coverUrl}/>
            </div>
            <p className="row-text">
                <span>正文内容：</span>
            </p>
            <div className="md-textarea" id="md-body">
            </div>
            <div className="row-switch">
                <span className="prefix">审核结果：</span>
                <Switch onClick={setResult} className="switch" checkedChildren="同意" unCheckedChildren="拒绝" defaultChecked />
            </div>
            {
                !result&&(
                    <p className="row-text mt-15">
                        <span>拒绝理由：</span>
                        <TextArea onChange={changeReason}/>
                    </p>
                )
            }
            <Button onClick={submit} className="mt-5" type="primary">确定</Button>
        </div>
    )
}
