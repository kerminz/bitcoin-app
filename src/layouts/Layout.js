import React from 'react'
import 'antd/dist/antd.css'
import '../styles/layout.css'
import { Layout, Menu } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { NavLink, withRouter } from 'react-router-dom';

const { Header, Sider, Content } = Layout;


class AppLayout extends React.Component {
    state = {
        collapsed: false,
        selected: ''
    };

    componentDidMount() {
        if (window.location.pathname.indexOf('') !== -1) {
            this.setState({ selected: 'dashboard' });
        }
        if (window.location.pathname.indexOf('details') !== -1) {
            this.setState({ selected: 'details' });
        }
        if (window.location.pathname.indexOf('converter') !== -1) {
            this.setState({ selected: 'converter' });
        }
        if (window.location.pathname.indexOf('chart') !== -1) {
            this.setState({ selected: 'chart' });
        }
        if (window.location.pathname.indexOf('wallet') !== -1) {
            this.setState({ selected: 'wallet' });
        }
    }

    onSelect = (item, key, keyPath, selectedKeys, domEvent) => {
        this.setState({ selected: keyPath });
        // const to = '/' + keyPath;
        // history.push(to);
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={[this.state.selected]}>
                        <Menu.Item key="dashboard">
                            <NavLink to="/">
                                <UserOutlined />
                                <span>Dashboard</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="details">
                            <NavLink to="/details">
                                <VideoCameraOutlined />
                                <span>Bitcoin Details</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="converter">
                            <NavLink to="/converter">
                                <UploadOutlined />
                                <span>Converter</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="chart">
                            <NavLink to="/chart">
                                <UploadOutlined />
                                <span>Chart</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="wallet">
                            <NavLink to="/wallet">
                                <UserOutlined />
                                <span>Wallet</span>
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ paddingLeft: 20 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            //minHeight: 500,
                            height: "100vh"
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default AppLayout