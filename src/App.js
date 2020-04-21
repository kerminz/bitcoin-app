import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import Dashboard from './views/Dashboard'
import BitcoinDetails from './views/BitcoinDetails'

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/details" component={BitcoinDetails} />
        </Switch>
      </Router>
    )
  }
}

export default App;