import React from 'react';
import Layout from '../layouts/Layout'
import AddToWallet from '../components/AddToWallet'
import { List, Avatar, Card, Skeleton, Typography, Row, Col } from 'antd';
import Moment from 'react-moment';

class Wallet extends React.Component {
    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                initLoading: false,
                // data: res.results,
                list: [
                    { name: "Bitcoin", value: 10.22, time: "Sun Apr 26 2020 16:25:47 GMT+0200 (Central European Summer Time)" },
                    { name: "Bitcoin", value: 13.22, time: "Sun Apr 14 2020 16:25:47 GMT+0200 (Central European Summer Time)" },
                    { name: "Bitcoin", value: 13.22, time: "Sun Apr 13 2020 10:25:47 GMT+0200 (Central European Summer Time)" },
                    { name: "Bitcoin", value: 25.00, time: "Sun Apr 01 2020 10:25:47 GMT+0200 (Central European Summer Time)" },
                    { name: "Bitcoin", value: 104.41, time: "Sun Apr 20 2020 10:25:47 GMT+0200 (Central European Summer Time)" }
                ],
            });
        }, 1500)
    }

    render() {
        const { initLoading, loading, list } = this.state;

        return (
            <Layout title="My Wallet" cta={<AddToWallet />}>
                <Card>
                    <List
                        className="demo-loadmore-list"
                        loading={initLoading}
                        itemLayout="horizontal"
                        dataSource={list}
                        renderItem={item => (
                            <List.Item
                            //actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                            >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" />
                                        }
                                        title={item.name}
                                        description="BTC"
                                    />
                                    <Row style={{ minWidth: "200px", textAlign: "right" }}>
                                        <Col span={16}><Typography.Title level={4} style={{ color: "#00d598" }}><strong>+{item.value} BTC</strong></Typography.Title></Col>
                                        <Col span={16}><Typography.Text type="secondary"> <Moment fromNow ago>{item.time}</Moment> ago</Typography.Text></Col>
                                    </Row>
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </Card>
            </Layout>
        )
    }
}

export default Wallet