import React from 'react'
import { connect } from 'react-redux'
import { updateWallet, fetchToBtc } from '../actions/index'

class MyWallet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            valueInEur: 0
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('wallet')) {
            var data = this.props.data.walletHistory
            localStorage.setItem('wallet', JSON.stringify(data))
        } else {
            var data = JSON.parse(localStorage.getItem('wallet')).reverse()
            this.props.updateWallet(data)
            this.getTotalValue(data)
            this.props.fetchToBtc("EUR", 1).then((result) => {
                const valueCur = this.state.total / this.props.data.tobtc
                this.setState({ valueInEur: valueCur.toFixed(2) })
            })
        }
    }

    getTotalValue = (data) => {
        let sum = 0
        data.forEach((dp) => {
            sum += dp.value
        })
        this.setState({ total: sum })
    }

    render() {
        return (
            <li className="ant-list-item">
                <div className="ant-list-item-meta">
                    <div className="ant-list-item-meta-avatar">
                        <span className="ant-avatar ant-avatar-circle ant-avatar-image">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" />
                        </span>
                    </div>
                    <div className="ant-list-item-meta-content">
                        <h2 className="ant-list-item-meta-title">Wallet</h2>
                        <div className="ant-list-item-meta-description"></div>
                    </div>
                </div>
                <div className="ant-row" style={{ width: 300, textAlign: "right" }}>
                    <div className="ant-col ant-col-16">
                        <h4 className="ant-typography" style={{ color: "rgb(0, 213, 152)" }}>
                            <strong>{this.state.total.toFixed(8)} BTC</strong>
                        </h4>
                    </div>
                    <div className="ant-col ant-col-16" style={{ marginTop: "-0.6rem" }}>
                        <span className="ant-typography ant-typography-secondary">
                            = {this.state.valueInEur} EUR
                        </span>
                    </div>
                </div>
            </li>
        )
    }
}

const mapPropsToState = (state) => {
    return {
        data: state.app
    }
}

export default connect(mapPropsToState, { updateWallet, fetchToBtc })(MyWallet)