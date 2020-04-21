import React from 'react';
import Layout from '../layouts/Layout'
import { Statistic, Card, Row, Col } from 'antd';
import { connect } from 'react-redux'
import { fetchDetails } from '../actions/index'
import Loader from '../components/Loader'

class BitcoinDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading: true
        }
    }

    componentDidMount() {
        this.props.fetchDetails().then((result) => {
            this.setState({ dataFetched: true })
            this.setState({ data: this.props.data.details })
            setTimeout(() => {
                this.setState({ loading: false })
            }, 1000);
            console.log(this.state.data)
        })
    }

    render() {
        const content = (
            <div className="site-statistic-demo-card">
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <Statistic title="USD market cap (based on 24 hour weighted price)" value={this.state.data.marketcap} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic title="Total Bitcoins in circulation" value={this.state.data.totalbc} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic title="Number of transactions in the past 24 hours" value={this.state.data.trans24h} />
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <Statistic title="Number of btc sent in the last 24 hours" value={this.state.data.hrbt24h} precision={0} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic title="Hash rate in gigahash" value={this.state.data.hashrate} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic title="Current difficulty target as a decimal number" value={this.state.data.diff} />
                        </Card>
                    </Col>
                </Row>
            </div>
        )

        return (
            <Layout title="Bitcoin Details">
                {!this.state.loading ? <div>{content}</div> : <Loader />}
            </Layout>
        )
    }
}

const mapPropsToState = (state) => {
    return {
        data: state.app
    }
}

export default connect(mapPropsToState, { fetchDetails })(BitcoinDetails)