import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Home } from '../pages/Home';



export const Sun = ({ position, velocity }) => {
    const sunRef = useRef()
    const lightRef = useRef();
    const [angle, setAngle] = useState(0)


    useFrame((state, delta) => {
        setAngle((prev) => prev + delta * velocity)
        const radius = 8
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        sunRef.current.position.set(-x + 2, -z, 2)

        if (lightRef.current) {
            lightRef.current.position.copy(sunRef.current.position);
        }
    });


    return (
        <>
            <mesh ref={sunRef} position={position}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color={"yellow"} />
            </mesh>
           
        </>
    )
}


export const Moon = ({ position, velocity }) => {
    const moonRef = useRef();
    const [angle, setAngle] = useState(0);


    useFrame((state, delta) => {
        setAngle((prev) => prev + delta * velocity)
        const radius = 8
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        moonRef.current.position.set(x + 2, z, 2)
    })
    return (
        <mesh ref={moonRef} position={position}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color={"white"} />
        </mesh>
    )
}







const Terrain = () => {

}
export default Terrain;
