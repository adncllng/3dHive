import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, useDetectGPU } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";

const FRAME_SPACE = 0.15;

const Frame = (props) => {
    const [hover, setHover] = useState();
    const { isMobile } = useDetectGPU();
    const yFactor = (hover ? 1.4 : 1) + (props.hover ? 1.2 : 0);
    const { position } = useSpring({
        delay: props.hover ? 200 : 300,
        position: [props.position[0], props.position[1] * yFactor, props.position[2]],
    });
    const color = hover ? "skyblue" : "lightblue";
    return (
        <a.group
            onPointerOver={(e) => {
                if (isMobile) return;
                e.stopPropagation();
                setHover(true);
                props.setHover(true);
            }}
            onPointerOut={(e) => {
                if (isMobile) return;
                e.stopPropagation();
                setHover(false);
                props.setHover(false);
            }}
            {...props}
            position={position}
        >
            <mesh castShadow position={[0, 0.3, 0]}>
                <boxGeometry args={[1.3, 0.1, 0.1]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh castShadow position={[0, 0, 0]}>
                <boxGeometry args={[1.2, 0.6, 0.05]} />
                <meshStandardMaterial color={color} />
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
                <meshStandardMaterial color="rgba(250,195,110)" />
            </mesh>
            <mesh castShadow position={[-0.75, 0.5, 0.75]}>
                <boxGeometry args={[0.1, 0.75, 1.8]} />
                <meshStandardMaterial color="rgba(250,195,110)" />
            </mesh>
            <mesh castShadow position={[-0.0, 0.5, 1.7]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[0.1, 0.75, 1.6]} />
                <meshStandardMaterial color="rgba(250,195,110)" />
            </mesh>
            <mesh castShadow position={[0, 0.5, -0.2]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[0.1, 0.75, 1.6]} />
                <meshStandardMaterial color="rgba(250,195,110)" />
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
            <meshStandardMaterial color="rgba(250,195,110)" />
        </a.mesh>
    );
};

const Hive = (props) => {
    const { isMobile } = useDetectGPU();
    const [hover, setHover] = useState();
    return (
        <a.group
            scale={props.scale}
            onPointerOver={(e) => {
                if (isMobile) return;
                e.stopPropagation();
                setHover(true);
            }}
            onClick={(e) => {
                if (isMobile) setHover(!hover);
            }}
            onPointerOut={() => {
                if (isMobile) return;
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
    const { device, fps, gpu, isMobile, tier, type } = useDetectGPU();
    const Fallback = () => (
        <pre maxWidth={200}>
            device: {device} {"\n"}
            fps: {fps} {"\n"}
            gpu: {gpu} {"\n"}
            isMobile: {isMobile?.toString()} {"\n"}
            Tier: {tier.toString()} {"\n"}
            Type: {type} {"\n"}
        </pre>
    );
    return (
        <div
            style={{
                background: "white",
                display: "flex",
                width: "100vw",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Suspense fallback={<Fallback />}>
                <Canvas
                    shadows
                    style={{ width: "75%", height: "75%" }}
                    camera={{ position: [10, 10, 10], fov: 25,}}
                >
                    <ContactShadows
                        opacity={0.5}
                        scale={10}
                        blur={5}
                        far={500}
                        resolution={256}
                        color="#000000"
                    />

                    <OrbitControls
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI / 3}
                        target={[0,1,0]}
                        enableZoom={false}
                    />
                    <Hive scale={0.5} position={[-1, 0.2, .8]} />
                    <Hive scale={0.5} position={[0, 0.2, -0.36]} />
                    <Hive scale={0.5} position={[1, 0.2, -1.5]} />
                    <spotLight
                        position={[50, 20, 0]}
                        intensity={0.5}
                        distance={100}
                        // angle={Math.PI / 10}
                        penumbra={1}
                    />
                    <ambientLight intensity={0.05} />
                    <hemisphereLight
                        color="white"
                        groundColor="pink"
                        position={[15, 100, 10]}
                        intensity={0.8}
                    />
                </Canvas>
            </Suspense>
        </div>
    );
}

export default App;
