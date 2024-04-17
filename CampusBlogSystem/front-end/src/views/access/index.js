import './index.less'
import HomeLayout from "@/components/homeLayout";
import avatar from '@/assets/images/avatar.jpg'
import {useLocation} from "react-router-dom";
import {dateStr} from "@/util";
import {useEffect} from "react";
import {marked} from "marked";
import Good from "@/components/icons/good";
import Collection from "@/components/icons/collection";
import Comment from "@/components/icons/comment";
export default function Access(){
    const {state} = useLocation()
    const blog = state?.blog || {title:'',content:'',tagName:'',date:''}
    const generalAttr = [
        {name:'博客数', value:0},
        {name:'总访问', value:0}
    ]
    const detailAttr = [
        {name:'获赞', value:0},
        {name:'评论', value:0},
        {name:'收藏', value:0},
    ]
    useEffect(()=>{
        document.getElementById('md-body').innerHTML = marked.parse(blog.content);
    },[])
    return (
        <HomeLayout>
            <div className="home-container">
                <div className="access-container">
                    <div className="access-left">
                        <div className="avatar-container">
                            <img src={avatar} alt="头像"/>
                            <span>username</span>
                        </div>
                        <div className="general-attr">
                            {
                                generalAttr.map((item,index)=>
                                    <div className={`attr ${index===0&&"first"}`}>
                                        <span>{item.value}</span>
                                        <span>{item.name}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div className="detail-attr">
                            {
                                detailAttr.map((item,index)=>
                                    <div className={`attr ${index===0&&"first"}`}>
                                        <span>{item.value}</span>
                                        <span>{item.name}</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="access-right-container">
                        <div className="access-right">
                            <h2 className="title">{blog.title}</h2>
                            <div className="top-describe">
                                <span>发布时间：{dateStr(blog.date)}</span>
                                <span className="row-mt">
                                    博客标签：
                                    <span className="tag">{blog.tagName}</span>
                                </span>
                            </div>
                            <div id="md-body" className="blog-content"/>
                            <div className="bottom-describe">
                                <Good/>
                                <Collection/>
                                <Comment/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}
