import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import Dashboard from './views/Dashboard'
import BitcoinDetails from './views/BitcoinDetails'
import Converter from './views/Converter'
import Chart from './views/Chart'
import Wallet from './views/Wallet'

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/details" component={BitcoinDetails} />
          <Route exact path="/converter" component={Converter} />
          <Route exact path="/chart" component={Chart} />
          <Route exact path="/wallet" component={Wallet} />
        </Switch>
      </Router>
    )
  }
}

export default App;