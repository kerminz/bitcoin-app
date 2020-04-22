import axios from 'axios';

export const blockchainBasic = axios.create({
    baseURL: 'https://blockchain.info'
})

export const blockchainChart = axios.create({
    baseURL: 'https://api.blockchain.info/charts/'
})