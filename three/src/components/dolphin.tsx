import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// import {OrbitControls} from '@react-three/drei';yarn add eslint-config-prettier eslint-plugin-prettier
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useSetRecoilState, useRecoilState } from 'recoil';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Object3D } from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { widthState, refState } from '../atom/atom';

function Dolphin() {
  const [widthAtom, setWidthAtom] = useRecoilState<any>(widthState);
  const [refAtom, setRefAtom] = useRecoilState<any>(refState);
  const [renderer, setRenderer] = React.useState<any>();
  const refContainer = useRef(null);
  const refRenderer = useRef<any|null>(null);

  React.useEffect(() => {
    console.log(widthAtom);
  }, [widthAtom]);

  // dynamic resizeing
  const handleWindowResize = React.useCallback(() => {
    const { current: renderer } :any = refRenderer;
    const { current: container } :any = refContainer;
    if (container && renderer) {
      const scW = container.clientWidth;
      console.log(`${scW}rr`);
      console.log(container);
      const scH = 300;

      renderer.setSize(scW, scH);
    }
    console.log('set');
  }, []);

  // starting scene
  React.useEffect(() => {
    const scene = new THREE.Scene();

    let Mesh :Object3D;
    scene.background = new THREE.Color(0x00fff);
    console.log(widthAtom);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const { current: container }:any = refContainer;

    console.log(widthAtom);
    let scW = container.clientWidth;
    const scH = 300;
    const rendererInit = new THREE.WebGLRenderer();
    rendererInit.setPixelRatio(window.devicePixelRatio);
    rendererInit.setSize(scW, scH);

    container.appendChild(rendererInit.domElement);
    refRenderer.current = rendererInit;
    // setRenderer(rendererInit)

    scene.add(new THREE.AmbientLight(0x404040));

    // setblooming
    const params = {
      exposure: 1,
      bloomStrength: 1.5,
      bloomThreshold: 0,
      bloomRadius: 0,
    };

    const renderScene = new RenderPass(scene, camera);

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;

    const bloomComposer = new EffectComposer(rendererInit);
    bloomComposer.renderToScreen = false;
    // bloomComposer.addPass( renderScene);
    // bloomComposer.addPass( bloomPass );

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    // obj load
    const dolphin = new OBJLoader();
    const objPath = './obj/dolphin.obj';
    dolphin.load(
      objPath,
      (obj) => {
        obj.scale.set(1, 1, 1);
        obj.rotation.set(-45 * 180, 0, 0);
        console.log(obj);
        Mesh = obj;
        scene.add(obj);
        console.log(scene);
        // dolphin.obj = obj;
      },

      (xhr) => {
        console.log(xhr.loaded / xhr.total * 100, '% loaded');
      },

      (error) => {
        alert(error);
      },
    );
    console.log(dolphin);
    camera.position.z = 3;

    let req :any = null;
    let frame = 0;

    // const controls = new OrbitControls(camera, rendererInit.domElement)
    // controls.autoRotate = true

    const animate = () => {
      req = requestAnimationFrame(animate);

      frame = frame <= 100 ? frame + 1 : frame;
      scW = container.clientWidth;
      rendererInit.setSize(scW, scH);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      if (Mesh) Mesh.rotation.y += 0.01;

      rendererInit.render(scene, camera);
      bloomComposer.addPass(renderScene);
      bloomComposer.addPass(bloomPass);
    };

    animate();
    console.log('?');
    return () => {
      console.log('end');
      cancelAnimationFrame(req);
      rendererInit.domElement.remove();
      rendererInit.dispose();
    };
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false);
    return () => {
      window.removeEventListener('resize', handleWindowResize, false);
    };
  }, [handleWindowResize]);
  return (
    <div ref={refContainer} />
  // <div ref={refContainer}></div>
  );
}

export default Dolphin;
