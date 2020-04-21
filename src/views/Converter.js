import React from 'react';
import Layout from '../layouts/Layout'
import { connect } from 'react-redux'
import { Card, Row, Col, Input, Select, Typography } from 'antd';
import { fetchToBtc } from '../actions/index'

class Converter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            valueBtc: 0,
            valueCur: 0
        }
    }

    componentDidMount() {
        this.props.fetchToBtc('eur', 100).then((result) => {
            console.log(this.props.tobtc)
        })
    }

    handleChange = (value) => {
        console.log(value)
    }

    handleInputChangeBTC = (e) => {
        console.log(e.target.value)
        this.setState({ valueBtc: e.target.value })
        // e.target.value = 2222
        // console.log(e.target.value)
    }

    handleInputChangeCurrency = (e) => {
        console.log(e.target.value)
        this.setState({ valueCur: e.target.value })
    }

    render() {
        const { Option } = Select

        return (
            <Layout title="Converter">
                <Card style={{ backgroundColor: "#f2f5fa", width: "900px", margin: "auto" }}>
                    <Typography.Paragraph>Bitcoin Calculator tool allows you to convert any amount to and from bitcoin.</Typography.Paragraph>
                    <br />
                    <Row gutter={[24, 24]}>
                        <Col span={8}><Input size="large" onChange={(e) => { this.handleInputChangeBTC(e) }} placeholder="BTC" value={this.state.valueBtc} /></Col>
                        <Col span={2}>x BTC =</Col>
                        <Col span={10}><Input size="large" onChange={(e) => { this.handleInputChangeCurrency(e) }} placeholder="Currency Value" value={this.state.valueCur} /></Col>
                        <Col span={4}>
                            <Select
                                size="large"
                                labelInValue
                                defaultValue={{ key: 'eur' }}
                                style={{ width: 120 }}
                                onChange={this.handleChange}
                            >
                                <Option value="eur">EUR</Option>
                                <Option value="usd">USD</Option>
                                <Option value="aud">AUD</Option>
                                <Option value="nzd">NZD</Option>
                                <Option value="gbp">GBP</Option>
                            </Select>
                        </Col>
                    </Row>
                </Card>
            </Layout>
        )
    }
}

const mapPropsToState = (state) => {
    return {
        tobtc: state.app.tobtc
    }
}

export default connect(mapPropsToState, { fetchToBtc })(Converter)