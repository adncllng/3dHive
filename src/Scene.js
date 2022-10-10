import { ContactShadows } from "@react-three/drei";

const Scene = () => (
    <>
        <spotLight position={[50, 20, 0]} intensity={1} distance={100} penumbra={1} />
        <ContactShadows
            opacity={0.5}
            scale={10}
            blur={5}
            far={500}
            resolution={256}
            color="#000000"
        />
        <ambientLight intensity={0.3} />
        <hemisphereLight
            color="white"
            groundColor="lightpink"
            position={[20, 10, 10]}
            intensity={0.3}
        />
    </>
);

export default Scene;
