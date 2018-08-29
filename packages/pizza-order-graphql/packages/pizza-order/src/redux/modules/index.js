import Immutable from 'immutable'
import { combineReducers } from 'redux-immutable'

import orderForm from './orderForm'
import pizza from './pizza'

const appReducer = combineReducers({
  orderForm,
  pizza,
})

const App = Immutable.Record({
  orderForm: undefined,
  pizza: undefined,
})

const initialState = new App()

export function rootReducer(state = initialState, action) {
  return appReducer(state, action)
}
