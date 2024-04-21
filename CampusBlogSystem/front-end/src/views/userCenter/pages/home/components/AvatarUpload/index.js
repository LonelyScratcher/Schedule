import { Upload, message} from 'antd';
import React from 'react';
import {uploadAvatar, uploadCover} from "@/api/blog";
import CONSTANT from "@/util/constant";
import './index.less'

const AvatarUpload = (props) => {
    const {avatarUrl,preAvatarUrl,setPreAvatarUrl,isEdit} = props
    const uploadProps = {
        customRequest: info => {//手动上传
            const formData = new FormData();
            formData.append('file', info.file);//名字和后端接口名字对应
            uploadAvatar(formData).then(data=>{
                console.log(data)
                if (!data) return;
                setPreAvatarUrl(data)
                message.success('上传头像成功！');
            })
        },
        beforeUpload: file => {//控制上传图片格式
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

            if (!isJpgOrPng) {
                message.error('您只能上传JPG/PNG 文件!');
                return;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('图片大小必须小于2MB!');
                return;
            }
            return isJpgOrPng && isLt2M;
        },
    }
    return (
        <>
            {!isEdit&&<img className="avatar" src={CONSTANT.AVATAR_PREFIX+avatarUrl}/>}
            {isEdit&&
                <>
                    <Upload
                        showUploadList={false}
                        {...uploadProps}
                    >
                        <img className="avatar" src={CONSTANT.AVATAR_PREFIX+preAvatarUrl}/>
                    </Upload>
                </>
            }
        </>
    );
};
export default AvatarUpload;
