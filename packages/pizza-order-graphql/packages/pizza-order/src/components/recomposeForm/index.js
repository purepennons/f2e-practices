import isPromise from 'is-promise'
import _fp from 'lodash/fp'
import { PureComponent } from 'react'
import createEagerFactory from 'recompose/createEagerFactory'
import wrapDisplayName from 'recompose/wrapDisplayName'

export const normalChangeEventReader = event => event.target.value

const mapFieldNames = _fp.map(fieldNameLike => {
  if (_fp.isObject(fieldNameLike)) {
    return fieldNameLike
  }
  return {
    fieldName: fieldNameLike,
    valueFromChangeEvent: normalChangeEventReader,
  }
})

const createFieldListHandlers = _fp.reduce(
  (acc, { fieldName, valueFromChangeEvent }) => {
    const fieldNameUpperFirst = _fp.upperFirst(fieldName)

    return _fp.mergeAll([
      acc,
      {
        state: {
          meta: {
            [fieldName]: {
              touched: false,
              error: null,
            },
          },
        },
        handlers: {
          [`on${fieldNameUpperFirst}Change`](...args) {
            const value = valueFromChangeEvent(...args)
            const nextValues = {
              ...this.props.values,
              [fieldName]: value,
            }

            this.props.onChange(nextValues)
            const nextState = this.validateFields(nextValues)
            this.setState(state =>
              _fp.mergeAll([
                state,
                nextState,
                {
                  meta: {
                    [fieldName]: {
                      touched: true,
                    },
                  },
                },
              ]),
            )
          },
        },
      },
      {},
    ])
  },
  {
    state: {
      form: {
        pristine: true,
        valid: true,
        submitting: false,
        submitSucceed: false,
      },
    },
    handlers: {
      handleSubmit(event) {
        event.preventDefault()
        event.stopPropagation()

        const nextState = this.validateFields()
        this.setState(state => _fp.mergeAll([state, nextState]))
        if (!nextState.form.valid) {
          return
        }
        const result = this.props.onSubmit(this.props.values)
        if (!isPromise(result)) {
          return
        }
        this.handleSubmitting()
        result.then(this.handleSubmitSucceed, this.handleSubmitFailed)
      },
    },
  },
)

/*
 * An HOC that provides various form handlers/props to BaseComponent.
 * Given the fields = ['name'], we will get:
 *
 * 1. form state:
 *   props.form = {
        valid: PropTypes.bool
        pristine: PropTypes.bool
        submitting: PropTypes.bool
        submitSucceed: PropTypes.bool
     }
     props.handleSubmit: a callback that should be passed into:
       <form onSubmit={props.handleSubmit} />
 * 2. field state:
     props.meta.name = {
       touched: PropTypes.bool
       error: PropTypes.any
     }
     props.onChangeName: a callback that should be passed into:
       <input onChange={props.onChangeName} />
 *
 * The valid/error properties reflects the result of calling `validate(values)`.
 * By default, onChangeName will reads input value from `event.target.value`.
 * If your change handler does differently, customize it when initializing recomposeForm:
 *
     recomposeForm = ({
       fields: [{
         fieldName: 'siteId',
         valueFromChangeEvent: it => it.value
       }],
       validate
     })
 */
const recomposeForm = ({
  fields: fieldNameLikeList,
  validate,
}) => BaseComponent => {
  const fieldNameList = mapFieldNames(fieldNameLikeList)
  const factory = createEagerFactory(BaseComponent)

  return class extends PureComponent {
    static displayName = wrapDisplayName(BaseComponent, 'recomposeForm')

    constructor(...args) {
      super(...args)

      const { state, handlers } = createFieldListHandlers(fieldNameList)
      this.state = state
      this.handlers = _fp.mapValues(_fp.bind(_fp.placeholder, this), handlers)
    }

    componentWillUnmount() {
      this.handleFormStateChange = _fp.noop
    }

    validateFields = (values = this.props.values) => {
      const errors = validate(values, this.props)

      const meta = _fp.reduce(
        (acc, { fieldName }) => {
          const error = errors[fieldName]
          if (error) {
            return {
              ...acc,
              [fieldName]: {
                error,
              },
            }
          }
          return {
            ...acc,
            [fieldName]: {
              error: null,
            },
          }
        },
        {},
        fieldNameList,
      )

      return {
        meta,
        form: {
          pristine: false,
          valid: _fp.isEmpty(errors),
        },
      }
    }

    handleFormStateChange = form =>
      this.setState(state => _fp.mergeAll([state, { form }]))

    handleSubmitting = () => {
      this.handleFormStateChange({
        submitting: true,
      })
    }

    handleSubmitSucceed = () => {
      this.handleFormStateChange({
        pristine: true,
        submitting: false,
        submitSucceed: true,
      })
    }

    handleSubmitFailed = () => {
      this.handleFormStateChange({
        valid: false,
        submitting: false,
        submitSucceed: false,
      })
    }

    render() {
      return factory({
        ...this.props,
        ...this.state,
        ...this.handlers,
      })
    }
  }
}

export default recomposeForm
