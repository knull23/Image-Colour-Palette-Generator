// frontend/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/styles.css';  // Import the global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
