import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './core/App';
import reportWebVitals from './reportWebVitals';
import Storage from 'core/services/back-end/Storage';
import { firstInit } from 'core/services/fistInit';
import '../src/styles/index.css';
import { BrowserRouter } from 'react-router-dom';
(async () => {
  await Storage.createObjectStore(['albums', 'photos']);
  firstInit();
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
})();
