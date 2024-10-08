
import { createRoot } from 'react-dom/client'
import React, { StrictMode, useState } from 'react';
import './styles/global.css'
import { Home } from './pages/Home'

import { NightSystem } from './pages/Home/index';


function App() {

  return (
    <div>
      <NightSystem />
      <Home />
    </div>
  );
  
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> { }
  </StrictMode>,
);
