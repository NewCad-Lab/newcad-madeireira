  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import './styles/global.css'
  import {Home} from './pages/Home'
  import { Terrain } from './pages/Home/index' 

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <div className='flex-container'>
      <Terrain />
      <Home />
      </div>
    </StrictMode>,
  )
