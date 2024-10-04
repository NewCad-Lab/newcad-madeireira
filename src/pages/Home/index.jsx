import React, { useEffect, useRef, useState } from 'react';
import './styles.css'
import './stylesTerrain.css'


 export function Home() {
  const [seeds, setSeeds] = useState(3);
  const [log, setLog] = useState(0);

    function buySeeds(){
      if (log >=1){
        setSeeds(seeds+2);
        setLog(log-1);
      }
      else{
        alert("troncos insuficientes")
      }
    }

   
  return (
   <main>
<div>
  
</div>

    <div className='container'>

      <div className='container-buttons'>
        <div className='button-item'>
          <button id="button" className='button-seed' onClick={() => setSeeds (seeds-1)}>
            <img src="https://www.svgrepo.com/show/130645/seeds.svg" alt="Seed" />
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
          <button id="button" className='button-buy' onClick ={buySeeds}>
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

      <div className='log'>
      <p>Troncos: {log}</p>
      <img src="https://www.svgrepo.com/show/178406/wood-nature.svg" alt="" />
      </div>

    </div>
    </main>
  );
 }


 export function Terrain() {
  return (
    <main>
      <div className="sun">
        <MoveSun />
      </div>
      <div className="terrain"></div>
    </main>
  );
}

function fastFoward(){
  const interval = setInterval(() =>{
  speed = 0.05;
  },);

  setTimeout(()=>{
    clearInterval(interval);
    speed = 0.01;
  }, 5000);
}

let speed = 0.01;

function MoveSun() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const radius = 410;
  const angleRef = useRef(0);

 
  useEffect(() => {
    const animate = () => {
      angleRef.current += speed;
      const x = radius * Math.cos(angleRef.current);
      const y = radius * Math.sin(angleRef.current); 

      setPosition({ x, y });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      angleRef.current = 0;
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        top: `-16rem`,
        left: `-5rem`,
        transform: `translate(${position.x + 350}px, ${position.y + 550}px)`,
        width: '50px',
        height: '50px',
        backgroundColor: 'yellow',
        borderRadius: '50%',
      }}
    />
  );
}