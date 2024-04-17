import {Button} from "antd";
import image01 from '@/assets/images/image01.png'
import HomeLayout from "@/components/homeLayout";
import './index.less'
import {useEffect, useState} from "react";
import {list} from "@/api/blog";
import CONSTANT from "@/util/constant";
import {useHistory} from "react-router-dom";

function AuthorItem(props){
    const {name,description} = props
    return (
        <div className="author-item">
            <img src={image01}/>
            <div className="author-info">
                <h3 className="red">{name}</h3>
                <span>{description}</span>
            </div>
            <Button>关注</Button>
        </div>
    )

}

function BlogItem(props){
    const {blog} = props
    const {coverUrl,title,content} = blog
    const history = useHistory()
    const partContent = (content) =>{
        const max = 87
        if (content.length>max) return content.slice(0,max)+'......'
        return content
    }
    const handleCheck = () =>{
        const data = {
            blog
        }
        history.push('/access',data)
    }
    return (
        <>
            <div className="blog-item" onClick={handleCheck}>
                <img src={CONSTANT.COVER_PREFIX+coverUrl} alt="封面"/>
                <div className="item-content">
                    <h3>{title}</h3>
                    <p className="content">{partContent(content)}</p>
                    <div className="item-footer">
                        <span className="clear">3</span>
                        <span>点赞</span>
                        <span>踩</span>
                        <span>作者</span>
                    </div>
                </div>
            </div>
        </>

    )
}

function Home(){
    const [blogList,setBlogList] = useState([])
    const tags = ['推荐','关注','前端','后端','移动开发','编程语言']
    const history = useHistory()
    const author = {
        name:'张三',
        description:'描述...'
    }
    let authors = []
    for (let i = 0; i < 4; i++){
        authors.push(author)
    }

    useEffect(()=>{
        list().then(data=>{
            if (!data) return
            setBlogList(data)
        })
    },blogList)

    return (
        <HomeLayout>
            <div className="home-container">
                <div className="home">
                    <div className="tags">
                        {
                            tags.map(
                                value => (<span key={value}>
                                {value}
                            </span>)
                            )
                        }
                    </div>
                    <div className="blog-list">
                        <div className="blog-list-content">
                            {
                                blogList.map(
                                    (blog,index)=> (<BlogItem blog={blog}/>)
                                )
                            }
                        </div>
                    </div>
                    <div className="author-list">
                        <h2>作者推荐</h2>
                        {
                            authors.map(
                                (value,index)=> (<AuthorItem key={index} name={value.name} description={value.description}/>)
                            )
                        }
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}


export default Home
