import React from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import * as THREE from 'three';
//import {OrbitControls} from '@react-three/drei';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { widthState,refState } from '../atom/atom';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { useRef } from 'react';
import { render } from '@testing-library/react';
import {GUI} from "dat.gui";


const Vis = () => {
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(60, window.innerWidth/ window.innerHeight, 1, 10000);
	camera.position.set(0, 0, 10);
	//camera.layers.enable(1);
	var renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.autoClear = false;
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor( 0x101000 );
	document.body.appendChild(renderer.domElement);
	
	var controls = new OrbitControls(camera, renderer.domElement);
	
	var light = new THREE.DirectionalLight(0xffffff, 0.75);
	light.position.setScalar(100);
	scene.add(light);
	scene.add(new THREE.AmbientLight(0xffffff, 0.25));
	
	// var obj = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 4), new THREE.MeshLambertMaterial({color: "red", wireframe: false}));
	// obj.layers.set(0);
	// obj.position.z = 0.25;
	// scene.add(obj);
	
	var objBack = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 1), new THREE.MeshBasicMaterial({color: "red", wireframe: false}));
	objBack.position.z = 0.25;
	//objBack.layers.set(1);
	scene.add(objBack);
	
	/** COMPOSER */
	const renderScene = new RenderPass( scene, camera )
		
	// effectFXAA = new THREE.ShaderPass( THREE.FXAAShader )
	// effectFXAA.uniforms.resolution.value.set( 1 / window.innerWidth, 1 / window.innerHeight )
		
	const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 )
	bloomPass.threshold = 0.21
	bloomPass.strength = 1.2
	bloomPass.radius = 0.55
	bloomPass.renderToScreen = true
		
	const composer = new EffectComposer( renderer )
	composer.setSize( window.innerWidth, window.innerHeight )
		
	composer.addPass( renderScene )
	//composer.addPass( effectFXAA )
	composer.addPass( bloomPass )
		
	// renderer.gammaInput = true
	// renderer.gammaOutput = true
	renderer.toneMappingExposure = Math.pow( 0.9, 4.0 ) 
	camera.position.z = 3;
	render();
	function render(){
	  requestAnimationFrame(render);
	  
	  renderer.clear();
	  
	  //camera.layers.set(1);
	  composer.render();
	  
	  //renderer.clearDepth();
	  //camera.layers.set(0);
	  renderer.render(scene, camera);
	}

  return(
    <div ></div>
)
  }

  export default Vis