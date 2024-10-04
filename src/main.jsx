
  import { createRoot } from 'react-dom/client'
  import './styles/global.css'
  import React, { StrictMode, useState } from 'react';
  import { Home, Terrain } from './pages/Home';

function App() {
  const [field, setField] = useState(new Map());

  
  return (
    <div className='flex-container'>
      <Terrain field={field} /> {}
      <Home setField={setField} /> {}
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {}
  </StrictMode>,
);
