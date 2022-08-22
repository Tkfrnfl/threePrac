import React from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import * as THREE from 'three';
//import {OrbitControls} from '@react-three/drei';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { widthState,refState } from '../atom/atom';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { useRef } from 'react';

function Dolphin(){
    const [widthAtom,setWidthAtom]=useRecoilState<any>(widthState)
    const [refAtom,setRefAtom]=useRecoilState<any>(refState)
    const [renderer, setRenderer] = React.useState<any>()
    const refContainer = useRef(null)
    const refRenderer = useRef<any|null>(null)

    React.useEffect(()=>{
        console.log(widthAtom);
    },[widthAtom])

  const handleWindowResize = React.useCallback(() => {
    const { current: renderer } :any = refRenderer
    const { current: container } :any = refContainer
    if (container && renderer) {
      
      const scW = container.clientWidth
      console.log(scW)
      const scH = container.clientHeight

      renderer.setSize(scW, scH)
    }
    console.log('set')
  }, [])


    React.useEffect(()=>{
        const scene = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
            const { current: container }:any = refContainer
            
            
              console.log(container)
              const scW = container.clientWidth*3
              const scH = 300

              const rendererInit = new THREE.WebGLRenderer()
              rendererInit.setPixelRatio(window.devicePixelRatio)
              rendererInit.setSize(scW, scH)

              container.appendChild(rendererInit.domElement)
              refRenderer.current=rendererInit
              //setRenderer(rendererInit)  

              const geometry = new THREE.BoxGeometry( 1, 1, 1 );
              const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
              const cube = new THREE.Mesh( geometry, material );
              scene.add( cube );

              camera.position.z = 3;

              let req :any= null   
              let frame = 0

              // const controls = new OrbitControls(camera, rendererInit.domElement)
              // controls.autoRotate = true

              const animate=()=> {
                req = requestAnimationFrame(animate)
                
                frame = frame <= 100 ? frame + 1 : frame

                  cube.rotation.x += 0.01;
                  cube.rotation.y += 0.01;
                  rendererInit.render( scene, camera );

              };
              animate();
              console.log('?')
              return () => {
                console.log('end')
                            cancelAnimationFrame(req)
                            rendererInit.domElement.remove()
                            rendererInit.dispose()
              }     
          
    },[])

    React.useEffect(() => {
        window.addEventListener('resize', handleWindowResize, false)
        return () => {
          window.removeEventListener('resize', handleWindowResize, false)
        }
      }, [handleWindowResize])
    return(
        <div ref={refContainer}></div>
        // <div ref={refContainer}></div>
    )
}

export default Dolphin