import { blockchainChart, blockchainBasic } from '../apis/blockchain';
import history from '../history';

export const fetchTicker = () => {
    return async (dispatch) => {
        try {
            const response = await blockchainBasic.get('/ticker')
            dispatch({ type: 'FETCH_TICKER', payload: response.data })
        } catch (e) {
            console.log(e)
        }
    }
}

export const fetchDetails = () => {
    return async (dispatch) => {
        try {
            const responseMarketcap = await blockchainBasic.get('/q/marketcap')
            const responseTotalbc = await blockchainBasic.get('/q/totalbc')
            const response24hrtransactioncount = await blockchainBasic.get('/q/24hrtransactioncount')
            const response24hrbtcsent = await blockchainBasic.get('/q/24hrbtcsent')
            const responseHashrate = await blockchainBasic.get('/q/hashrate')
            const responseGetdifficulty = await blockchainBasic.get('/q/getdifficulty')

            const divider = 100000000
            const data = {
                marketcap: responseMarketcap.data,
                totalbc: responseTotalbc.data / divider,
                trans24h: response24hrtransactioncount.data,
                hrbt24h: response24hrbtcsent.data / divider,
                hashrate: responseHashrate.data,
                diff: responseGetdifficulty.data
            }
            dispatch({ type: 'FETCH_DETAILS', payload: data })
        } catch (e) {
            console.log(e)
        }
    }
}

export const fetchToBtc = (currency, amount) => {
    return async (dispatch) => {
        try {
            const response = await blockchainBasic.get(`/tobtc?currency=${currency}&value=${amount}`)
            dispatch({ type: 'FETCH_TOBTC', payload: response.data })
        } catch (e) {
            console.log(e)
        }
    }
}

export const fetchChartData = () => {
    return async (dispatch) => {
        try {
            const response = await blockchainChart.get(`n-transactions?timespan=30days&sampled=true&metadata=false&cors=true&format=json`)
            dispatch({ type: 'FETCH_CHART_DATA', payload: response.data })
        } catch (e) {
            console.log(e)
        }
    }
}