import React from 'react';
import Layout from '../layouts/Layout'
import { Line } from 'react-chartjs-2'
import { Card, Row, Col } from 'antd';
import { connect } from 'react-redux'
import { fetchChartData } from '../actions/index'


class Chart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataX: [],
            dataY: []
        }
    }

    componentDidMount() {
        this.getChartData()
    }

    getChartData = () => {
        this.props.fetchChartData().then((results) => {
            let dataX = []
            let dataY = []
            this.props.chartData.values.forEach((value) => {
                var date = new Date(value.x * 1000)
                dataX.push(date)
                dataY.push(value.y)
            })
            this.setState({ dataX, dataY })
        })
    }

    render() {

        const data = {
            labels: this.state.dataX,
            datasets: [
                {
                    label: 'Confirmed Transactions Per Day',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.dataY
                }
            ]
        };

        const options = {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Transactions'
                    }
                }],
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    distribution: 'series',
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }],
            }
        }

        return (
            <Layout title="Charts">
                <Row gutter={24}>
                    <Col span={12}>
                        <Card>
                            <Line data={data} options={options} />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Line data={data} options={options} />
                        </Card>
                    </Col>
                </Row>

            </Layout>
        )
    }
}

const mapPropsToState = (state) => {
    return {
        chartData: state.app.chartData
    }
}

export default connect(mapPropsToState, { fetchChartData })(Chart)