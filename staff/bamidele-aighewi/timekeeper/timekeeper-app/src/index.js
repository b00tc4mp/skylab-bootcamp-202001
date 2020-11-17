import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import App from './components/App'
import { Provider } from './components/ContextProvider'
import { BrowserRouter as Router } from 'react-router-dom'

// ReactDOM.render(<Provider><Router><App /></Router></Provider>, document.getElementById('root'))
ReactDOM.render(<Router><Provider><App /></Provider></Router>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
