import React from 'react';
import ReactDOM from 'react-dom/client';


import CountersApp from './CountersApp';
import OpinionCounter from './OpinionCounter';
import ClickCounter from './ClickCounter';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClickCounter />
    <OpinionCounter />
    <CountersApp />
  </React.StrictMode>
);


