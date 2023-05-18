import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/Header/Header.css';
import './components/Main/Main.css';
import './components/Footer/Footer.css';
import App from './App';
import { getProducts } from './utils';
getProducts();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <App />
  
);


