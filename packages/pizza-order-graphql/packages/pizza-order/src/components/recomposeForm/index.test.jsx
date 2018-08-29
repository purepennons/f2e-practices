import sinon from 'sinon'
import React from 'react'
import { shallow } from 'enzyme'
import recomposeForm from './index'

describe('recomposeForm module', () => {
  describe('recomposeForm HOC', () => {
    const initialValues = { name: '', email: '' }
    const validate = () => ({})
    const mockEvent = {
      preventDefault() {},
      stopPropagation() {},
    }

    it('should render WrappedComponent', () => {
      const DecoratedComponent = recomposeForm({
        fields: ['name', 'email'],
        validate,
      })(() => <div />)
      const ComponentWrapper = shallow(
        <DecoratedComponent values={initialValues} />,
      )

      expect(ComponentWrapper.find('div').length).toEqual(1)
    })

    it('should pass in form state from props', () => {
      let innerProps
      const DecoratedComponent = recomposeForm({
        fields: ['name', 'email'],
        validate,
      })(props => {
        innerProps = props
        return <div />
      })
      const ComponentWrapper = shallow(
        <DecoratedComponent values={initialValues} />,
      )

      expect(ComponentWrapper.find('div').length).toEqual(1)
      expect(innerProps.form).toEqual({
        pristine: true,
        valid: true,
        submitting: false,
        submitSucceed: false,
      })
    })

    it('should pass in field states from props', () => {
      let innerProps
      const DecoratedComponent = recomposeForm({
        fields: ['name', 'email'],
        validate,
      })(props => {
        innerProps = props
        return <div />
      })
      const ComponentWrapper = shallow(
        <DecoratedComponent values={initialValues} />,
      )

      expect(ComponentWrapper.find('div').length).toEqual(1)
      expect(innerProps.meta.name).toEqual({
        touched: false,
        error: null,
      })
      expect(innerProps.meta.email).toEqual({
        touched: false,
        error: null,
      })
    })

    it('should pass in form handlers from props', () => {
      let innerProps
      const DecoratedComponent = recomposeForm({
        fields: ['name', 'email'],
        validate,
      })(props => {
        innerProps = props
        return <div />
      })
      const ComponentWrapper = shallow(
        <DecoratedComponent values={initialValues} />,
      )

      expect(ComponentWrapper.find('div').length).toEqual(1)
      expect(typeof innerProps.handleSubmit).toBe('function')
    })

    describe('passing onSubmit with a function returning a resolved promise', () => {
      it('should update in form state from props', () => {
        let innerProps
        const DecoratedComponent = recomposeForm({
          fields: ['name', 'email'],
          validate,
        })(props => {
          innerProps = props
          return <div />
        })
        const ComponentWrapper = shallow(
          <DecoratedComponent
            values={initialValues}
            onSubmit={() => Promise.resolve()}
          />,
        )

        expect(ComponentWrapper.find('div').length).toEqual(1)
        expect(innerProps.form).toEqual({
          pristine: true,
          valid: true,
          submitting: false,
          submitSucceed: false,
        })
        expect(typeof innerProps.handleSubmit).toBe('function')
        innerProps.handleSubmit(mockEvent)

        expect(innerProps.form).toEqual({
          pristine: false,
          valid: true,
          submitting: true,
          submitSucceed: false,
        })

        return new Promise(resolve => setTimeout(resolve, 50)).then(() => {
          expect(innerProps.form).toEqual({
            pristine: true,
            valid: true,
            submitting: false,
            submitSucceed: true,
          })
        })
      })
    })

    describe('passing onSubmit with a function returning a rejected promise', () => {
      it('should update in form state from props', () => {
        let innerProps
        const DecoratedComponent = recomposeForm({
          fields: ['name', 'email'],
          validate,
        })(props => {
          innerProps = props
          return <div />
        })
        const ComponentWrapper = shallow(
          <DecoratedComponent
            values={initialValues}
            onSubmit={() => Promise.reject()}
          />,
        )

        expect(ComponentWrapper.find('div').length).toEqual(1)
        expect(innerProps.form).toEqual({
          pristine: true,
          valid: true,
          submitting: false,
          submitSucceed: false,
        })
        expect(typeof innerProps.handleSubmit).toBe('function')
        innerProps.handleSubmit(mockEvent)

        expect(innerProps.form).toEqual({
          pristine: false,
          valid: true,
          submitting: true,
          submitSucceed: false,
        })

        return new Promise(resolve => setTimeout(resolve, 50)).then(() => {
          expect(innerProps.form).toEqual({
            pristine: false,
            valid: false,
            submitting: false,
            submitSucceed: false,
          })
        })
      })
    })

    it('should pass in field handlers from props', () => {
      let innerProps
      const DecoratedComponent = recomposeForm({
        fields: ['name', 'email'],
        validate,
      })(props => {
        innerProps = props
        return <div />
      })
      const ComponentWrapper = shallow(
        <DecoratedComponent values={initialValues} />,
      )

      expect(ComponentWrapper.find('div').length).toEqual(1)
      expect(typeof innerProps.onNameChange).toBe('function')
      expect(typeof innerProps.onEmailChange).toBe('function')
    })

    it('should call onChange when fields are changed', () => {
      let innerProps
      const handleChange = sinon.spy()
      const DecoratedComponent = recomposeForm({
        fields: ['name', 'email'],
        validate,
      })(props => {
        innerProps = props
        return <div />
      })
      const ComponentWrapper = shallow(
        <DecoratedComponent values={initialValues} onChange={handleChange} />,
      )

      expect(ComponentWrapper.find('div').length).toEqual(1)
      expect(typeof innerProps.onNameChange).toBe('function')
      expect(handleChange.called).toBe(false)

      innerProps.onNameChange({
        target: { value: 'Akiya' },
      })
      expect(handleChange.called).toBe(true)
    })

    describe('calling onNameChange with valid value', () => {
      it('should update field states from props', () => {
        let innerProps
        const handleChange = values => ComponentWrapper.setProps({ values })
        const DecoratedComponent = recomposeForm({
          fields: ['name', 'email'],
          validate(values) {
            const errors = {}
            if (!values.name) {
              errors.name = 'Required'
            }
            return errors
          },
        })(props => {
          innerProps = props
          return <div />
        })
        const ComponentWrapper = shallow(
          <DecoratedComponent values={initialValues} onChange={handleChange} />,
        )

        expect(ComponentWrapper.find('div').length).toEqual(1)
        expect(innerProps.meta.name).toEqual({
          touched: false,
          error: null,
        })
        expect(typeof innerProps.onNameChange).toBe('function')

        innerProps.onNameChange({
          target: { value: 'Jeremy' },
        })
        expect(innerProps.meta.name).toEqual({
          touched: true,
          error: null,
        })
      })
    })

    describe('calling onNameChange with invalid value', () => {
      it('should update field states from props', () => {
        let innerProps
        const handleChange = values => ComponentWrapper.setProps({ values })
        const DecoratedComponent = recomposeForm({
          fields: ['name', 'email'],
          validate(values) {
            const errors = {}
            if (!values.name) {
              errors.name = 'Required'
            }
            return errors
          },
        })(props => {
          innerProps = props
          return <div />
        })
        const ComponentWrapper = shallow(
          <DecoratedComponent values={initialValues} onChange={handleChange} />,
        )

        expect(ComponentWrapper.find('div').length).toEqual(1)
        expect(innerProps.meta.name).toEqual({
          touched: false,
          error: null,
        })
        expect(typeof innerProps.onNameChange).toBe('function')

        innerProps.onNameChange({
          target: { value: '' },
        })
        expect(innerProps.meta.name).toEqual({
          touched: true,
          error: 'Required',
        })
      })
    })
  })
})
