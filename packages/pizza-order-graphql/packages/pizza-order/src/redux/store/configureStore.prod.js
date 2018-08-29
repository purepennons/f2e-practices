import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import { rootReducer } from '../modules/'

const middleware = applyMiddleware(reduxThunk)

export default createStore(rootReducer, undefined, middleware)
