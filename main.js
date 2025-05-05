import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

	const fov = 75;
	const aspect = canvas.clientWidth / canvas.clientHeight;
	const near = 0.1;
	const far = 50;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set(0, 2, 5);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();

	const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');
    addLight([1, 0, 0])
    addLight([1, 0, 1])
    addLight([1, 1, 0])
    addLight([1, 1, 1])
    addLight([0, 1, 0])
    addLight([0, 1, 1])
    addLight([0, 0, 1])
    addLight([0, 0, 0])

    function addLight(position) {
        const color = 0xFFFFFF;
        const intensity = 3;
        const light = new THREE.DirectionalLight( color, intensity );
        light.position.set( ...position );
        scene.add( light );
        scene.add( light.target );
    }

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );

	function makeInstance( geometry, color, x ) {

		const material = new THREE.MeshPhongMaterial( { color } );

		const cube = new THREE.Mesh( geometry, material );
		scene.add( cube );

		cube.position.x = x;

		return cube;

	}

	const cubes = [
		makeInstance( geometry, 0x44aa88, 0 ),
		makeInstance( geometry, 0x8844aa, - 2 ),
		makeInstance( geometry, 0xaa8844, 2 ),
	];

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

	function render( time ) {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

main();
