import React from 'react';
import Layout from '../layouts/Layout'
import { Row, Col } from 'antd';
import { connect } from 'react-redux'
import ChartComponent from '../components/Chart'

class Chart extends React.Component {

    render() {
        return (
            <Layout title="Charts">
                <Row gutter={24}>
                    <Col span={12}>
                        <ChartComponent
                            mode="dailytrans"
                            timespan={100}
                        />
                    </Col>
                    <Col span={12}>
                        <ChartComponent
                            mode="totaltrans"
                            timespan={30}
                        />
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

export default connect(mapPropsToState, {})(Chart)