import {Button, Dropdown, Input, Menu, message, Space} from "antd";
import avatar from "@/assets/images/avatar.jpg";
import {AppstoreOutlined, DownOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";
import './index.less'
import {getUser, removeUser} from "@/util";
import {Redirect, Route, useHistory} from "react-router-dom";
import UserHome from "@/views/userCenter/pages/home";
import Published from "@/views/userCenter/pages/published";
import WaitVerify from "@/views/userCenter/pages/waitVerify";
import Write from "@/views/userCenter/pages/write";


export default function UserCenter(){
    const history = useHistory()
    const user = getUser()
    const goHome = (e) =>{
        e.preventDefault()
        history.push('/home')
    }

    const loginOut = (e) =>{
        e.preventDefault()
        removeUser()
        const res = message.success('退出登录成功！')
        history.push('/home')
        return res
    }
    const handleClickMenu = (e) => {
        history.push(e.key)
    }
    //data
    const navMenuItems = [
        { label: '首页', key: '/user-center/home' },
        {
            label: '博客管理',
            key: '/user-center/self',
            children: [
                { label: '我的博客', key: '/user-center/published' },
                { label: '我的提交', key: '/user-center/wait-verify' },
                { label: '写博客', key: '/user-center/write' }
            ],
        },
    ];
    //components
    const avatarMenu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a onClick={goHome}>
                            首页
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
    return (
        <div className="app-container">
            <div className="app-header backstage-top">
                <h2 className="title white">校园博客系统</h2>
                <div className="avatar-space">
                    <img src={avatar} className="avatar"/>
                    <Dropdown
                        overlay={avatarMenu}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <span className="white">{user.username}</span>
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
            <div className="backstage">
                <div className="backstage-nav">
                    <Menu
                        theme='dark'
                        style={{
                            width: 256,
                            height:'100%'
                        }}
                        defaultOpenKeys={['sub1']}
                        selectedKeys={[1]}
                        mode="inline"
                        items={navMenuItems}
                        onClick={handleClickMenu}
                    />
                </div>
                <div className="backstage-content">
                    <Route path="/user-center">
                        <Redirect to="/user-center/write"/>
                    </Route>
                    <Route path="/user-center/home">
                        <UserHome/>
                    </Route>
                    <Route path="/user-center/published">
                        <Published/>
                    </Route>
                    <Route path="/user-center/wait-verify">
                        <WaitVerify/>
                    </Route>
                    <Route path="/user-center/write">
                        <Write/>
                    </Route>
                    <Route path="/user-center/rewrite">
                        <Write/>
                    </Route>
                </div>
            </div>
        </div>
    )
}
