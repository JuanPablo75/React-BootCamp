import React from 'react';
import ReactDOM from 'react-dom/client';
//import OldApp from './OldApp';
import reportWebVitals from './reportWebVitals';
import Old2App from './Old2App';
import App from './App'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Old2App />
  </React.StrictMode>
);

reportWebVitals();
