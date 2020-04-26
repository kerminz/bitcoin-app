import React from 'react';
import Layout from '../layouts/Layout'
import { Table } from 'antd';
import { connect } from 'react-redux'
import { fetchTicker } from '../actions/index'
import Loader from '../components/Loader'
import MyWallet from '../components/MyWallet'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading: true
        }
    }

    componentDidMount() {
        this.props.fetchTicker().then((result) => {
            this.setState({ dataFetched: true })
            const keys = Object.keys(this.props.data.ticker)
            const values = Object.values(this.props.data.ticker)
            for (var i = 0; i < values.length; i++) {
                values[i] = { ...values[i], key: keys[i] }
            }
            this.setState({ data: values })
            setTimeout(() => {
                this.setState({ loading: false })
            }, 1000);
        })

    }


    render() {
        function onChange(pagination, filters, sorter, extra) {
            console.log('params', pagination, filters, sorter, extra);
        }

        const columns = [
            {
                title: 'Currency',
                dataIndex: 'key',
            },
            {
                title: 'Symbol',
                dataIndex: 'symbol',
            },
            {
                title: 'Recent',
                dataIndex: 'last',
                sorter: {
                    compare: (a, b) => a.last - b.last,
                    multiple: 2,
                },
            },
            {
                title: 'Buy',
                dataIndex: 'buy',
                sorter: {
                    compare: (a, b) => a.buy - b.buy,
                    multiple: 1,
                },
            },
            {
                title: 'Sell',
                dataIndex: 'sell',
                sorter: {
                    compare: (a, b) => a.sell - b.sell,
                    multiple: 1,
                },
            }
        ];

        return (
            <Layout title="Dashboard" cta={<MyWallet />}>
                {!this.state.loading ? <Table columns={columns} dataSource={this.state.data} onChange={onChange} /> : <Loader />}
            </Layout>
        )
    }
}

const mapPropsToState = (state) => {
    return {
        data: state.app
    }
}

export default connect(mapPropsToState, { fetchTicker })(Dashboard)