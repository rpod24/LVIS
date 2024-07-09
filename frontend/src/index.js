import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import HomePage from './Pages/HomePage/HomePage';
import App from './app';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <head>
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
    </head>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
