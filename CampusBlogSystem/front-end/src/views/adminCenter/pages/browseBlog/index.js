import './index.less'
import front from '@/assets/images/front.png'
import CONSTANT from "@/util/constant";
export default function BrowseBlog(){
    const arr = [1,2,3,4,5]
    return (
        <div className="publish-container">
            {
                arr.map((item,index)=>(
                    <div className={`blog-item ${index===0 && 'first'}`}>
                        <img src={front} alt="封面"/>
                        <div className="detail">
                            <h3>Title</h3>
                            <p>description...</p>
                            <div className="footer">
                                <div className="left">
                                    <span>发布博客 2024.02.09</span>
                                    <span>0阅读</span>
                                    <span>0点赞</span>
                                    <span>0评论</span>
                                    <span>0收藏</span>
                                </div>
                                <div className="right">
                                    <a>编辑</a>
                                    <a>删除</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
