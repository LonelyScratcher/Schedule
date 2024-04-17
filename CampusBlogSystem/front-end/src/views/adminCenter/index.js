import {Button, Dropdown, Input, Menu, message, Space} from "antd";
import avatar from "@/assets/images/avatar.jpg";
import {AppstoreOutlined, DownOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";
import './index.less'
import {getUser, removeUser} from "@/util";
import {Redirect, Route, useHistory} from "react-router-dom";
import AdminHome from "@/views/adminCenter/pages/home";
import VerifyBlog from "@/views/adminCenter/pages/verifyBlog";
import BrowseBlog from "@/views/adminCenter/pages/browseBlog";
import VerifyDetail from "@/views/adminCenter/pages/verifyDetail";
import VerifyCheck from "@/views/adminCenter/pages/verifyCheck";


export default function AdminCenter(){
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
        history.push('/')
        return res
    }
    const handleClickMenu = (e) => {
        history.push(e.key)
    }
    //data
    const navMenuItems = [
        { label: '首页', key: '/admin-center/home' },
        {
            label: '博客管理',
            key: '/admin-center/self',
            children: [
                { label: '博客列表', key: '/admin-center/browse-blog' },
                { label: '审核博客', key: '/admin-center/verify-blog' },
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
                        mode="inline"
                        items={navMenuItems}
                        onClick={handleClickMenu}
                    />
                </div>
                <div className="backstage-content">
                    <Route path="/admin-center">
                        <Redirect to="/admin-center/verify-blog"/>
                    </Route>
                    <Route path="/admin-center/home">
                        <AdminHome/>
                    </Route>
                    <Route path="/admin-center/browse-blog">
                        <BrowseBlog/>
                    </Route>
                    <Route path="/admin-center/verify-blog">
                        <VerifyBlog/>
                    </Route>
                    <Route path="/admin-center/verify-detail">
                        <VerifyDetail/>
                    </Route>
                    <Route path="/admin-center/verify-check">
                        <VerifyCheck/>
                    </Route>
                </div>
            </div>
        </div>
    )
}
