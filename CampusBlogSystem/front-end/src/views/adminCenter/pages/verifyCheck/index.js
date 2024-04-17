import './index.less'
import {Button, Input, Select, Upload, message, Switch} from "antd";
import {useEffect, useState} from "react";
import {marked} from 'marked';
import CONSTANT from "@/util/constant";
import {useHistory, useLocation} from "react-router-dom";
import {verifyCheck} from "@/api/adminBlog";

const { TextArea } = Input;

export default function VerifyCheck(){
    const [already,setAlready] = useState(false)
    const [audit,setAudit] = useState({result:true,reason:""})
    const { state } = useLocation();
    const blogObj = state
    useEffect(()=>{
        document.getElementById('md-body').innerHTML = marked.parse(blogObj.content);
    },[])

    useEffect(()=>{
        verifyCheck({blogId:state.id}).then(data=>{
            if(!data) return
            setAudit(data)
            setAlready(true)
        })
    },[])


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
                <img src={CONSTANT.COVER_PREFIX+state.coverUrl}/>
            </div>
            <p className="row-text">
                <span>正文内容：</span>
            </p>
            <div className="md-textarea" id="md-body">
            </div>
            {
                already && (
                    <div className="row-switch">
                        <span className="prefix">审核结果：</span>
                        <Switch disabled className="switch" checkedChildren="同意" unCheckedChildren="拒绝"
                                defaultChecked={false}/>
                    </div>
                )
            }
            {
                already&&!audit.result&&(
                    <p className="row-text mt-15">
                        <span>拒绝理由：</span>
                        <TextArea disabled value={audit.reason}/>
                    </p>
                )
            }
        </div>
    )
}
