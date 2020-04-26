import React from 'react'
import 'antd/dist/antd.css'
import '../styles/layout.css'
import { Layout, Menu, Typography, Divider } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    DashboardOutlined,
    DoubleRightOutlined,
    LineChartOutlined,
    RetweetOutlined
} from '@ant-design/icons';
import { NavLink, withRouter } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;


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
        if (window.location.pathname.indexOf('charts') !== -1) {
            this.setState({ selected: 'charts' });
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
                    <Typography.Title level={2} style={{ color: "#fff", marginLeft: "2.3rem", marginTop: "1rem" }}>{!this.state.collapsed ? "Bitcoinzz" : "B."}</Typography.Title>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={[this.state.selected]}>
                        <Menu.Item key="dashboard">
                            <NavLink to="/">
                                <DashboardOutlined />
                                <span>Dashboard</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="details">
                            <NavLink to="/details">
                                <DoubleRightOutlined />
                                <span>Bitcoin Details</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="converter">
                            <NavLink to="/converter">
                                <RetweetOutlined />
                                <span>Converter</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="charts">
                            <NavLink to="/charts">
                                <LineChartOutlined />
                                <span>Charts</span>
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
                        <div style={{ display: "flex" }}>
                            <Title style={{ width: "90%" }}>{this.props.title}</Title>
                            <div style={{ textAlign: "right", display: "inline", margin: "auto" }}>{this.props.cta}</div>
                        </div>
                        <Divider style={{ marginTop: "0.5rem" }} />
                        <div>{this.props.children}</div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default AppLayout