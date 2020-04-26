import React from 'react'
import Layout from '../layouts/Layout'
import { connect } from 'react-redux'
import { Card, Row, Col, Input, Select, Typography } from 'antd'
import { fetchToBtc } from '../actions/index'
import validator from 'validator'
import MyWallet from '../components/MyWallet'

class Converter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            valueBtc: 0,
            valueCur: 0,
            error: "",
            currency: "",
            exchangeRate: 0
        }
    }

    handleChange = (value) => {
        this.updateExchangeRate(value.value)
    }

    componentDidMount() {
        this.updateExchangeRate("eur")
    }

    updateExchangeRate = (currency) => {
        this.setState({ currency })
        this.props.fetchToBtc(currency, 1).then((result) => {
            this.handleInputChangeBTC(undefined, this.state.valueBtc.toString())
            this.handleInputChangeCurrency(undefined, this.state.valueCur.toString())
        })
    }

    handleInputChangeBTC = (e, fallbackValue) => {
        if (e === undefined) {
            var amount = fallbackValue
        } else {
            var amount = e.target.value
        }

        this.setState({ valueBtc: amount })
        if (validator.isNumeric(amount)) {
            const valueCur = amount / this.props.tobtc
            this.setState({ valueCur: valueCur.toFixed(2), error: "" })
        } else {
            this.setState({ error: "Only numeric values allowed" })
        }
    }

    handleInputChangeCurrency = (e, fallbackValue) => {
        if (e === undefined) {
            var amount = fallbackValue
        } else {
            var amount = e.target.value
        }
        this.setState({ valueCur: amount })
        if (validator.isNumeric(amount)) {
            this.setState({ valueBtc: this.props.tobtc * amount, error: "" })
        } else {
            this.setState({ error: "Only numeric values allowed" })
        }
    }

    render() {
        const { Option } = Select

        return (
            <Layout title="Converter" cta={<MyWallet />}>
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
                    <Row>
                        {this.state.error && <Typography.Text type="danger">Invalid input. Only numeric values allowed.</Typography.Text>}
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