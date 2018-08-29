import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import OrderPizzaPage from '../pages/OrderPizzaPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={OrderPizzaPage} />
            <Route path="*" render={() => <div>Not Found</div>} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
