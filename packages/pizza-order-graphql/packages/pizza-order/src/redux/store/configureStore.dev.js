import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import reduxThunk from 'redux-thunk'
import Immutable from 'immutable'

import { rootReducer } from '../modules/'

const reduxLogger = createLogger({
  stateTransformer: state =>
    Immutable.Iterable.isIterable(state) ? state.toJS() : state,
})

const middleware = applyMiddleware(reduxThunk, reduxLogger)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(rootReducer, undefined, composeEnhancers(middleware))
