import React from 'react'
import idx from 'idx'
import { bindActionCreators } from 'redux'
import {
  lifecycle,
  mapProps,
  withHandlers,
  withStateHandlers,
  compose,
} from 'recompose'
import { connect } from 'react-redux'
import styled from 'styled-components'
import RadioGroup from 'react-toolbox/lib/radio/RadioGroup'
import RadioButton from 'react-toolbox/lib/radio/RadioButton'

import { PizzaSize } from '../../redux/modules/pizza'
import {
  setFormInfo,
  resetFormInfo,
  addTopping,
  removeTopping,
  resetPickedToppings,
} from '../../redux/modules/orderForm'

import CheckboxField from './CheckboxField'

const emptyPizza = new PizzaSize()

function getTotal(pickedToppings, basePrice = 0) {
  const total = pickedToppings.reduce(
    (acc, topping) => acc + Number(topping.price),
    Number(basePrice),
  )
  return Number(total).toFixed(2)
}

/*
 * ---------------- Enhancer -----------------
 */
const enhance = compose(
  connect(
    state => ({
      pizzas: state.pizza.toJS(),
      orderForm: state.orderForm.toJS(),
    }),
    bindActionCreators.bind(null, {
      setFormInfo,
      resetFormInfo,
      addTopping,
      removeTopping,
      resetPickedToppings,
    }),
  ),
  mapProps(({ orderForm, pizzas, ...rest }) => {
    const sizes = Object.keys(pizzas)
    const pizza = pizzas[orderForm.name] || emptyPizza.toJS()

    return {
      ...rest,
      ...pizza,
      orderForm,
      pizza,
      sizes,
      toppings: pizza.toppings.map(({ topping, ...r }) => ({
        ...r,
        ...topping,
      })),
    }
  }),
  withHandlers({
    getDefaultFormInfo: () => ({ pizza }) => ({
      name: pizza.name,
      basePrice: pizza.basePrice,
      pickedToppings: pizza.toppings
        .filter(topping => topping.defaultSelected)
        .map(({ topping }) => ({
          name: idx(topping, _ => _.name),
          price: idx(topping, _ => _.price),
        })),
    }),
  }),
  withStateHandlers(
    ({ orderForm }) => ({
      values: {
        checkedList: {},
        pizzaSize: orderForm.name,
      },
    }),
    {
      onStateReset: ({ values }, { toppings, orderForm }) => () => {
        const checkedList = toppings.reduce((acc, topping) => {
          const { name, defaultSelected } = topping
          if (!name) return acc
          acc[name] = !!defaultSelected
          return acc
        }, {})

        return {
          values: {
            ...values,
            checkedList,
            pizzaSize: orderForm.name,
          },
        }
      },
      onCheckboxChange: ({ values }, { addTopping, removeTopping }) => (
        field,
        value,
        topping,
      ) => {
        const { checkedList } = values
        const { name, price } = topping
        if (value) {
          addTopping({ name, price })
        } else {
          removeTopping({ name })
        }

        return {
          values: {
            ...values,
            checkedList: { ...checkedList, [field]: value },
          },
        }
      },
      onRadioChange: ({ values }, { orderForm, setFormInfo }) => value => {
        setFormInfo({ ...orderForm, name: value })
        return {
          values: {
            ...values,
            pizzaSize: value,
          },
        }
      },
    },
  ),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const {
        orderForm,
        pizza,
        getDefaultFormInfo,
        onStateReset,
        setFormInfo,
      } = nextProps
      if (orderForm.name !== this.props.orderForm.name) {
        onStateReset()
        setFormInfo(getDefaultFormInfo({ pizza }))
      }
    },
  }),
)

/*
 * ---------------- Styled Components -----------------
 */
const PizzaInfo = styled.div`
  p {
    span {
      margin-left: 10px;
    }
  }
`

/*
 * ---------------- Main Component -----------------
 */
const OrderForm = ({
  sizes,
  orderForm,
  toppings,
  maxToppings,
  values,
  onCheckboxChange,
  onRadioChange,
}) => {
  const { name, pickedToppings, basePrice } = orderForm
  return (
    <form>
      <h2>Overview:</h2>
      <PizzaInfo>
        <p>
          <span>
            <strong>Size: </strong>
            {name.toUpperCase()}
          </span>
          <span>
            <strong>Toppings: </strong>
            {pickedToppings.length}/{maxToppings || 'unlimited'}
          </span>
          <span>
            <strong>Base price: </strong>${basePrice}
          </span>
          <span>
            <strong>Total: </strong>${getTotal(pickedToppings, basePrice)}
          </span>
        </p>
      </PizzaInfo>
      <h2>Size:</h2>
      <fieldset>
        <RadioGroup
          name="pizza-sizes"
          value={values.pizzaSize}
          onChange={onRadioChange}
        >
          {sizes.map(size => (
            <RadioButton key={size} label={size.toUpperCase()} value={size} />
          ))}
        </RadioGroup>
      </fieldset>
      <h2>Toppgins:</h2>
      <fieldset>
        <CheckboxField
          toppings={toppings}
          checkedList={values.checkedList}
          onChange={onCheckboxChange}
          maxToppings={maxToppings || Infinity}
        />
      </fieldset>
    </form>
  )
}

export default enhance(OrderForm)
