import React from 'react'
import { createRoot } from 'react-dom/client'

import {
  Provider
} from 'react-redux'

import {
  BrowserRouter,
  HashRouter,
} from 'react-router'

// Should be imported before first access to the reducers
// import { store } from './store'

// Import components
import { CONFIG } from './config'
import { App } from './components/App'

let Router = BrowserRouter
if (CONFIG.AP_ACCOUNT_ENVIRONMENT === 'github') {
  Router = HashRouter
}

const containerRoot = document.getElementById('reactroot')!
const root = createRoot(containerRoot)

root.render(
  <App />
)
