import React, { useEffect, useMemo, useRef, useState } from 'react';
import './styles.css';
import Terrain, { Moon, Sun } from '../../components/Terrain';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";




export function Home() {
  const [field, setField] = useState(Array(5).fill(0).map(() => Array(5).fill(0)));
  const [seeds, setSeeds] = useState(3);
  const [log, setLog] = useState(0)
  const [velocity, setVelocity] = useState(0.5);
  const [growthTime, setGrowthTime] = useState(6000);
  const [priceLogs, setPriceLogs] = useState(2);

  const colors = [
    '#27a50a',
    '#4cb00d',
    '#64b624',
    '#41dd12',
    '#51f238',
    '#8ab480',
    '#5d9f72',
    '#317e56',
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const [c1, c2, c3] = useMemo(() => new Array(3).fill(1).map(getRandomColor), [])

  const Plane = () => {
    const grid = [];

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        grid.push(
          <mesh key={`box-${i}-${j}`} position={[i, 0, j]}>
            <boxGeometry args={[1, 0.2, 1]} />
            <meshStandardMaterial color={"green"} />
          </mesh>
        );

        if (field[i][j] === 1) {
          grid.push(
            <mesh key={`sphere-${i}-${j}`} position={[i, 0.11, j]}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshStandardMaterial color={"brown"} />
            </mesh>
          );
        } else if (field[i][j] === 2) {
          grid.push(
            <>
              <mesh key={`minitree1-${i}-${j}`} position={[i, 0.16, j]}>
                <cylinderGeometry args={[0.04, 0.05, 0.3]} />
                <meshStandardMaterial color={"brown"} />
              </mesh>
              <mesh key={`minitree2-${i}-${j}`} position={[i, 0.5, j]}>
                <cylinderGeometry args={[0.001, 0.15, 0.4]} />
                <meshStandardMaterial color={c1} />
              </mesh>
            </>
          );
        } else if (field[i][j] === 3) {
          grid.push(
            <>
              <mesh key={`tree1-${i}-${j}`} position={[i, 0.4, j]}>
                <cylinderGeometry args={[0.09, 0.12, 0.8]} />
                <meshStandardMaterial color={"brown"} />
              </mesh>
              <mesh key={`tree2-${i}-${j}`} position={[i, 0.98, j]}>
                <cylinderGeometry args={[0.15, 0.35, 0.35]} />
                <meshStandardMaterial color={c2} />
              </mesh>
              <mesh key={`tree25-${i}-${j}`} position={[i, 1.35, j]}>
                <cylinderGeometry args={[0.01, 0.3, 0.4]} />
                <meshStandardMaterial color={c3} />
              </mesh>
            </>
          );
        }
      }
    }

    return <>{grid}</>;
  };


  function plant() {
    const emptyCells = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (field[row][col] === 0) {
          emptyCells.push([row, col]);
        }
      }
    }

    if (emptyCells.length > 0 && seeds > 0) {
      const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newField = field.map(r => [...r]);
      newField[row][col] = 1;
      setField(newField);
      setSeeds(seeds - 1);


    } else {
      alert("Não há células vazias ou não há sementes!");
    }

  }

 
  function chopTree() {

    const newField = field.map(r => [...r]);
    let treesChopped = 0;

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (field[row][col] === 3) {
          newField[row][col] = 0;
          setField(newField);
          treesChopped++
        }
      }
    }
   
    

    if(treesChopped > 0){
    setLog(log + treesChopped)
    const dropChance = 30
      
    const dropSeeds = Math.floor(Math.random() * treesChopped)
   
    if(dropSeeds < dropChance){
    setSeeds(seeds + dropSeeds)
    }
    
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
      alert("Troncos insuficientes!")
    }
  }

  function growth() {
    const interval = setInterval(() => {
        setField(prevField => {
            const updatedField = prevField.map(r => [...r]);

            for (let row = 0; row < 5; row++) {
                for (let col = 0; col < 5; col++) {

                    if (updatedField[row][col] === 1) {
                        updatedField[row][col] = 2; 
                    }

                    else if (updatedField[row][col] === 2) {
                        updatedField[row][col] = 3; 
                    }
                }
                
            }
            return updatedField; 
        });
    }, growthTime); 

    return () => clearInterval(interval); 
}



  useEffect(() => {
    const intervalClean = growth()
    return intervalClean;
  }, []);


  function fastFoward() {
    console.log("fastforward")
    if (log >= priceLogs) {
      setLog(log - priceLogs); 
      setPriceLogs(priceLogs * 2); 

      const previousGrowthTime = growthTime;
      setGrowthTime (1000);

      setTimeout(() => {
        setGrowthTime (previousGrowthTime);
      }, 5000);
    } else {
      alert("Troncos insuficientes!");
    }
  }

   const fastSunMoon = () => {
    if (log >= priceLogs) {
      
    const intervalSunMoon = setInterval(() => {
      console.log("fast!");
      setVelocity(2);
    },);

    setTimeout(() => {
      clearInterval(intervalSunMoon);
      setVelocity(0.5);
    }, 6000);
  }else{
    alert("Troncos insuficientes!")
  }
  } 

  const doubleFastFunction = () => {
    fastFoward();
    fastSunMoon();
  }

  return (
    <main className="flex-container">
      <div className="canvas-container">
        <Canvas style={{ width: '100%', height: '100%' }}>
          <OrbitControls/>
          <PerspectiveCamera makeDefault position={[15, 5, 10]}/>
          <ambientLight intensity={1.5} />
          <Sun position={[-5, 5, -10]}velocity={velocity}/>
            <Moon position={[5, 20, 10]} velocity={velocity}/>
          <Plane position={[-10, 0, 0]} field={field} />
        </Canvas>
      </div>

      <div className="container">
        <div className="container-buttons">
          <div className="button-item">
            <button id="button" className="button-seed" onClick={plant}>
              <img src="https://www.svgrepo.com/show/130645/seeds.svg" alt="Seed" />
            </button>
            <p>Quantidade de sementes: {seeds}</p>
          </div>

          <div className="button-item">
            <button id="button" className="button-chop" onClick={chopTree}>
              <img className="imagem" src="https://www.svgrepo.com/show/7675/hatchet.svg" alt="Axe" />
            </button>
            <p>Cortar árvores</p>
          </div>

          <div className="button-item">
            <button id="button" className="button-buy" onClick={buySeeds}>
              <img className="imagem" src="https://www.svgrepo.com/show/283077/trees-wood.svg" alt="" />
            </button>
            <p>Comprar sementes</p>
          </div>

          <div className="button-item">
            <button id="button" className="button-fast-foward" onClick={doubleFastFunction}>
              <img className="imagem" src="https://www.svgrepo.com/show/464927/fast-forward.svg" alt="" />
            </button>
            <p>Acelerar o tempo</p>
          </div>
        </div>

        <div className="log">
          <p>Troncos: {log}</p>
          <img src="https://www.svgrepo.com/show/178406/wood-nature.svg" alt="" />
        </div>
      </div>
    </main>
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