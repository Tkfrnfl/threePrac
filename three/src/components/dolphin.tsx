import React from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import * as THREE from 'three';
//import {OrbitControls} from '@react-three/drei';
import { widthState,refState } from '../atom/atom';
import { useSetRecoilState, useRecoilState } from 'recoil';

function Dolphin(){
    const [widthAtom,setWidthAtom]=useRecoilState<any>(widthState)
    const [refAtom,setRefAtom]=useRecoilState<any>(refState)
    const [renderer, setRenderer] = React.useState<any>()

    const refContainer = refAtom

    const handleWindowResize = React.useCallback(() => {
        const { current: container }:any = refContainer
        if (container && renderer) {
          const scW = container.clientWidth
          const scH = container.clientHeight
    
          renderer.setSize(scW, scH)
        }
      }, [renderer])
    
    React.useEffect(() => {
        window.addEventListener('resize', handleWindowResize, false)
        console.log(refAtom)
        return () => {
          window.removeEventListener('resize', handleWindowResize, false)
        }
      }, [renderer, handleWindowResize])  


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const rendererInit = new THREE.WebGLRenderer();

    const { current: container }:any = refContainer
    console.log(container)
    const scW = container.clientWidth
    const scH = container.clientHeight
    rendererInit.setSize( scW, scH );
    document.body.appendChild( rendererInit.domElement );
    setRenderer(rendererInit)  

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 3;

    function animate() {
        requestAnimationFrame( animate );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render( scene, camera );
    };

    animate();
    return(
        <div></div>
    )
}

export default Dolphin