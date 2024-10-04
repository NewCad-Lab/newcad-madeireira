
import React, { useState, useEffect } from 'react';
import './styles.css'

export function Terrain({ field }) {
  console.log(field);
  return (
    <div className="terrain">
      {Array.from(field.entries()).map(([key, state]) => (
        <div key={key} className={`cell state-${state}`}>
          {state}
        </div>
      ))}
    </div>
  );
}

 export function Home({ setField }) {

  const [seeds, setSeeds] = useState(3);

  const [log, setLog] = useState(0)


  function generateField(){
    const field = new Map();
    for (let row=0; row < 5; row++){
      for(let col=0; col<5; col++){
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
   // if(log >= 1){
    setSeeds(seeds + 2);
    //}
  }

  function chopTree(){
    //TODO: Percorrer o map e ver se tem arvore 2, se sim, executar a função
    setLog(log+1)
    const dropChance = 30
    if (Math.random()*100 < dropChance){
      setSeeds(seeds+1)
    }
  }


  return (
   <main>

    <div className='container'>

      <div className='container-buttons'>
        <div className='button-item'>
          <button id="button" className='button-seed' onClick={() => setSeeds (seeds-1)}>
            <img src="https://www.svgrepo.com/show/130645/seeds.svg" alt="Seed" />
          </button>
        <p>Quantidade de sementes: {seeds}</p>
        </div>

        <div className='button-item'>
          <button id="button" className='button-chop' onClick={() => setSeeds(seeds+1)}>
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

    </div>
    </main>


  );
  
 }