import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Drawer, Divider } from 'antd';
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
    }

    handleSave = (e) => {
        if (e.target.name === "save" && this.props.values.wallet.length !== 0 && !this.props.errors.wallet) {
            const walletValue = parseFloat(this.props.values.wallet.replace(',', '.').replace(' ', ''))
            console.log(walletValue)
            Notification('Amount has been added successfully', `BTC Amount: "${this.props.values.wallet}" has been saved successfully.`, 'success')
            this.setState({ visible: false })
            this.props.values.wallet = ""
        }
    }

    render() {
        return (
            <div>
                <Button type="primary" size="large" onClick={this.handleOpen}>
                    <PlusOutlined /> Add Bitcoins
                </Button>
                <Drawer
                    title="Add Bitcoins"
                    width="40vw"
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
                    <Divider />
                    <div style={{ position: "absolute", right: "0", marginRight: "1rem" }}>
                        <Button name="cancel" size="large" onClick={this.handleClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button name="save" size="large" onClick={this.handleSave} type="primary">
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
        wallet: Yup.string().test(
            'is-decimal',
            'invalid decimal',
            value => (value + "").match(/^[0-9]+(\,[0-9]{1,2})?$/),
        ).required('Bitcoin amount is required.')
    }),
    handleSubmit: () => {

    }
})

export default connect(mapPropsToState, {})(formik(AddToWallet))