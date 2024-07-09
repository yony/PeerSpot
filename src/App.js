import logo from './logo.svg';
import './App.css';
import React, { useCallback, useState } from 'react';
import SideNavMenu from './components/SideNavMenu.js';
import SearchResults from './components/SearchResults.js';
import { Avatar, Badge, Breadcrumb, Button, ConfigProvider, Input } from 'antd';
import { ArrowLeftOutlined, HomeOutlined, MenuFoldOutlined } from '@ant-design/icons';


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
            <Button type="text" shape="circle" icon={<MenuFoldOutlined />}></Button>
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
              Form
            </div>
          </div>
        </section>
      </div>
    </ConfigProvider>
  );
}

export default App;
