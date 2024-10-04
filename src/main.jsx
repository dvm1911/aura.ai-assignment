import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = "453687433752-p0jqss0kno5dliieoh98bl1gvfp8euea.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={clientId}>
    <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
)
