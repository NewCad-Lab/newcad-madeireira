import React, { useEffect, useRef, useState } from 'react';
import './styles.css'
import './stylesTerrain.css'

let speed = 0.0050;

export function Terrain({ field }) {
<<<<<<< HEAD
  const images = {       
    1: 'https://www.svgrepo.com/show/335280/seed.svg',   
    2: 'https://www.svgrepo.com/show/530307/tree.svg',          
  };
=======
>>>>>>> b2e2df761f516b0d83fbea942c289ca00c3b395d

  return (
    <main>
      <div className="sun">
        <MoveSun />
      </div>
      <div className="terrain">
        {Array.from(field.entries()).map(([key, state]) => (
          <div key={key} className={`cell state`}>
          {state === 0 ? null : <img src={images[state]} alt={''} />}
          </div>
        ))}
      </div>
    </main>
  );
}

export function Home({ field, setField }) {

  const [seeds, setSeeds] = useState(3);
  const [log, setLog] = useState(0);
  

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
    if (field && field.size === 0) {
      const generatedField = generateField();
      setField(generatedField);
    }
  }, [field, setField]);

  function plant() {
    const updatedField = new Map(field);
    const emptyCells = Array.from(updatedField.entries()).filter(([field, value]) => value === 0);

    if (emptyCells.length > 0 && seeds > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const [field] = emptyCells[randomIndex];

      updatedField.set(field, 1);
      setField(updatedField);
      setSeeds(seeds - 1);

      setTimeout(() => {
        for (const [key, value] of updatedField.entries()) {
          if (value === 1) {
            updatedField.set(key, 2); 
          }
        }
        
        setField(new Map(updatedField)); 
      }, 2000);

    } else {
      alert("Não há células vazias ou não há sementes!");
    }

  }

 
  function chopTree() {
    const updatedField = new Map(field);
    let treesChopped = 0;

    for (const [key, value] of updatedField.entries()) {
      if(value === 2){
        updatedField.set(key, 0);
        treesChopped ++
      }
    }
   
    

    if(treesChopped > 0){
    setLog(log + treesChopped)
    const dropChance = 30
      
    const dropSeeds = Math.floor(Math.random() * treesChopped)
   
    if(dropSeeds < dropChance){
    setSeeds(seeds + dropSeeds)
    }
    setField(updatedField);
    
  } else {
    alert('Não há arvores para serem cortadas!')
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

  function fastFoward() {
    if (log >= 2) {
      const interval = setInterval(() => {
        speed = 0.02;
        setLog(log - 2)
      },);

      setTimeout(() => {
        clearInterval(interval);
        speed = 0.010;
      }, 5000);
    }
  }

  return (
    <main>

      <div className='container'>

        <div className='container-buttons'>
          <div className='button-item'>
            <button id="button" className='button-seed' onClick={plant}>
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


function MoveSun() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const radius = 410;
  const angleRef = useRef(250);


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
      angleRef.current = 250;
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        transform: `translate(${position.x + 245}px, ${position.y + 300}px)`,
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
          return Math.max(value - 3.009, minValue);
        });

        if (newColor.every((value, index) => value <= [0, 51, 102][index])) {
          setIsDarkening(false);
        }
      } else {
        newColor = rgb.map((value, index) => {
          return Math.min(value + 9.8, [69, 192, 233][index]);
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