import { graphql } from 'react-apollo'
import { GET_ALL_PIZZA_SIZES } from './gql'

export const withPizzaSizes = graphql(GET_ALL_PIZZA_SIZES, {})
