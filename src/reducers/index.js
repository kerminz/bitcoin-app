import { combineReducers } from 'redux';

const INIT_STATES = {
    ticker: null,
    details: null,
    tobtc: null,
    chartData: null
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
        default:
            return state
    }
}

export default combineReducers({
    app: appReducer
})