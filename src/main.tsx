import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SubscribeDevProvider } from '@subscribe.dev/react'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SubscribeDevProvider>
      <App />
    </SubscribeDevProvider>
  </StrictMode>,
)
