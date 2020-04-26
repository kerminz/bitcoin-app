import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input } from "formik-antd";
import Notification from './Notification'

class AddToWallet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            visible: false
        }
    }


    handleOpen = () => this.setState({ visible: true })

    handleClose = (e) => {
        this.setState({ visible: false })
        if (e.target.name === "save" && this.props.values.wallet.length !== 0) {
            Notification('Amount has been added successfully', `BTC Amount: "${this.props.values.wallet}" has been saved successfully.`, 'success')
        }
    }

    handleChange = (e, { value }) => this.setState({ domain: value })

    render() {
        return (
            <div>
                <Button type="primary" size="large" onClick={this.handleOpen}>
                    <PlusOutlined /> Add BTC
                </Button>
                <Drawer
                    title="Add Bitcoins"
                    width="30vw"
                    onClose={this.handleClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form>
                        <Form.Item name="wallet" label="Bitcoin Amount">
                            <Input
                                name="wallet"
                                margin="normal"
                                placeholder="Bitcoin amount"
                                size="large"
                            />
                        </Form.Item>
                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button name="cancel" onClick={this.handleClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button name="save" onClick={this.handleClose} type="primary">
                            Add to wallet
                         </Button>
                    </div>
                </Drawer>
            </div>
        )
    }
}

const mapPropsToValues = ({ wallet }) => {
    return {
        wallet: wallet || ''
    }
}

const mapPropsToState = (state) => {
    return {
        //account: state.account.isAuthenticated
    }
}

const formik = withFormik({
    mapPropsToValues,
    validationSchema: Yup.object().shape({
        wallet: Yup.string().max(250).required('Bitcoin amount is required.')
    }),
    handleSubmit: () => {

    }
})

export default connect(mapPropsToState, {})(formik(AddToWallet))