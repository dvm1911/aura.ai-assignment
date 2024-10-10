import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = "156424469641-d7fvkat6g4nc8brgctkvlb7j8v9ihaoo.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId}>
    <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
)
