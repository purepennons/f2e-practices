import React, { Component } from 'react'

import './utils/fontawesome'
import { withContext } from './context'
import Application from './pages/Application'

import './styles/base.scss'

class Root extends Component {
  render() {
    return <Application />
  }
}

export default withContext(Root)