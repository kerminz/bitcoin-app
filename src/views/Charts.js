import React from 'react';
import Layout from '../layouts/Layout'
import { Row, Col } from 'antd';
import ChartComponent from '../components/Chart'
import MyWallet from '../components/MyWallet'

class Chart extends React.Component {

    render() {

        return (
            <Layout title="Charts" cta={<MyWallet />}>
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


export default Chart