import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import './i18n';

ReactDOM.render(
  <Suspense fallback={<div>Loading</div>}>
    <Router>
      <App />
    </Router>
  </Suspense>,
  document.getElementById('root')
);
