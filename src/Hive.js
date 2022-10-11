import { useEffect, useRef, useState } from "react";
import { useDetectGPU } from "@react-three/drei";
import { useSpring, a, config } from "@react-spring/three";
import Bees from "./Bees";

const FRAME_SPACE = 0.15;

const Frame = (props) => {
    const [hover, setHover] = useState();
    const { isMobile } = useDetectGPU();
    const yFactor = (hover ? 1.4 : 1) + (props.hover ? 1.2 : 0);
    const { position } = useSpring({
        config: config.stiff,
        delay: props.hover ? 200 : 300,
        position: [props.position[0], props.position[1] * yFactor, props.position[2]],
    });
    const color = hover ? "lightblue" : "khaki";
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
        config: config.stiff,
        delay: props.hover ? 0 : 800,
        position: props.hover
            ? [props.position[0], props.position[1] * 2.3, props.position[2]]
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
        config: config.stiff,
        delay: props.hover ? 0 : 800,
        position: props.hover
            ? [props.position[0], props.position[1] * 2.3, props.position[2]]
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
    const _intervalRef = useRef(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (hover) {
            _intervalRef.current = setInterval(() => {
                setCount((count) => Math.floor(Math.min(count + 5 + count / 2, 20)));
            }, 200);
        } else {
            _intervalRef.current = setInterval(() => {
                setCount((count) => Math.floor(Math.max(count - 1 - count / 2, 0)));
            }, 200);
        }
        return () => clearInterval(_intervalRef.current);
    }, [hover]);

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
            {isMobile ? null : (
                <>
                    <Bees radiusFactor={1} count={2} speed={2} />
                    <Bees radiusFactor={2} count={count * 2} speed={4} />
                    <Bees radiusFactor={5} count={count} speed={4} />
                    <Bees scale={1.8} radiusFactor={10} count={5} speed={0.1} colors={["black"]} />
                </>
            )}
            <Base hover={hover} position={[0, 2.6, 0.75]} />
            <Box hover={hover} setHover={setHover} position={[0, 0.1, 0]} />
            <Box hover={hover} setHover={setHover} position={[0, 0.9, 0]} />
            <Box hover={hover} setHover={setHover} position={[0, 1.7, 0]} />
            <Base hover={hover} position={[0, 0.1, 0.75]} />
        </a.group>
    );
};

export default Hive;
