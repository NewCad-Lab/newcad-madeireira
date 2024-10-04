
  import { createRoot } from 'react-dom/client'
  import React, { StrictMode, useState } from 'react';
  import './styles/global.css'
  import {Home} from './pages/Home'
  import { Terrain } from './pages/Home/index' 

function App() {
  const [field, setField] = useState(new Map());

  
  return (
    <div className='flex-container'>
      <Terrain field={field} />
      <Home field={field} setField={setField} /> 
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {}
  </StrictMode>,
);
