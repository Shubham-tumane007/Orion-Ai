import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter } from 'react-router-dom';
import ContextProvider from './context/Context';

const router=createBrowserRouter([
  {
    element: <App/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ContextProvider>

<App />

  </ContextProvider>

);

reportWebVitals();
