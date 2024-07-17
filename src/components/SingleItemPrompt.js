import './SingleItem.css';
// import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Space} from 'antd';
import Icon from '@ant-design/icons';

const svgIconDotMenu = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 13C9.5 13.8284 8.82843 14.5 8 14.5C7.17157 14.5 6.5 13.8284 6.5 13C6.5 12.1716 7.17157 11.5 8 11.5C8.82843 11.5 9.5 12.1716 9.5 13ZM9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8ZM9.5 3C9.5 3.82843 8.82843 4.5 8 4.5C7.17157 4.5 6.5 3.82843 6.5 3C6.5 2.17157 7.17157 1.5 8 1.5C8.82843 1.5 9.5 2.17157 9.5 3Z" fill="black"/>
    </svg>
);

const IconDotMenu = (props) => <Icon component={svgIconDotMenu} {...props} />;

// Dot menu items
const items = [
    {
      key: 'duplicate',
      label: (
        <a rel="noopener noreferrer" href="/">
          Duplicate
        </a>
      ),
    },
    {
      key: 'delete',
      label: (
        <a rel="noopener noreferrer" href="/">
          Delete
        </a>
      ),
    },
];

function SingleItemPrompt() {
    return (
        <section className='ps-page-layout'>
            <header className='ps-page__header'>
            <h1 className='ps-h1'>Ps Prompt For - Product Review Section Summary Alternate Solutions Step</h1>
            <Dropdown menu={{ items }} placement="bottomRight">
                <Button type="text" shape="circle" icon={<IconDotMenu style={{ width: '16px', height: '16px' }} />}></Button>
            </Dropdown>
            </header>
            <div className='ps-form'>
                FORM
            </div>
            <footer className='ps-page__footer'>
            <Space>
                <Button>Cancel</Button>
                <Button type="primary">Update</Button>
            </Space>
            </footer>
        </section>
    )
}

export default SingleItemPrompt;