
  import { createRoot } from 'react-dom/client'
  import './styles/global.css'
<<<<<<< HEAD
  import React, { StrictMode, useState } from 'react';
  import { Home, Terrain } from './pages/Home';
=======
  import {Home} from './pages/Home'
  import { Terrain } from './pages/Home/index' 
>>>>>>> 6f80c8d7e5e5bf71b3a1423fbcbd17006180ebb2

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
