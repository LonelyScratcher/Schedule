import './index.less'
import {Button, Input, Select, Upload, message} from "antd";
import {useEffect, useState} from "react";
import CoverUpload from "@/views/userCenter/pages/write/components/CoverUpload";
import SimpleMDE from "simplemde";
import {publish, uploadCover} from "@/api/blog";
import {useHistory, useLocation} from "react-router-dom";
/*
as I can not control what js to show first,so it is not able to use before

left two question,
and I want to avoid them
I feel so tired
*/
export default function Write(){
    const [form,setForm] = useState({title:'',tagName:'前端'})
    const [simplemde,setSimplemde] = useState(null)
    const [coverUrl,setCoverUrl] = useState("")
    const {state} = useLocation()
    const history = useHistory()
    useEffect(() => {
        let mdContent = ""
        if (state){
            const {title,tagName,content,coverUrl,id} = state
            //mainly setter id
            setForm({title,tagName,id})
            mdContent = content
            setCoverUrl(coverUrl)
        }

        const simplemde = new SimpleMDE({
            element: document.getElementById("md_textarea"),
            spellChecker: false
        });
        setSimplemde(simplemde)
        simplemde.value(mdContent);
        return ()=> {
            simplemde.toTextArea()
            setSimplemde(null)
        }
    }, []);
    const optionsVal = [
        {
            value: '前端',
            label: '前端',
        },
        {
            value: '后端',
            label: '后端',
        },
        {
            value: '移动开发',
            label: '移动开发',
        },
        {
            value: '人工智能',
            label: '人工智能',
        },
    ]

    const handleChangeValue = (value,name) =>{
        setForm(preFrom => (
            {
                ...preFrom,
                [name]:value
            }
        ))
    }
    const publishBlog = () =>{
        const content = simplemde.value()
        let blog = form
        blog.coverUrl = coverUrl
        blog.content = content
        blog.date = new Date()

        publish(blog).then(data=>{
            if (!data) return;
            message.success('提交博客成功！')
            history.push('/user-center/wait-verify')
        })
    }
    return (
        <div className="write-container">
            <Input
                value={form.title}
                className="title-input"
                placeholder="请输入博客标题"
                onChange={({target:{value}}) => handleChangeValue(value,'title')}
            />
            <textarea id="md_textarea" className="md-textarea"/>
            <div className="row-item">
                <p>文章标签：</p>
                <Select
                    defaultValue={form.tagName}
                    style={{
                        width: 120,
                    }}
                    onChange={value => handleChangeValue(value,'tagName')}
                    options={optionsVal}
                />
            </div>
            <div className="row-item">
                <p>封面选择：</p>
                <CoverUpload coverUrl={coverUrl} setCoverUrl={setCoverUrl}/>
            </div>
            <Button onClick={publishBlog}>发布博客</Button>
        </div>
    )
}
