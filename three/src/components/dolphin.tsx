import React from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import * as THREE from 'three';
//import {OrbitControls} from '@react-three/drei';
import { widthState,refState } from '../atom/atom';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { useRef } from 'react';

function Dolphin(){
    const [widthAtom,setWidthAtom]=useRecoilState<any>(widthState)
    const [refAtom,setRefAtom]=useRecoilState<any>(refState)
    const [renderer, setRenderer] = React.useState<any>()

    
    React.useEffect(()=>{
        console.log(widthAtom);
    },[widthAtom])

    const handleWindowResize = React.useCallback(() => {
        
        console.log(renderer)
        if (renderer) {
            console.log('111')
          const scW = widthAtom
          const scH = widthAtom
          //rendererInit.setSize(scW, scH)
        }
    
      }, [renderer])

    const rendererInit = new THREE.WebGLRenderer();

    React.useEffect(()=>{
        const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
            let frameId: any
            const handleResize = () => {
                        console.log('resize')
                            let width = widthAtom
                            let height = widthAtom
                            renderer.setSize(width, height)
                            camera.aspect = width / height
                            camera.updateProjectionMatrix()
                            rendererInit.render( scene, camera );
                        }

            rendererInit.setSize(  window.innerWidth, window.innerHeight);
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

                rendererInit.render( scene, camera );
                frameId=window.requestAnimationFrame(animate)
            };
            window.addEventListener('resize', handleResize)
            animate();
            const stop = () => {
                cancelAnimationFrame(frameId)
                frameId = null
              }
          
            // return () => {
            //     stop()
            //     window.removeEventListener('resize', handleResize)
            //     //document.body.removeChild(renderer.domElement)
          
            //     scene.remove(cube)
            //     geometry.dispose()
            //     material.dispose()
            //   }
    },[])
    React.useEffect(() => {
        window.addEventListener('resize', handleWindowResize, false)
        return () => {
          window.removeEventListener('resize', handleWindowResize, false)
        }
      }, [renderer, handleWindowResize])
    return(
        <div></div>
        // <div ref={refContainer}></div>
    )
}

export default Dolphin