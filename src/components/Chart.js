import React from 'react';
import { Line } from 'react-chartjs-2'
import { Card, Typography } from 'antd';
import { connect } from 'react-redux'
import { fetchChartData } from '../actions/index'

class Chart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataX: [],
            dataY: [],
            name: "",
            description: ""
        }
    }

    componentDidMount() {
        this.getChartData()
    }

    getChartData = () => {
        this.props.fetchChartData(this.props.mode, this.props.timespan).then((results) => {
            console.log(this.props.chartData.description)
            let dataX = []
            let dataY = []
            this.props.chartData.values.forEach((value) => {
                var date = new Date(value.x * 1000)
                dataX.push(date)
                dataY.push(value.y)
            })
            this.setState({ dataX, dataY, name: this.props.chartData.name, description: this.props.chartData.description })
        })
    }

    render() {

        const data = {
            labels: this.state.dataX,
            datasets: [
                {
                    label: this.state.name,
                    fill: false,
                    lineTension: 0.2,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: '#1a90fe',
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
            this.props.chartData &&
            <Card>
                <Typography.Title level={3}>{this.state.name}</Typography.Title>
                <Typography.Text>{this.state.description}</Typography.Text>
                <Line data={data} options={options} />
            </Card>
        )
    }
}

const mapPropsToState = (state) => {
    return {
        chartData: state.app.chartData
    }
}

export default connect(mapPropsToState, { fetchChartData })(Chart)