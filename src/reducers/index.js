import { combineReducers } from 'redux';

const INIT_STATES = {
    ticker: null,
    details: null,
    tobtc: null,
    chartData: null,
    walletHistory: [
        { name: "Bitcoin", value: 10.22, time: "Sun Apr 26 2020 16:25:47 GMT+0200 (Central European Summer Time)" },
        { name: "Bitcoin", value: 13.22, time: "Sun Apr 14 2020 16:25:47 GMT+0200 (Central European Summer Time)" },
    ]
}

const appReducer = (state = INIT_STATES, action) => {
    switch (action.type) {
        case 'FETCH_TICKER':
            return { ...state, ticker: action.payload }
        case 'FETCH_DETAILS':
            return { ...state, details: action.payload }
        case 'FETCH_TOBTC':
            return { ...state, tobtc: action.payload }
        case 'FETCH_CHART_DATA':
            return { ...state, chartData: action.payload }
        case 'WALLET_HISTORY':
            return { ...state, walletHistory: action.payload }
        default:
            return state
    }
}

export default combineReducers({
    app: appReducer
})