import { combineReducers } from 'redux';

const INIT_STATES = {
    ticker: null
}

const appReducer = (state = INIT_STATES, action) => {
    switch (action.type) {
        case 'FETCH_TICKER':
            return { ...state, ticker: action.payload }
        default:
            return state
    }
}

export default combineReducers({
    app: appReducer
})