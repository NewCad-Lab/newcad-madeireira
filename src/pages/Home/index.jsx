import React, { useState } from 'react';
import './styles.css'
import { buySeed } from './buttons';
import { fastFoward } from './buttons';

 export function Home() {
  const [seeds, setSeeds] = useState(3);
  const [buySeeds, setBuySeeds] = useState({seeds})


  return (
   <main>
    <div className='container'>

      <div className='container-buttons'>
        <div className='button-item'>
          <button id="button" className='button-seed' >
            <img className='imagem' src="https://www.svgrepo.com/show/130645/seeds.svg" alt="Seed" />
          </button>
        <p>Quantidade de sementes: {seeds}</p>
        </div>

        <div className='button-item'>
          <button id="button" className='button-chop' onClick={() => setSeeds (seeds+ 1)}>
            <img className='imagem' src="https://www.svgrepo.com/show/7675/hatchet.svg" alt="Axe" />
          </button>
          <p>Cortar árvores</p> 
        </div>

        <div className='button-item'>
          <button id="button" className='button-buy' onClick={() => setSeeds (seeds+ 2)}>
            <img className='imagem' src="https://www.svgrepo.com/show/283077/trees-wood.svg" alt="" />
          </button>
          <p>Comprar sementes</p>
        </div>

        <div className='button-item'>
          <button id="button" className="button-fast-foward" onClick={fastFoward}>
            <img className='imagem' src="https://www.svgrepo.com/show/464927/fast-forward.svg" alt="" />
          </button>
          <p>Acelerar o tempo</p>
        </div>

      </div>

    </div>
    </main>


  );
  
 }

 