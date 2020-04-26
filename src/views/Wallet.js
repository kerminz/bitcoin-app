import React from 'react';
import Layout from '../layouts/Layout'
import AddToWallet from '../components/AddToWallet'

class Wallet extends React.Component {

    render() {
        return (
            <Layout title="My Wallet" cta={<AddToWallet />}>
                BC Wallet
            </Layout>
        )
    }
}

export default Wallet