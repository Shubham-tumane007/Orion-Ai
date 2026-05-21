import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated this import
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ContextProvider from './context/Context';

// Target the root element
const container = document.getElementById('root');
const root = createRoot(container); // Use createRoot from the client import

root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);

reportWebVitals();