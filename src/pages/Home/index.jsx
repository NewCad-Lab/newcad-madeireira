import React, { useEffect, useRef, useState } from 'react';
import './styles.css'
import './stylesTerrain.css'

let speed = 0.0090;

export function Terrain({ field }) {
  console.log(field);
  return (
    <main>
      <div className="sun">
        <MoveSun />
      </div>

      <div className="terrain">
        {Array.from(field.entries()).map(([key, state]) => (
          <div key={key} className={`cell state-${state}`}>
            {state}
          </div>
        ))}
      </div>
    </main>
  );
}

export function Home({ setField }) {

  const [seeds, setSeeds] = useState(3);
  const [log, setLog] = useState(0)


  function generateField() {
    const field = new Map();
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const key = `${row},${col}`;
        field.set(key, 0); //0 = vazio, 1 = plantado, 2 = arvore1, 3 = arvore2
      }
    }
    return field;
  }

  useEffect(() => {
    const generatedField = generateField();
    setField(generatedField);
  }, [setField]);

  
  function buySeeds() {
    if (log >= 1) {
      setSeeds(seeds + 2);
    }
  }

  function chopTree() {
    //TODO: Percorrer o map e ver se tem arvore 2, se sim, executar a função
    setLog(log + 1)
    const dropChance = 30
    if (Math.random() * 100 < dropChance) {
      setSeeds(seeds + 1)
    }
  }

  function buySeeds() {
    if (log >= 1) {
      setSeeds(seeds + 2);
      setLog(log - 1);
    }
    else {
      alert("troncos insuficientes")
    }
  }

  function minSeeds() {
    if (seeds >= 1) { 
    setSeeds(seeds - 1)}
    else
    {
      alert("não tem")
    }
  }
  function fastFoward() {
    if (log >= 2) {
      const interval = setInterval(() => {
        speed = 0.02;
        setLog(log -2)
      },);
  
      setTimeout(() => {
        clearInterval(interval);
        speed = 0.018;
      }, 5000);
    }
  }

return (
  <main>

    <div className='container'>

      <div className='container-buttons'>
        <div className='button-item'>
          <button id="button" className='button-seed' onClick={minSeeds}>
            <img src="https://www.svgrepo.com/show/130645/seeds.svg" alt="Seed" />
          </button>
          <p>Quantidade de sementes: {seeds}</p>
        </div>

        <div className='button-item'>
          <button id="button" className='button-chop' onClick={chopTree}>
            <img className='imagem' src="https://www.svgrepo.com/show/7675/hatchet.svg" alt="Axe" />
          </button>
          <p>Cortar árvores</p>
        </div>

        <div className='button-item'>
          <button id="button" className='button-buy' onClick={buySeeds}>
            <img className='imagem' src="https://www.svgrepo.com/show/283077/trees-wood.svg" alt="" />
          </button>
          <p>Comprar sementes</p>
        </div>

        <div className='button-item'>
          <button id="button" className="button-fast-foward"  onClick={fastFoward}>
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

export function NightSystem() {
  const initialColor = 'rgba(69, 192, 233, 0.507)';
  const darkColor = 'rgba(0, 51, 102, 0.507)'; 
  const [backgroundColor, setBackgroundColor] = useState(initialColor);
  const [isDarkening, setIsDarkening] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const rgba = backgroundColor.match(/(\d+\.?\d*)/g);
      if (!rgba) return;

      const rgb = rgba.slice(0, 3).map(Number);
      let newColor;

      if (isDarkening) {
        newColor = rgb.map((value, index) => {
          const minValue = [0, 51, 102][index];
          return Math.max(value - 10, minValue);
        });
        
        if (newColor.every((value, index) => value <= [0, 51, 102][index])) {
          setIsDarkening(false);
        }
      } else {
        newColor = rgb.map((value, index) => {
          return Math.min(value + 10, [69, 192, 233][index]); 
        });
        
        if (newColor.every((value, index) => value === Number(rgba[index]))) {
          setIsDarkening(true); 
        }
      }

      setBackgroundColor(`rgba(${newColor.join(',')}, ${rgba[3]})`);
    }, 180);

    return () => clearInterval(interval); 
  }, [backgroundColor, isDarkening]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      width: '100vw',
      backgroundColor,
      zIndex: -1,
      overflow: 'hidden'
    }}>
    </div>
  );
}