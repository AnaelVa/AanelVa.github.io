      import * as THREE from '../build/three.module.js';

      var tw = window.innerWidth ;
      var th = window.innerHeight ;

      const canvas = document.getElementById('canvas1');

      canvas.width = 500 * window.devicePixelRatio;
			canvas.height = 350 * window.devicePixelRatio;

      const context = canvas.getContext( '2d' );

      const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );



       scene.background = new THREE.Color( 0xff0000 );

       renderer.outputEncoding = THREE.sRGBEncoding;
       renderer.setPixelRatio( window.devicePicelRatio );
       renderer.setSize( canvas.width , canvas.height );
       canvas.appendChild( renderer.domElement );

			const geometry = new THREE.BoxGeometry( 1, 1, 1 );
			const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 5;

			function animate() {
				requestAnimationFrame( animate );

				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;
        context.drawImage( renderer.domElement, 0, 0 );

				renderer.render( scene, camera );
			};

			animate();
