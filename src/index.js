import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
/* in index.js */
import 'bootstrap/dist/css/bootstrap.css';
// import './style.css'; // import your stylesheet afterwards

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
