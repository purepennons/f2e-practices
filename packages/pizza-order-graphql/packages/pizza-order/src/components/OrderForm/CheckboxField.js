import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox'
import { identity } from 'lodash/core'
import { withStateHandlers, compose } from 'recompose'
import shortid from 'shortid'
import styled from 'styled-components'

const getCheckedCounts = list =>
  Object.keys(list).reduce((acc, item) => acc + parseInt(+!!list[item], 10), 0)

/*
 * ---------------- Enhancer -----------------
 */
const enhance = compose(
  withStateHandlers(() => ({ lastChecked: '' }), {
    onCheckboxChange: (_, { onChange = identity }) => (
      field,
      topping,
      checkState,
    ) => {
      if (onChange) onChange(field, checkState, topping)
      return {
        lastChecked: field,
      }
    },
  }),
)

/*
 * ---------------- Styled Components -----------------
 */
const StyledCheckbox = styled(Checkbox)`
  div {
    margin-right: 10px;
  }
`
/*
 * ---------------- Main Component -----------------
 */
const CheckboxField = ({
  toppings,
  checkedList,
  maxToppings,
  lastChecked,
  onCheckboxChange,
}) => {
  return toppings.map(topping => {
    const { name, price } = topping
    return (
      <StyledCheckbox
        key={shortid.generate()}
        checked={checkedList[name]}
        onChange={onCheckboxChange.bind(this, name, topping)}
        disabled={
          getCheckedCounts(checkedList) >= maxToppings && lastChecked !== name
        }
      >
        {name} (+{price})
      </StyledCheckbox>
    )
  })
}

CheckboxField.propTypes = {
  toppings: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
    }),
  ),
  checkedList: PropTypes.object,
  maxToppings: PropTypes.number,
  onChange: PropTypes.func,
}

CheckboxField.defaultProps = {
  toppings: [],
  checkedList: {},
  maxToppings: Infinity,
}

export default enhance(CheckboxField)
