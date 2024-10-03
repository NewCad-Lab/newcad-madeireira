import './styles.css'

 export function Home() {
 
  return (
   <main>
    <div className='container'>

      <div className='container-buttons'>
        <div className='button-item'>
          <button id="button" className='button-seed'>
            <img src="https://www.svgrepo.com/show/130645/seeds.svg" alt="Seed" />
          </button>
          <p>Quantidade de sementes: x</p>
        </div>

        <div className='button-item'>
          <button id="button" className='button-chop'>
            <img src="https://www.svgrepo.com/show/7675/hatchet.svg" alt="Axe" />
          </button>
          <p>Cortar árvores</p> 
        </div>

        <div className='button-item'>
          <button id="button" className='button-buy'>
            <img src="https://www.svgrepo.com/show/283077/trees-wood.svg" alt="" />
          </button>
          <p>Comprar sementes</p>
        </div>

        <div className='button-item'>
          <button id="button" className="button-fast-foward">
            <img src="https://www.svgrepo.com/show/464927/fast-forward.svg" alt="" />
          </button>
          <p>Acelerar o tempo</p>
        </div>

      </div>

    </div>
    </main>
  );

 }
