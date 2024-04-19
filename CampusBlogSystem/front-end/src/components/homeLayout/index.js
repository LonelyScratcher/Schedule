import {Button, Dropdown, Input, Menu, Space, message} from "antd";
import './index.less'
import {Redirect, useHistory, useLocation} from "react-router-dom";
import avatar from '@/assets/images/avatar.jpg'
import {DownOutlined} from "@ant-design/icons";
import {getUser, removeUser} from "@/util";
import {useState} from "react";

export default function HomeLayout(props){
    const {state} = useLocation()
    const [searchText,setSearchText] = useState(state?.searchText||"")

    const history = useHistory();
    const user = getUser()
    const isLogin = user !== null

    const handleClickLogin = () =>{
        history.push('/login')
    }


    const handleClickSearch = (value) =>{
        const data = {searchText}
        history.push('/search',data)
    }

    const goUserCenter = (e) =>{
        e.preventDefault()
        if (user.identity === 0) history.push('/user-center')
        else history.push('/admin-center')
    }

    const loginOut = (e) =>{
        e.preventDefault()
        removeUser()
        const res = message.success('退出登录成功！')
        return history.push("/home")
    }

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a onClick={goUserCenter}>
                            用户中心
                        </a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <a onClick={loginOut}>
                            退出登录
                        </a>
                    )
                },
            ]}
        />
    );

    const handleInput = (e) =>{
        setSearchText(e.target.value)
    }

    return (
        <div className="app-container">
            <div className="app-header">
                <h2 className="title">校园博客系统</h2>
                <Input
                    onChange={handleInput}
                    value={searchText}
                    className="input"/>
                <Button
                    onClick={handleClickSearch}
                    className="search"
                    type="primary">
                    搜索
                </Button>
                {
                    isLogin&&(
                        <div className="avatar-space">
                            <img src={avatar} className="avatar"/>
                            <Dropdown overlay={menu}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <span>{user.username}</span>
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    )
                }
                {
                    !isLogin&&(
                        <div onClick={handleClickLogin} className="login right-item">
                            登录
                        </div>
                    )
                }
                <Button className="publish" type="primary">发布</Button>
            </div>
            {
                props.children
            }
        </div>
    )
}
