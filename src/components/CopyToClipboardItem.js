import './CopyToClipboardItem.css';
import React from 'react';
import { Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';


function CopyToClipboardItem({text}) {
    const [messageApi, contextHolder] = message.useMessage();
    
    const copiedToClipboard = () => {
        messageApi.open({
        type: 'success',
        content: 'Successfully copied to clipboard',
        });
    };

    return (
        <>
            { contextHolder }
            <CopyToClipboard
                classname='ps-context__copy'
                text={text}
                onCopy={ copiedToClipboard }
            >
                <div className='ps-context'>
                    <span className='ps-context__text'>{text}</span>
                    <Button className='ps-context__button' icon={<CopyOutlined />} />
                </div>
            </CopyToClipboard>
        </>
    )
}

export default CopyToClipboardItem;