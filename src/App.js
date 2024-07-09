import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import SideNavMenu from './components/SideNavMenu.js';
import SearchResults from './components/SearchResults.js';
import { Avatar, Badge, Breadcrumb, Button, ConfigProvider, Dropdown, Input, Space } from 'antd';
import Icon, { ArrowLeftOutlined, HomeOutlined } from '@ant-design/icons';

// ICONS
const svgIconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 20C1 19.4477 1.44772 19 2 19H22C22.5523 19 23 19.4477 23 20C23 20.5523 22.5523 21 22 21H2C1.44772 21 1 20.5523 1 20Z" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 11.4477 1.44772 11 2 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H2C1.44772 13 1 12.5523 1 12Z" fill="black"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 4C1 3.44772 1.44772 3 2 3H22C22.5523 3 23 3.44772 23 4C23 4.55228 22.5523 5 22 5H2C1.44772 5 1 4.55228 1 4Z" fill="black"/>
  </svg>
);

const svgIconDotMenu = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 13C9.5 13.8284 8.82843 14.5 8 14.5C7.17157 14.5 6.5 13.8284 6.5 13C6.5 12.1716 7.17157 11.5 8 11.5C8.82843 11.5 9.5 12.1716 9.5 13ZM9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8ZM9.5 3C9.5 3.82843 8.82843 4.5 8 4.5C7.17157 4.5 6.5 3.82843 6.5 3C6.5 2.17157 7.17157 1.5 8 1.5C8.82843 1.5 9.5 2.17157 9.5 3Z" fill="black"/>
  </svg>
);

const IconMenu = (props) => <Icon component={svgIconMenu} {...props} />;
const IconDotMenu = (props) => <Icon component={svgIconDotMenu} {...props} />;

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const resultSections = [
  {
    title: "Recent Content Type",
    showMoreButton: false,
  },
  {
    title: "Product",
    showMoreButton: true,
  },
  {
    title: "Comparison",
    showMoreButton: true,
  },
  {
    title: "Category",
    showMoreButton: true,
  },
]

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

function App() {

  const [menuLevel, setMenuLevel] = useState(0);

  const styleTransition = {
    transform: `translate3d(${-menuLevel * 300}px, 0, 0)`,
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: '#FFD700',
          colorTextLightSolid: "#000000",
          borderRadius: 0,
        },
        components: {
          Button: {
            borderRadius: '2px',
            colorPrimary: '#FFD700',
            colorPrimaryActive: '#E0BD00',
            colorPrimaryHover: '#F7C602',
          },
        },
      }}
    >
      <div className="ps-app">
        <aside className="ps-side-bar">
          <header className="ps-side-bar__header">
            <Button type="text" shape="circle" icon={<IconMenu style={{ width: '16px', height: '16px' }} />}></Button>
            <img src={logo} className="ps-logo" alt="logo" />
            <div style={{ width: '40px'}}></div>
          </header>
          <SideNavMenu />
        </aside>
        <section className="ps-main">
          <header className="ps-header">
            <Breadcrumb 
              items={[
                {
                  href: '',
                  title: <HomeOutlined />,
                },
                {
                  href: '',
                  title: 'PS Modules',
                },
                {
                  href: '',
                  title: 'Content Types',
                },
                {
                  href: '',
                  title: 'Steps',
                },
                {
                  title: 'Prompts',
                },
              ]}
            />
            <Badge dot>
              <Avatar
                style={{
                  backgroundColor: '#FFF8E8',
                  border: '1px solid #E5E6E1',
                  color: '#A97F13',
                  }}>YL</Avatar>
            </Badge>
          </header>
          <div className="ps-body">
            <aside className='ps-items-panel'>
              <div className='ps-items-panel__container'
                   style={styleTransition}>
                <div className='ps-items-panel__level ps-items-panel__level--main'>                  
                  <div className='ps-items-panel__search'>
                    <Search
                      className='ps-search'
                      placeholder="Search content type..."
                      onSearch={onSearch}
                      style={{
                        width: '100%',
                      }}
                    />
                  </div>
                  <div className='ps-search-results'>
                    {resultSections.map((section, index) => (  
                      <SearchResults
                        childMenuLevel={1}
                        onChange={setMenuLevel}
                        showMoreButton={section.showMoreButton}
                        title={section.title}
                      />
                    ))}
                  </div>
                  <div className='ps-items-panel__cta'>
                    <Button type="primary" onClick={() => setMenuLevel(1)}>New Content Type</Button>
                  </div>
                </div>
                <div className='ps-items-panel__level ps-items-panel__level--child'>
                  <header className="ps-items-panel__header">
                    <Button type="text" shape="circle" icon={<ArrowLeftOutlined />} onClick={() => setMenuLevel(0)}></Button>
                    <div>Steps</div>
                    <div style={{ width: '40px'}}></div>
                  </header>
                  <div className='ps-search-results'>
                    Steps 123456
                  </div>
                  <div className='ps-items-panel__cta'>
                    <Button type="primary" onClick={() => setMenuLevel(2)}>New Step</Button>
                  </div>
                </div>
                <div className='ps-items-panel__level ps-items-panel__level--child'>
                  <header className="ps-items-panel__header">
                    <Button type="text" shape="circle" icon={<ArrowLeftOutlined />} onClick={() => setMenuLevel(1)}></Button>
                    <div>Prompts</div>
                    <div style={{ width: '40px'}}></div>
                  </header>
                  <div className='ps-search-results'>
                    Prompts 123456
                  </div>
                  <div className='ps-items-panel__cta'>
                    <Button type="primary">New Prompt</Button>
                  </div>
                </div>
              </div>
            </aside>
            <div className='ps-item-container'>
              <section className='ps-page-layout'>
                <header className='ps-page__header'>
                  <h1 className='ps-h1'>category-mini_article_types</h1>
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
            </div>
          </div>
        </section>
      </div>
    </ConfigProvider>
  );
}

export default App;
