import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>    
    <GoogleOAuthProvider clientId="860112823314-i0v9u2snsmojhoehsl6st4t2360hu4ec.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>,
);
