import HomeLayout from "@/components/homeLayout";
import './index.less'
import {Button} from "antd";
import java from '@/assets/images/java.png'
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {searchList} from "@/api/blog";
import {dateStr} from "@/util";
import CONSTANT from "@/util/constant";

const BlogItem = (props) =>{

    const {blog} = props
    const {title,content,date,coverUrl} = blog

    const partContent = (content) =>{
        const max = 87
        if (content.length>max) return content.slice(0,max)+'......'
        return content
    }

    return (
        <div className="blog-item">
            <div className="info">
                <h3>{title}</h3>
                <p>{partContent(content)}</p>
                <div className="info-footer">
                    <div className="info-footer-left">
                        <span>108</span>
                        <span>90</span>
                        <span>70</span>
                    </div>
                    <div className="info-footer-right">
                        <span>Author</span>
                        <span>{dateStr(date)}</span>
                    </div>
                </div>
            </div>
            <img className="cover" src={CONSTANT.COVER_PREFIX+coverUrl}/>
        </div>
    )
}

export default function Search(){

    const [blogList,setBlogList] = useState([])
    const {state} = useLocation()


    useEffect(()=>{
        const searchText= state?.searchText || ""
        searchList({searchText}).then(data=>{
            if (!data) return
            setBlogList(data)
        })
    })

    const tags = ['综合','最新','热门']
    return (
        <HomeLayout>
            <div className="search-container">
                <div className="main">
                    <div className="top">
                        {
                            tags.map( tag=>
                                <Button className="btn-tag">{tag}</Button>
                            )
                        }
                    </div>
                    <div className="center">
                        <div className="blog-list">
                            {
                                blogList.map(blog=>
                                    <BlogItem blog={blog}/>
                                )
                            }
                        </div>
                        <div className="recommend-list">
                            <div className="recommend-top">
                                <span>Java热搜榜</span>
                            </div>
                            <div className="recommend-content">
                                <div className="item">
                                    <span className="order">1</span>
                                    <span>java学习路线</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}
