import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message} from 'antd';
import React, { useState } from 'react';
import {uploadCover} from "@/api/blog";
import CODE from "@/util/code";
import CONSTANT from "@/util/constant";

const CoverUpload = (props) => {
    const {coverUrl,setCoverUrl} = props
    const uploadProps = {
        customRequest: info => {//手动上传
            const formData = new FormData();
            formData.append('file', info.file);//名字和后端接口名字对应
            uploadCover(formData).then(data=>{
                console.log(data)
                if (!data) return;
                setCoverUrl(data)
                message.success('上传图片成功！');
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
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <>
            {/*action return ...*/}
            <Upload
                listType="picture-card"
                showUploadList={false}
                {...uploadProps}
            >
                {coverUrl ? <img src={CONSTANT.COVER_PREFIX+coverUrl} alt="avatar" style={{ width: '100%' }} /> :     uploadButton}
            </Upload>
        </>
    );
};
export default CoverUpload;
