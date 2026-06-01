import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function Model(props) {
const earthRef = useRef();
const { nodes, materials } = useGLTF('/earth.gltf');

useFrame((state, delta) => {
if (earthRef.current) {
earthRef.current.rotation.y += delta * 0.12;
}
});

return (
<group {...props} dispose={null}>
<group ref={earthRef}>
<mesh geometry={nodes.Object_4.geometry} scale={1.128}>
<meshStandardMaterial 
color="#8b5cf6"
emissive="#3b0764"
emissiveIntensity={2.2}
wireframe={true}
transparent={true}
opacity={0.7}
/>
</mesh>

<mesh geometry={nodes.Object_4.geometry} scale={1.14}>
<meshBasicMaterial 
color="#22d3ee"
wireframe={true}
transparent={true}
opacity={0.18}
/>
</mesh>
</group>
</group>
);
}

useGLTF.preload('/earth.gltf');