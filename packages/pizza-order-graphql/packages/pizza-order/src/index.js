import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider'

import App from './layouts/App'
import store from './redux/store/'
import * as serviceWorker from './serviceWorker'
import theme from './assets/toolbox/theme'
import client from './lib/initApollo'

import 'normalize.css'
import './styles/theme.css'
import './styles/index.css'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </ThemeProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
