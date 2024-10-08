import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";


export const Sun = ({ position }) => {
    const sunRef = useRef()
    const [angle, setAngle] = useState(0)

    useFrame((state, delta) => {
        setAngle((prev) => prev + delta * 0.5)
        const radius = 8
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        sunRef.current.position.set(-x + 2, -z, 2)
    })

    return (
        <mesh ref={sunRef} position={position}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color={"yellow"} />
        </mesh>
    )
}

export const Moon = ({ position }) => {
    const moonRef = useRef()
    const [angle, setAngle] = useState(0)

    useFrame((state, delta) => {
        setAngle((prev) => prev + delta * 0.5)
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
    return (
        <mesh>
            <PerspectiveCamera makeDefault position={[0, 0, 15]} />
            <Sun position={[-5, 5, -10]} />
            <Moon position={[5, 20, 10]} />
        </mesh>
    )
}
export default Terrain;
