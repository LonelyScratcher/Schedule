import {Button, Dropdown, Input, Menu, message, Space} from "antd";
import {AppstoreOutlined, DownOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";
import './index.less'
import {getUser, removeUser} from "@/util";
import {Redirect, Route, useHistory} from "react-router-dom";
import UserHome from "@/views/userCenter/pages/home";
import Published from "@/views/userCenter/pages/published";
import WaitVerify from "@/views/userCenter/pages/waitVerify";
import Write from "@/views/userCenter/pages/write";
import CommentView from "@/views/userCenter/pages/commentView";
import CommentWait from "@/views/userCenter/pages/commentWait";
import CONSTANT from "@/util/constant";


export default function UserCenter(){
    const history = useHistory()
    const user = getUser()
    const homePath = "/user-center/published"

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
        {
            label: '评论管理',
            key: '/user-center/self',
            children: [
                { label: '我的评论', key: '/user-center/comment-view' },
                { label: '我的提交', key: '/user-center/comment-wait' },
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
                    <img src={CONSTANT.AVATAR_PREFIX+user.avatar} className="avatar"/>
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
                        <Redirect to={homePath}/>
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
                    <Route path="/user-center/comment-view">
                        <CommentView/>
                    </Route>
                    <Route path="/user-center/comment-wait">
                        <CommentWait/>
                    </Route>
                </div>
            </div>
        </div>
    )
}
