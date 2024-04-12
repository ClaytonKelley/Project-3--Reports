import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {GoogleProvider} from './Components/GoogleContext'
import {ReportProvider} from './Components/ReportContext'

import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>

    <GoogleProvider>
    <ReportProvider>
    <GoogleOAuthProvider clientId="860112823314-i0v9u2snsmojhoehsl6st4t2360hu4ec.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    </ReportProvider>
    </GoogleProvider>
  </BrowserRouter>,
);
