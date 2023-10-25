<template>
	<div ref="modelContainer" id="scene"></div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { render } from "vue";

export default {
	name: "ModelRender",
	props: {
		modelUrl: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			renderer: null,
			container: null,
			width: 0,
			height: 0
		};
	},
	updated(){
		this.onWindowResize()
	},
	mounted() {
		this.displayModel(this.modelUrl);
		window.addEventListener("resize", this.onWindowResize);
	},
	methods: {
		displayModel(modelUrl) {
			const renderer = new THREE.WebGLRenderer({ alpha: true });
			const container = this.$refs.modelContainer;
			this.height = window.innerHeight/2
			this.width = window.innerWidth
			const height = this.height
			const width = this.width
			renderer.setSize(width/2, height);

			var scene = new THREE.Scene();
			scene.background = null;

			const camera = new THREE.PerspectiveCamera(45, width / height / 2, 1, 10);
			camera.position.z = 5;

			const controls = new OrbitControls(camera, renderer.domElement);
			camera.position.set(0, 0, 5);
			controls.update();

			function animate() {
				requestAnimationFrame(animate);
				controls.update();
				renderer.render(scene, camera);
			}
			animate();
			renderer.setPixelRatio(window.devicePixelRatio);
			container.appendChild(renderer.domElement);

			// document.body.appendChild(renderer.domElement);

			function createLight() {
				const light = new THREE.AmbientLight(0xffffff); // soft white light
				scene.add(light);
			}
			createLight();

			const loader = new GLTFLoader();
			var path = modelUrl;

			loader.load(
				path,
				function (gltf) {
					let char = gltf.scene;
					window.char = char;
					var box = new THREE.Box3().setFromObject(char);
					var center = new THREE.Vector3();
					box.getCenter(center);
					char.position.sub(center);
					scene.add(char);
				},
				undefined,
				function (error) {
					console.error(error);
				}
			);
			this.renderer = renderer;
			this.container = container;
		},
		onWindowResize() {
			const renderer = this.renderer;
			renderer.setPixelRatio(window.devicePixelRatio)
			renderer.setSize(this.width / 2, this.height);
		},
	},
};
</script>

<style>
#scene {
	width: 100%;
	height: 400px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
