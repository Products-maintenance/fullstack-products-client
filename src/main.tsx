import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Esta es la manera de conectar main con nuestro router */}
    <RouterProvider router={router} /> 
  </StrictMode>,
)
