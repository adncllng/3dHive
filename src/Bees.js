import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from 'three';


function Bee({ direction, speed, factor, url, scale = 1, radiusFactor, ...props }) {
    const group = useRef();
    const mesh = useRef();
    const [start] = useState(() => Math.random() * 5000);
    useFrame((state, delta) => {
        mesh.current.position.y = (Math.sin(start + state.clock.elapsedTime) * 1) * 1 * radiusFactor;
        group.current.rotation.y +=
            (Math.sin((delta * factor) / 2) * Math.cos((delta * factor) / 2) * (direction === 'clockwise' ? 1.5 : -1.5))
    });

    const Sphere = () => {
        const sphereRef = useRef();
        const repeatX = 2;
        const repeatY = 2;
      
        const base = useLoader(THREE.TextureLoader, "/bw.jpg");
        base.wrapS = THREE.RepeatWrapping;
        base.wrapT = THREE.RepeatWrapping;
        base.repeat.set(repeatX, repeatY);
      
        return (
          <mesh ref={sphereRef} rotation={[0, Math.PI * 0, 0]}>
            <sphereGeometry args={[0.02 * scale, 20, 20]} />
            <meshPhysicalMaterial map={base} color={"yellow"} />
          </mesh>
        );
      };
      
    return (
        <group ref={group} dispose={null}>
            <scene {...props}>
                <mesh ref={mesh} scale={1.5} name="Object_0" >
                    {/* <sphereBufferGeometry args={[0.02 * scale, 2, 2]} /> */}
                    <Sphere/>
                </mesh>
            </scene>
        </group>
    );
}

export default function Bees({ count, speed, radiusFactor = 1, scale }) {
    return new Array(count).fill().map((_, i) => {
        const x = (0.2 + Math.random() * (Math.round(Math.random()) ? -1 : 1)) * radiusFactor;
        const y = 2 + Math.random() * 1;
        const z = (-0.5 + Math.random() * 2) * radiusFactor;

        return (
            <Bee
                direction={Math.floor(Math.random) ? "clockwise" : "counterClockwise"}
                scale={scale}
                key={i}
                position={[x, y, z]}
                factor={speed + Math.random() * 5}
                radiusFactor={radiusFactor}
            />
        );
    });
}
