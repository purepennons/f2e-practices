import gql from 'graphql-tag'

export const GET_ALL_PIZZA_SIZES = gql`
  query getAllPizzaSizes {
    pizzaSizes {
      name
      maxToppings
      basePrice
      toppings {
        defaultSelected
        topping {
          name
          price
        }
      }
    }
  }
`
