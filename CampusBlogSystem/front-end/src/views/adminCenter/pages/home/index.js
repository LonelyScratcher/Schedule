import {useEffect, useState} from "react";
import AvatarUpload from "@/views/userCenter/pages/home/components/AvatarUpload";
import {Button, Input, message} from "antd";
import {getAdminInfo, getUserInfo, updateAdminInfo, updateUserInfo} from "@/api/user";
import {getUser, saveUser} from "@/util";

export default function UserHome(props){
    const [isEdit,setIsEdit] = useState(false);
    const {updateUser} = props
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
        getAdminInfo().then(data=>{
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
        updateAdminInfo(prepareInfo).then(data=>{
            if (!data) return
            message.success('更新管理员信息成功！')
            const {username,avatarUrl} = prepareInfo
            updateUser('username',username)
            updateUser('avatarUrl',avatarUrl)

            let newUser = getUser()
            newUser.username = username
            newUser.avatarUrl = avatarUrl
            saveUser(newUser)

            getAdminInfo().then(data=>{
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
                <span className="prefix">姓名：</span>
                {isEdit && <Input name="name" value={prepareInfo.name} onChange={handleChange}/>}
                {!isEdit && <span>{userInfo.name}</span>}
            </div>
            <div className="row-info">
                <span className="prefix">密码：</span>
                {isEdit && <Input name="password" value={prepareInfo.password} onChange={handleChange}/>}
                {!isEdit && <span>{userInfo.password}</span>}
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
