import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './aliados.css'
import App from './aliados.jsx'

createRoot(document.getElementById('main-content')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
