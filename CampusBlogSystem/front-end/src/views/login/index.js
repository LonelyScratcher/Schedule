import './index.less'
import {EyeInvisibleOutlined, EyeTwoTone, KeyOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Input,message} from "antd";
import {useState} from "react";
import {login} from "@/api/user";
import {saveUser} from "@/util";
import {useHistory} from "react-router-dom";

export default function Login(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const history = useHistory()
    const usernameChange = (e) =>{
        setUsername(e.target.value)
    }
    const passwordChange = (e) =>{
        setPassword(e.target.value)
    }
    const cancel = () =>{
        setUsername('')
        setPassword('')
    }
    const submit = () =>{
        login({username,password}).then(data=>{
            if(!data) return
            saveUser(data)
            message.success('登录成功！')
            history.push('/')
        })
    }
    return (
        <div className="login-background">
            <div className="login-container">
                <h2 className="title">校园博客系统</h2>
                <Input
                    value={username}
                    size="large"
                    className="input-row"
                    placeholder="请输入用户名"
                    prefix={<UserOutlined />}
                    onChange={usernameChange}
                />
                <Input.Password
                    value={password}
                    className="input-row"
                    size="large"
                    placeholder="请输入密码"
                    prefix={<KeyOutlined />}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    onChange={passwordChange}
                />
                <div className="btn-row">
                    <Button onClick={submit} size="large" type="primary">登录</Button>
                    <Button size="large" className="cancel" onClick={cancel}>取消</Button>
                </div>
            </div>
        </div>

    )
}
