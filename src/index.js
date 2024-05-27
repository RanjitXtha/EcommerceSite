import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UsersContextProvider } from './cartContext/userContext.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <UsersContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </UsersContextProvider>
);

reportWebVitals();
