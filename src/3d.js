import "./style.css";
import * as THREE from "three";

function init_threejs() {
	const canvas = document.getElementById("three-canvas");
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(
		75,
		canvas.clientWidth / canvas.clientHeight,
		0.1,
		1000
	);
	const renderer = new THREE.WebGLRenderer({ canvas, alpha: true }); // Enable transparent background
	const ambientLight = new THREE.AmbientLight(0xffffff);
	renderer.setSize(canvas.clientWidth, canvas.clientHeight);

	// Create the objects
	const geometry = new THREE.SphereGeometry(3, 32, 16);//, 0, Math.PI*2, Math.PI-3, Math.PI - 2*(Math.PI-3));
	const material = new THREE.MeshBasicMaterial({
		color: 0x00a5d8,
		wireframe: true,
	});
	const sphere = new THREE.Mesh(geometry, material);
	scene.add(sphere);
	scene.add(ambientLight);

	camera.position.z = 5;

	// Animation Loop
	function animate() {
		requestAnimationFrame(animate);
		sphere.rotation.x += 0.005;
		sphere.rotation.y += 0.005;
		sphere.rotation.z += 0.005;
		renderer.render(scene, camera);
	}

	animate();

	// Handle resizing
	window.addEventListener("resize", () => {
		const { clientWidth, clientHeight } = canvas;
		camera.aspect = clientWidth / clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(clientWidth, clientHeight);
	});
}

document.addEventListener("DOMContentLoaded", init_threejs);
