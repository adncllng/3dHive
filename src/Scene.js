import { ContactShadows } from "@react-three/drei";

const Scene = () => (
    <>
        <spotLight
            position={[50, 20, 0]}
            intensity={0.5}
            distance={100}
            penumbra={1}
        />
        <ContactShadows
            opacity={0.5}
            scale={10}
            blur={5}
            far={500}
            resolution={256}
            color="#000000"
        />
        <ambientLight intensity={0.05} />
        <hemisphereLight
            color="white"
            groundColor="pink"
            position={[15, 100, 10]}
            intensity={0.8}
        />
    </>
);

export default Scene;
