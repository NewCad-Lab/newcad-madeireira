import React, { useEffect, useRef, useState } from 'react';
import './styles.css'
import './stylesTerrain.css'

let speed = 0.01;

export function Terrain({ field }) {
  if (!field || field.size === 0) { 
    return <div>Carregando o terreno...</div>; 
  }

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

export function Home({ field, setField }) {

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
    if (field && field.size === 0) { 
      const generatedField = generateField();
      setField(generatedField);
    }
  }, [field, setField]);

  function plant() {
    const updatedField = new Map(field);
    const maxRows = 5;
    const maxCols = 5; 

    // Filtra as células vazias (aquelas com valor 0)
    const emptyCells = Array.from(updatedField.entries()).filter(([key, value]) => value === 0);

    console.log("Células vazias:", emptyCells);

    if (emptyCells.length > 0 && seeds > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const [key] = emptyCells[randomIndex]; 

        updatedField.set(key, 1); 

        setField(updatedField);
        setSeeds(seeds - 1); 
    } else {
        alert("Não há células vazias ou não há sementes!");
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
            <button id="button" className='button-chop' onClick={() => setSeeds(seeds + 1)}>
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
            <button id="button" className="button-fast-foward" >
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



function fastFoward() {
  if (log >= 2) {
    const interval = setInterval(() => {
      speed = 0.05;
    },);

    setTimeout(() => {
      clearInterval(interval);
      speed = 0.01;
    }, 5000);
  }
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

export function nightSystem() {
  const [backgroundColor, setBackgroundColor] = useState('background-color:rgba(69, 192, 233, 0.507)');

  useEffect(() => {
    const interval = setInterval(() => {
      const newColor = rgb.map(value => Math.max(value - 10, 0));
      setBackgroundColor(`rgb{$newColor.join(',')})`);
    }, 500);

  }

  )
}
