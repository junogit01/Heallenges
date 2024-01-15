import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import '@assets/vendor/bootstrap/css/bootstrap.css';
import '@assets/vendor/bootstrap-icons/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// import '@assets/vendor/aos/aos.css';
// import '@assets/vendor/glightbox/css/glightbox.min.css';
// import '@assets/vendor/swiper/swiper-bundle.min.css';
// import '@assets/vendor/remixicon/remixicon.css';
// import '@assets/css/main.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
// router 세팅
import { BrowserRouter } from 'react-router-dom';

import { RecoilRoot } from 'recoil';

// axios.defaults.baseURL = 'http://heallenges.cafe24app.com/api';

axios.defaults.baseURL = 'http://localhost:8001/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
