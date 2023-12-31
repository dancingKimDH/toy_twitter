import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import { AuthContextProvider } from 'pages/components/context/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </AuthContextProvider>
);

