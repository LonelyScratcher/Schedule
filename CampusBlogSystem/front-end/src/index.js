import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.css'
import '@/index.less';
import '@/components/icons/index.less'
import '@/assets/css/blogListContainer.less'
import 'simplemde/dist/simplemde.min.css'
import App from "@/app";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
