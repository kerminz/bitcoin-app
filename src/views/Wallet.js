import React from 'react';
import Layout from '../layouts/Layout'
import { connect } from 'react-redux';
import AddToWallet from '../components/AddToWallet'
import { List, Avatar, Card, Skeleton, Typography, Row, Col } from 'antd';
import Moment from 'react-moment';
import { updateWallet } from '../actions/index'

class Wallet extends React.Component {
    state = {
        initLoading: true,
        loading: false
    };

    componentDidMount() {
        if (!localStorage.getItem('wallet')) {
            var data = this.props.walletHistory
            localStorage.setItem('wallet', JSON.stringify(data))
        } else {
            var data = JSON.parse(localStorage.getItem('wallet')).reverse()
            this.props.updateWallet(data)
        }

        setTimeout(() => {
            this.setState({
                initLoading: false
            });
        }, 1500)
    }

    render() {
        const { initLoading } = this.state;

        return (
            <Layout title="My Wallet" cta={<AddToWallet />}>
                <Card>
                    <List
                        className="demo-loadmore-list"
                        loading={initLoading}
                        itemLayout="horizontal"
                        dataSource={this.props.walletHistory}
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

const mapPropsToState = (state) => {
    return {
        walletHistory: state.app.walletHistory
    }
}

export default connect(mapPropsToState, { updateWallet })(Wallet)