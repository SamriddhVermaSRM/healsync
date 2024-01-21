import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from './Home.js';
import Chat from './Chat.js';
import Aboutus from './About.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path='/chat' Component={Chat} />
        <Route path='/about' Component={Aboutus} />
      </Routes>
    </Router>
  </React.StrictMode>
);
