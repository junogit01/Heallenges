import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import '@assets/vendor/bootstrap/css/bootstrap.css';
import '@assets/vendor/bootstrap-icons/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// router 세팅
import { BrowserRouter } from 'react-router-dom';

import { RecoilRoot } from 'recoil';

axios.defaults.baseURL = 'http://heallenges.cafe24app.com/api';

// axios.defaults.baseURL = 'http://localhost:8001/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <React.Suspense
          fallback={
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          }>
          <App />
        </React.Suspense>
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
