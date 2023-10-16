<template> 
    <div ref="modelContainer"> 
        
    </div>
</template>



<script>
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
export default {
    name : "ModelRender",
    methods: {
    displayModel(){
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize( window.innerWidth, window.innerHeight);


            var scene = new THREE.Scene();
            scene.background = new THREE.Color( 0x367055)

            const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 10000 );
            camera.position.z = 5;

            const controls = new OrbitControls( camera, renderer.domElement );
            camera.position.set( 0, 2, 1 );
            controls.update();

            function animate() {
                requestAnimationFrame( animate );
                controls.update();
                renderer.render( scene, camera );
            }
            animate();
            this.$refs.modelContainer.appendChild(renderer.domElement);

            // document.body.appendChild( renderer.domElement );



            function createLight(){
            const light = new THREE.AmbientLight( 0xffffff ); // soft white light
            scene.add( light );
            }
            createLight()


            const loader = new GLTFLoader();
            var path = "/3DModels/knight.glb"

            loader.load( path,  function ( gltf ) {
                let char = gltf.scene
                window.char=char
                scene.add( char );

            }, undefined, function ( error ) {

                console.error( error );

    } )
    },},
        mounted(){
            this.displayModel()
        }}
    </script>
