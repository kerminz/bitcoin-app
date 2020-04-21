import React from 'react';
import Layout from '../layouts/Layout'
import { Card, Row, Col, Input, Select, Typography } from 'antd';

class Converter extends React.Component {

    handleChange = (value) => {
        console.log(value)
    }

    handleInputChange = (value) => {
        console.log(value.target.value)
    }

    render() {
        const { Option } = Select



        return (
            <Layout title="Converter">
                <Card style={{ backgroundColor: "#f2f5fa", width: "900px", margin: "auto" }}>
                    <Typography.Paragraph>Bitcoin Calculator tool allows you to convert any amount to and from bitcoin.</Typography.Paragraph>
                    <br />
                    <Row gutter={[24, 24]}>
                        <Col span={8}><Input size="large" onChange={(e) => { this.handleInputChange(e) }} placeholder="BTC" /></Col>
                        <Col span={2}>x BTC =</Col>
                        <Col span={10}><Input size="large" placeholder="Currency Value" /></Col>
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

export default Converter