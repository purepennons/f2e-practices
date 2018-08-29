```js
const ThemeProvider = require('react-toolbox/lib/ThemeProvider').default
const theme = require('../../assets/toolbox/theme.js')
const toppings = [
  {
    name: 'pepperoni',
    price: 0.4,
  },
  {
    name: 'bannana peps',
    price: 0.89,
  },
  {
    name: 'sausage',
    price: 1.29,
  },
]
const maxToppings = 2

initialState = {
  checkedList: {
    sausage: true,
  },
}
;<ThemeProvider theme={theme}>
  <div>
    <p>maxToppings = {maxToppings}</p>
    <CheckboxField
      toppings={toppings}
      maxToppings={maxToppings}
      checkedList={state.checkedList}
      onChange={(field, value, topping) =>
        setState(({ checkedList }) => ({
          checkedList: { ...checkedList, [field]: value },
        }))
      }
    />
  </div>
</ThemeProvider>
```
