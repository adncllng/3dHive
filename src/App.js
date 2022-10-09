import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useDetectGPU } from "@react-three/drei";
import Hive from "./Hive";
import Scene from "./Scene";

const Fallback = () => {
    const { device, fps, gpu, isMobile, tier, type } = useDetectGPU();
    return (
        <pre maxWidth={200}>
            device: {device} {"\n"}
            fps: {fps} {"\n"}
            gpu: {gpu} {"\n"}
            isMobile: {isMobile?.toString()} {"\n"}
            Tier: {tier.toString()} {"\n"}
            Type: {type} {"\n"}
        </pre>
    );
};

function App() {
    return (
        <div
            style={{
                background: "honeydew",
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
                    style={{ width: "100%", height: "75%" }}
                    camera={{ position: [10, 10, 10], fov: 25 }}
                >
                    <OrbitControls
                        minPolarAngle={Math.PI / 2.4}
                        maxPolarAngle={Math.PI / 2.4}
                        target={[0, 1, 0]}
                        enableZoom={false}
                    />
                    <Scene />
                    <Hive scale={0.5} position={[-1, 0.2, 0.8]} />
                    <Hive scale={0.5} position={[0, 0.2, -0.36]} />
                    <Hive scale={0.5} position={[1, 0.2, -1.5]} />
                </Canvas>
            </Suspense>
        </div>
    );
}

export default App;
