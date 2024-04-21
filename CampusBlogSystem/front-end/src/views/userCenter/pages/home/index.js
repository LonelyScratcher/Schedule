import CoverUpload from "@/views/userCenter/pages/write/components/CoverUpload";
import {useEffect, useState} from "react";
import AvatarUpload from "@/views/userCenter/pages/home/components/AvatarUpload";
import './index.less'
import {Button, Input, message} from "antd";
import {getUserInfo, updateUserInfo} from "@/api/user";

export default function UserHome(){
    const [isEdit,setIsEdit] = useState(false);
    const templeUser = {
        username:'',
        name:'',
        password:'',
        description:'',
        avatarUrl:''
    }
    const [userInfo,setUserInfo] = useState(templeUser)
    const [prepareInfo,setPrepareInfo] = useState(templeUser)
    useEffect(()=>{
        //post get info
        getUserInfo().then(data=>{
            if (!data) return
            setUserInfo(data)
        })
    },[])
    const handleChange = (e) =>{
        const eleName = e.target.name
        const value = e.target.value
        setPrepareInfo(preInfo=>(
            {
                ...preInfo,
                [eleName]:value
            }
        ))
    }
    const submit = () =>{
        updateUserInfo(prepareInfo).then(data=>{
            if (!data) return
            message.success('更新用户信息成功！')
            getUserInfo().then(data=>{
                if (!data) return
                setUserInfo(data)
                setIsEdit(false)
            })
        })
    }
    const setPreAvatarUrl = (value) =>{
        setPrepareInfo(preUserInfo=>(
            {
                ...preUserInfo,
                avatarUrl:value
            }
        ))
    }
    const handleEdit = () =>{
        //set prepareInfo
        setPrepareInfo(userInfo)
        setIsEdit(true)
    }
    const cancelEdit = () =>{
        setIsEdit(false)
    }
    return (
        <div className="user-home-container">
            <div className="row-info">
                <span className="prefix">用户名：</span>
                {isEdit && <Input name="username" value={prepareInfo.username} onChange={handleChange}/>}
                {!isEdit && <span>{userInfo.username}</span>}
            </div>
            <div className="row-info">
                <span className="prefix">作者名：</span>
                {isEdit && <Input name="name" value={prepareInfo.name} onChange={handleChange}/>}
                {!isEdit && <span>{userInfo.name}</span>}
            </div>
            <div className="row-info">
                <span className="prefix">密码：</span>
                {isEdit && <Input name="password" value={prepareInfo.password} onChange={handleChange}/>}
                {!isEdit && <span>{userInfo.password}</span>}
            </div>
            <div className="row-info">
                <span className="prefix">描述：</span>
                {isEdit && <Input name="description" value={prepareInfo.description} onChange={handleChange}/>}
                {!isEdit && <span>{userInfo.description}</span>}
            </div>
            <div className="row-info">
                <p>头像选择：</p>
                <AvatarUpload isEdit={isEdit} avatarUrl={userInfo.avatarUrl} preAvatarUrl={prepareInfo.avatarUrl} setPreAvatarUrl={setPreAvatarUrl}/>
            </div>
            {!isEdit &&  <Button onClick={handleEdit}>编辑</Button>}
            {isEdit &&
                <>
                    <Button onClick={submit}>提交</Button>
                    <Button className="cancel" onClick={cancelEdit}>取消编辑</Button>
                </>
            }
        </div>
    )
}
