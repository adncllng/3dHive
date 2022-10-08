import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useScroll, ScrollControls, PresentationControls, OrbitControls } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";

const colors = ["red", "gold", "teal"];
const FRAME_SPACE = 0.15;

const Frame = (props) => {
    const ref = useRef();
    // const scroll = useScroll();
    // useFrame((state, delta) => {
    //     const r2 = scroll.range(1 / 8, 1 / 4);
    //     console.log(props.position);
    //     ref.current.position.y = THREE.MathUtils.damp(
    //         ref.current.position.y,
    //         (Math.PI / 8) * r2 + props.position[1],
    //         20 - props.position[2] * 10,
    //         delta
    //     );
    // });
    const [hover, setHover] = useState();
    const { scale } = useSpring({ scale: hover ? 1.5 : 1 });
    const yFactor = (hover ? 1.2 : 1) + (props.hover ? 1.2 : 0);

    const { position } = useSpring({
        position: [props.position[0], props.position[1] * yFactor, props.position[2]],
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
            ref={ref}
            scale={0.2}
            {...props}
            position={position}
        >
            <mesh castShadow position={[0, 1.5, 0]}>
                <boxGeometry args={[6.5, 0.5, 0.5]} />
                <meshStandardMaterial color="lightblue" />
            </mesh>
            <mesh castShadow position={[0, 0, 0]}>
                <boxGeometry args={[6, 3, 0.25]} />
                <meshStandardMaterial color="lightblue" />
            </mesh>
        </a.group>
    );
};

const Box = (props) => {
    const ref = useRef();
    // const scroll = useScroll();
    // useFrame((state, delta) => {
    //     const r1 = scroll.range(0 / 8, 1 / 4);
    //     ref.current.position.y = THREE.MathUtils.damp(
    //         ref.current.position.y,
    //         (Math.PI / 3) * (r1 * props.position[1]) + props.position[1],
    //         10,
    //         delta
    //     );
    // });
    const { position } = useSpring({
        position: props.hover
            ? [props.position[0], props.position[1] * 2, props.position[2]]
            : props.position,
    });

    return (
        <a.group ref={ref} scale={1} position={position}>
            <mesh castShadow position={[0.75, 0.5, 0.75]}>
                <boxGeometry args={[0.1, 0.75, 1.8]} />
                <meshStandardMaterial color="gold" />
            </mesh>
            <mesh castShadow position={[-0.75, 0.5, 0.75]}>
                <boxGeometry args={[0.1, 0.75, 1.8]} />
                <meshStandardMaterial color="gold" />
            </mesh>
            <mesh castShadow position={[-0.0, 0.5, 1.7]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[0.1, 0.75, 1.6]} />
                <meshStandardMaterial color="gold" />
            </mesh>
            <mesh castShadow position={[0, 0.5, -0.2]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[0.1, 0.75, 1.6]} />
                <meshStandardMaterial color="gold" />
            </mesh>
            {Array(11)
                .fill()
                .map((_, i) => (
                    <Frame hover={props.hover} position={[0, 0.5, i * FRAME_SPACE]} />
                ))}
        </a.group>
    );
};
const Base = (props) => {
    const ref = useRef();
    // const scroll = useScroll();
    // useFrame((state, delta) => {
    //     const r1 = scroll.range(0 / 4, 1 / 4);
    //     ref.current.position.y = THREE.MathUtils.damp(
    //         ref.current.position.y,
    //         (Math.PI / 3) * (r1 * props.position[1]) + props.position[1],
    //         10,
    //         delta
    //     );
    // });
    // const [hover, setHover] = useState();
    const { position } = useSpring({
        position: props.hover
            ? [props.position[0], props.position[1] * 2, props.position[2]]
            : props.position,
    });

    return (
        <a.mesh
            // scale={scale}
            ref={ref}
            castShadow
            // {...props}
            position={position}
        >
            <boxGeometry args={[1.75, 0.2, 2.2]} />
            <meshStandardMaterial color="gold" />
        </a.mesh>
    );
};
const Hive = () => {
    const ref = useRef();
    // const scroll = useScroll();
    // useFrame((state, delta) => {
    //     const r2 = scroll.range(0, 3 / 4);
    //     ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, 3 * r2, 10, delta);
    // });
    const [hover, setHover] = useState();
    const { scale } = useSpring({ scale: hover ? 1.5 : 1 });

    return (
        <a.group
            scale={scale}
            onPointerOver={() => {
                setHover(true);
            }}
            onPointerOut={() => {
                setHover(false);
            }}
            position={[0, 1, 2.5]}
            ref={ref}
        >
            <Base hover={hover} position={[0, 2.6, 0]} />
            <Box hover={hover} position={[0, 0.1, 0]} />
            <Box hover={hover} position={[0, 0.9, 0]} />
            <Box hover={hover} position={[0, 1.7, 0]} />
            <Base hover={hover} position={[0, 0.1, 0]} />
        </a.group>
    );
};
function App() {
    return (
        <Canvas
            style={{ width: "100%", height: "100%", position: "fixed", background: "skyblue" }}
            shadows
            camera={{ position: [15, 15, 15], fov: 50 }}
        >
            {/* <ScrollControls
                pages={1} // Each page takes 100% of the height of the canvas
                distance={1} // A factor that increases scroll bar travel (default: 1)
                damping={10} // Friction, higher is faster (default: 4)
                horizontal={false} // Can also scroll horizontally (default: false)
                infinite={false} // Can also scroll infinitely (default: false)
            > */}
                     <primitive object={new THREE.AxesHelper(10)} />
                   <OrbitControls
                   minPolarAngle = {Math.PI/3}
                   maxPolarAngle = {Math.PI/3}
                   />
                <Hive />
                <Environment preset="city" />
            {/* </ScrollControls> */}
        </Canvas>
    );
}

export default App;
