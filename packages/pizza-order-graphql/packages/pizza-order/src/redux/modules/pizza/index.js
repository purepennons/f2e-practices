import Immutable from 'immutable'
import createReducer from '@funnyfoo/create-reducer-redux'
import { setFormName } from '../orderForm/'
/*
* ---------------- Other Exports -----------------
*/
export * from './hoc'
export * from './gql'

/*
* ---------------- Action -----------------
*/
export const Types = {
  UPDATE_PIZZA_SIZES: 'UPDATE_PIZZA_SIZES',
}

/*
 * ---------------- Reducer -----------------
 */
export const Topping = Immutable.Record({
  name: '',
  price: 0,
})

export const PizzaToppingConnection = Immutable.Record({
  defaultSelected: false,
  topping: new Topping(),
})

export const PizzaSize = Immutable.Record({
  name: '',
  maxToppings: 0,
  basePrice: 0,
  toppings: [], // array of Topping
})

export const Pizza = Immutable.Map()

export const initialState = Pizza

export default createReducer(
  [
    [
      Types.UPDATE_PIZZA_SIZES,
      (state, { payload }) => {
        return state.withMutations(mutState => {
          payload.forEach(pizzaSize =>
            mutState.set(pizzaSize.name, new PizzaSize(pizzaSize)),
          )
        })
      },
    ],
  ],
  initialState,
)

/*
 * ---------------- Action Creators -----------------
 */
export function updatePizzaSizes(pizzaSizes) {
  return {
    type: Types.UPDATE_PIZZA_SIZES,
    payload: pizzaSizes,
  }
}

export function initPizzas(pizzaSizes) {
  return function(dispatch, getState) {
    dispatch(updatePizzaSizes(pizzaSizes))

    const { pizza } = getState()
    const sizes = Object.keys(pizza.toJS())
    if (sizes.length > 0) dispatch(setFormName({ name: sizes[0] }))
  }
}
