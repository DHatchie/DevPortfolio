import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.69 : 0.73}
        position={isMobile ? [0, -3, -2.5] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [zoomedIn, setZoomedIn] = useState(false);
  const orbitControlsRef = useRef();

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const handleModelClick = () => {
    setZoomedIn((prevZoomedIn) => !prevZoomedIn);
    // Toggle the zoom level
    if (orbitControlsRef.current) {
      orbitControlsRef.current.setZoom(prevZoomedIn ? 1 : 2); // Adjust the zoom level as needed
    }
  };

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          ref={orbitControlsRef}
          enableZoom={!zoomedIn} // Disable zooming while the model is zoomed in
          enablePan={!zoomedIn} // Disable panning while the model is zoomed in
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          minDistance={5} // Set the minimum distance (how close the camera can get to the target)
          maxDistance={40} // Set the maximum distance (how far the camera can get from the target)
        />
        <Computers isMobile={isMobile} onModelClick={handleModelClick} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
