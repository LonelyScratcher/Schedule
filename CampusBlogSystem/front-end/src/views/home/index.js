import {Button, Pagination} from "antd";
import HomeLayout from "@/components/homeLayout";
import './index.less'
import {useEffect, useState} from "react";
import {list} from "@/api/blog";
import CONSTANT from "@/util/constant";
import {useHistory} from "react-router-dom";
import Good from "@/components/icons/good";
import avatar from '@/assets/images/avatar.jpg'
import View from "@/components/icons/view";
import Comment from "@/components/icons/comment";
import {recommendAuthor} from "@/api/user";

function AuthorItem(props){
    const {author} = props
    const {name,description,avatarUrl} = author
    return (
        <div className="author-item">
            <img src={CONSTANT.AVATAR_PREFIX+avatarUrl}/>
            <div className="author-info">
                <h3 className="red">{name}</h3>
                <span>{description}</span>
            </div>
        </div>
    )

}

function BlogItem(props){
    const {blog} = props
    const {id,coverUrl,title,content,author,goodNum,good,access,commentNum} = blog
    const history = useHistory()
    const handleCheck = () =>{
        const data = {
            blog
        }
        history.push('/access',data)
    }
    const partContent = (content) =>{
        return content.replace(/\s|#/g, '');
    }
    return (
        <>
            <div className="blog-item" onClick={handleCheck}>
                <img src={CONSTANT.COVER_PREFIX+coverUrl} alt="封面"/>
                <div className="item-content">
                    <h3>{title}</h3>
                    <p className="content">{partContent(content)}</p>
                    <div className="item-footer">
                        <View size={17} viewNum={access}/>
                        <Good size={17} goodNum={goodNum} isGood={good} blogId={id}/>
                        <Comment size={17} commentNum={commentNum}/>
                        <span className="username">作者：{author}</span>
                    </div>
                </div>
            </div>
        </>

    )
}

function Home(){
    const [blogList,setBlogList] = useState([])
    const [totalPage,setTotalPage] = useState(0)
    const [tagName,setName] = useState("全部")
    const [pageNum,setPageNum] = useState(1)
    const [authorList,setAuthorList] = useState([])
    const tags = ['全部','前端','后端','移动开发','人工智能']
    const author = {
        name:'张三',
        description:'描述...'
    }
    let authors = []
    for (let i = 0; i < 4; i++){
        authors.push(author)
    }

    //init page one
    //get total
    useEffect(()=>{
        fetchPageBlogList(1)
    },[])

    useEffect(()=>{
        recommendAuthor().then(data=>{
            if (!data) return
            setAuthorList(data)
        })
    })

    const fetchPageBlogList = (pageNum) =>{
        list({pageNum:pageNum-1,tagName}).then(data=>{
            if (!data) return
            const {list,totalPage} = data
            setBlogList(list)
            setTotalPage(totalPage)
        })
    }

    const pageChange = (value) =>{
        setPageNum(value)
        fetchPageBlogList(value)
    }

    const selectedTag = (value) =>{
        setName(value)
        const curPageNum = 1
        setPageNum(curPageNum)
        list({pageNum:curPageNum-1,tagName:value}).then(data=>{
            if (!data) return
            const {list,totalPage} = data
            setBlogList(list)
            setTotalPage(totalPage)
        })
    }

    return (
        <HomeLayout>
            <div className="home-container">
                <div className="home">
                    <div className="tags">
                        {
                            tags.map(
                                value => (<span className={value===tagName?'selected':''} onClick={()=>selectedTag(value)} key={value}>
                                {value}
                            </span>)
                            )
                        }
                    </div>
                    <div className="blog-list">
                        <div className="blog-list-content">
                            {
                                blogList.map(
                                    (blog,index)=> (<BlogItem key={blog.id} blog={blog}/>)
                                )
                            }
                        </div>
                        <div className="page-container">
                            <Pagination pageSize={6} onChange={pageChange} current={pageNum} total={6*totalPage} />
                        </div>
                    </div>
                    <div className="author-list">
                        <h2>作者推荐</h2>
                        {
                            authorList.map(
                                (value,index)=> (<AuthorItem key={value.id} author={value}/>)
                            )
                        }
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}


export default Home
