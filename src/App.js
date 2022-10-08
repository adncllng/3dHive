import * as THREE from "three";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows, SpotLight } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";

const FRAME_SPACE = 0.15;

const Frame = (props) => {
    const [hover, setHover] = useState();
    const yFactor = (hover ? 1.4 : 1) + (props.hover ? 1.2 : 0);
    const { position } = useSpring({
        delay: props.hover ? 200 : 300,
        position: [props.position[0], props.position[1] * yFactor, props.position[2]],
    });
    return (
        <a.group
            onPointerOver={(e) => {
                e.stopPropagation();
                setHover(true);
                props.setHover(true);
            }}
            onPointerOut={() => {
                setHover(false);
            }}
            {...props}
            position={position}
        >
            <mesh castShadow position={[0, 0.3, 0]}>
                <boxGeometry args={[1.3, 0.1, 0.1]} />
                <meshStandardMaterial color="lightblue" />
            </mesh>
            <mesh castShadow position={[0, 0, 0]}>
                <boxGeometry args={[1.2, 0.6, 0.05]} />
                <meshStandardMaterial color="lightblue" />
            </mesh>
        </a.group>
    );
};

const Box = (props) => {
    const { position } = useSpring({
        delay: props.hover ? 0 : 500,
        position: props.hover
            ? [props.position[0], props.position[1] * 2, props.position[2]]
            : props.position,
    });

    return (
        <a.group scale={1} position={position}>
            <mesh castShadow position={[0.75, 0.5, 0.75]}>
                <boxGeometry args={[0.1, 0.75, 1.8]} />
                <meshStandardMaterial color="khaki" />
            </mesh>
            <mesh castShadow position={[-0.75, 0.5, 0.75]}>
                <boxGeometry args={[0.1, 0.75, 1.8]} />
                <meshStandardMaterial color="khaki" />
            </mesh>
            <mesh castShadow position={[-0.0, 0.5, 1.7]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[0.1, 0.75, 1.6]} />
                <meshStandardMaterial color="khaki" />
            </mesh>
            <mesh castShadow position={[0, 0.5, -0.2]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[0.1, 0.75, 1.6]} />
                <meshStandardMaterial color="khaki" />
            </mesh>
            {Array(11)
                .fill()
                .map((_, i) => (
                    <Frame
                        setHover={props.setHover}
                        key={i}
                        hover={props.hover}
                        position={[0, 0.5, i * FRAME_SPACE]}
                    />
                ))}
        </a.group>
    );
};
const Base = (props) => {
    const { position } = useSpring({
        delay: props.hover ? 0 : 500,
        position: props.hover
            ? [props.position[0], props.position[1] * 2, props.position[2]]
            : props.position,
    });

    return (
        <a.mesh castShadow position={position}>
            <boxGeometry args={[1.75, 0.2, 2.2]} />
            <meshStandardMaterial color="gold" />
        </a.mesh>
    );
};
const Hive = (props) => {
    const [hover, setHover] = useState();
    const { scale } = useSpring({
        scale: hover ? props.scale * 1.5 : props.scale,
        delay: hover ? 0 : 500,
    });

    return (
        <a.group
            scale={scale}
            onPointerOver={() => {
                setHover(true);
            }}
            onPointerOut={() => {
                setHover(false);
            }}
            position={props.position}
        >
            <Base hover={hover} position={[0, 2.6, 0.75]} />
            <Box hover={hover} setHover={setHover} position={[0, 0.1, 0]} />
            <Box hover={hover} setHover={setHover} position={[0, 0.9, 0]} />
            <Box hover={hover} setHover={setHover} position={[0, 1.7, 0]} />
            <Base hover={hover} position={[0, 0.1, 0.75]} />
        </a.group>
    );
};
function App() {
    return (
        <Canvas
            style={{ width: "100%", height: "100%", position: "fixed" }}
            shadows
            camera={{ position: [10, 0, 10], fov: 80 }}
        >
            <ContactShadows
                opacity={0.5}
                scale={10}
                blur={5}
                far={100}
                resolution={256}
                color="#000000"
            />
            <primitive object={new THREE.AxesHelper(10)} />
            <OrbitControls
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 3}
                enableZoom={false}
            />
            <Hive scale={0.5} position={[0, 0.2, -.36]} />
            <Environment preset="city" />
        </Canvas>
    );
}

export default App;
