import './SingleItem.css';
import React from 'react';
import psVariables from './../data/ps_variables.json';
import { Button, Collapse, Dropdown, Form, Input, Select, Space, Switch} from 'antd';
import CopyToClipboardItem from './CopyToClipboardItem.js';
import Icon from '@ant-design/icons';
const { TextArea } = Input;

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

// DATA

const aiEngineOptions = [
    {
        label: 'GPT 4o (Default)',
        value: 'GPT-4o'
    },
    {
        label: 'GPT 3.5',
        value: 'GPT-3.5'
    },
    {
        label: 'GPT 4',
        value: 'GPT-4'
    },
    {
        label: 'Claude Haiku',
        value: 'Claude-Haiku'
    },
    {
        label: 'Claude Opus',
        value: 'Claude-Opus'
    },
    {
        label: 'Claude Sonnet',
        value: 'Claude-Sonnet'
    },
    {
        label: 'Gemini',
        value: 'Gemini'
    },
];

const usageContextItems = [],
      usageContext = [];

psVariables.map((item) => {
    if (!usageContextItems.includes(item.usage_context)) {
        usageContextItems.push(item.usage_context);
    }
    return true;
});

usageContextItems.map(context => {
    let contextLabel = context.replaceAll("_", " ");

    let children = psVariables.filter(item => {
        return item.usage_context === context;
    }).map(item => {
        return (
            <CopyToClipboardItem text={ item.name } />
        );
    })

    usageContext.push({
        key: usageContext.length + 1,
        label: contextLabel,
        children: children,
    });
});


function SingleItemPrompt() {
    return (
        <section className='ps-page-layout'>
            <Form 
                className='ps-form-container'
                layout="horizontal"
                labelCol={{span: 2,}}>
                <header className='ps-page__header'>
                <h1 className='ps-h1'>Ps Prompt For - Product Review Section Summary Alternate Solutions Step</h1>
                <Dropdown menu={{ items }} placement="bottomRight">
                    <Button type="text" shape="circle" icon={<IconDotMenu style={{ width: '16px', height: '16px' }} />}></Button>
                </Dropdown>
                </header>
                <div className='ps-page__body'>
                    <div className='ps-form'>
                        <Form.Item label="Title" name="title" valuePropName="title">
                            <Input showCount maxLength={100} placeholder="Title" />
                        </Form.Item>
                        <Form.Item label="Prompt" name="prompt" valuePropName="prompt">
                            <TextArea 
                                autoSize={{ minRows: 10, maxRows: 15 }}
                                showCount
                                maxLength={1000}
                                placeholder="Prompt"
                            />
                        </Form.Item>
                        <Form.Item label="AI Engine" name="ai-engine" valuePropName="ai-engine">
                            <Select
                                mode="multiple"
                                allowClear
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Select AI engines"
                                defaultValue={['GPT-4o']}
                                // onChange={handleChange}
                                options={aiEngineOptions}
                            />
                        </Form.Item>
                        <Form.Item label="Active" valuePropName="active">
                            <Switch size="small" />
                        </Form.Item>
            
                    </div>
                    <aside className='ps-page__sidebar'>
                        <header class="ps-page__sidebar__header">Variables Guide</header>
                        <Collapse
                            className='ps-variable-list'
                            accordion
                            items={usageContext}
                        />
                    </aside>
                </div>
                <footer className='ps-page__footer'>
                <Space>
                    <Button>Cancel</Button>
                    <Button type="primary">Update</Button>
                </Space>
                </footer>
            </Form>
        </section>
    )
}

export default SingleItemPrompt;