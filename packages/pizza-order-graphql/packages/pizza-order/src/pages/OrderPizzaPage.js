import React from 'react'
import { mapProps, lifecycle, compose } from 'recompose'
import idx from 'idx'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import OrderForm from '../components/OrderForm/OrderForm'
import { withPizzaSizes, initPizzas } from '../redux/modules/pizza'

const enhance = compose(
  connect(
    state => ({}),
    bindActionCreators.bind(null, {
      initPizzas,
    }),
  ),
  mapProps(props => props),
  withPizzaSizes,
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const { data: { error, loading, pizzaSizes }, initPizzas } = nextProps
      if (error) return
      if (idx(this.props, _ => _.data.loading) && !loading) {
        if (!pizzaSizes) return
        initPizzas(pizzaSizes)
      }
    },
  }),
)

const OrderPizzaPage = ({ data: { error, loading } }) => {
  return (
    <div>
      <h1>Pizza Order</h1>
      <OrderForm type="small" />
    </div>
  )
}

export default enhance(OrderPizzaPage)
