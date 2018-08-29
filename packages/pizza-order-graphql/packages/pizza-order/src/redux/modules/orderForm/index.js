import Immutable from 'immutable'
import createReducer from '@funnyfoo/create-reducer-redux'
/*
* ---------------- Other Exports -----------------
*/

/*
* ---------------- Action -----------------
*/
export const Types = {
  SET_FORM_INFO: 'SET_FORM_INFO',
  RESET_FORM_INFO: 'RESET_FORM_INFO',
  ADD_TOPPING: 'ADD_TOPPING',
  REMOVE_TOPPING: 'REMOVE_TOPPING',
  RESET_TOPPINGS: 'RESET_TOPPINGS',
  SET_FORM_NAME: 'SET_FORM_NAME',
}

/*
 * ---------------- Reducer -----------------
 */
export const Topping = Immutable.Record({
  name: '',
  price: 0,
})

export const Form = Immutable.Record({
  name: '',
  basePrice: 0,
  pickedToppings: [],
})

export const initialState = new Form()

export default createReducer(
  [
    [Types.SET_FORM_INFO, (state, { payload }) => state.merge(payload)],
    [Types.RESET_FORM_INFO, state => state.clear()],
    [
      Types.ADD_TOPPING,
      (state, { payload }) => {
        const { pickedToppings } = state
        const index = pickedToppings.findIndex(
          topping => topping.get('name') === payload.name,
        )

        if (index === -1) {
          return state.merge({
            pickedToppings: pickedToppings.push(new Topping(payload)),
          })
        }

        return state.merge({
          pickedToppings: pickedToppings.set(index, new Topping(payload)),
        })
      },
    ],
    [
      Types.REMOVE_TOPPING,
      (state, { payload }) =>
        state.merge({
          pickedToppings: state.pickedToppings.filter(
            topping => topping.get('name') !== payload.name,
          ),
        }),
    ],
    [Types.RESET_TOPPINGS, state => state.remove('pickedToppings')],
    [
      Types.SET_FORM_NAME,
      (state, { payload }) => state.merge({ name: payload.name }),
    ],
  ],
  initialState,
)

/*
 * ---------------- Action Creators -----------------
 */
export function setFormInfo({ name, basePrice, pickedToppings }) {
  return {
    type: Types.SET_FORM_INFO,
    payload: {
      name,
      basePrice,
      pickedToppings,
    },
  }
}

export function resetFormInfo() {
  return {
    type: Types.RESET_FORM_INFO,
  }
}

export function addTopping({ name, price }) {
  return {
    type: Types.ADD_TOPPING,
    payload: {
      name,
      price,
    },
  }
}

export function removeTopping({ name }) {
  return {
    type: Types.REMOVE_TOPPING,
    payload: {
      name,
    },
  }
}

export function resetPickedToppings() {
  return {
    type: Types.RESET_TOPPINGS,
  }
}

export function setFormName({ name }) {
  return {
    type: Types.SET_FORM_NAME,
    payload: {
      name,
    },
  }
}
