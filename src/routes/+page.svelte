<script>
    import { onMount, onDestroy } from 'svelte';

    let container;
    let cleanup;

    onDestroy(() => {
        cleanup?.();
    });

    onMount(async () => {
        if (!container) return;

        const THREE = await import('three');

        // --------------------------------------------------------
        // 1. SETUP & CONFIGURATION
        // --------------------------------------------------------
        const PIXEL_SCALE = 4;

        let width = Math.max(1, Math.floor(window.innerWidth / PIXEL_SCALE));
        let height = Math.max(1, Math.floor(window.innerHeight / PIXEL_SCALE));

        const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
        renderer.setSize(width, height, false); // false prevents modifying CSS style directly
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        container.appendChild(renderer.domElement);

        // --------------------------------------------------------
        // 2. 3D SCENE & OBJECTS
        // --------------------------------------------------------
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 3, 12);

        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shininess: 150,
            flatShading: true
        });

        // Centerpiece: Torus Knot
        const knotGeometry = new THREE.TorusKnotGeometry(2.5, 0.8, 128, 16);
        const knot = new THREE.Mesh(knotGeometry, material);
        knot.castShadow = true;
        knot.receiveShadow = true;
        scene.add(knot);

        // Floating geometric shapes
        const floaterGeometries = [
            new THREE.BoxGeometry(1.5, 1.5, 1.5),
            new THREE.IcosahedronGeometry(1.2, 0),
            new THREE.TetrahedronGeometry(1.5, 0)
        ];

        const floaters = [];
        for (let i = 0; i < 8; i++) {
            const mesh = new THREE.Mesh(
                floaterGeometries[i % floaterGeometries.length],
                material
            );
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            mesh.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10 - 2
            );

            scene.add(mesh);
            floaters.push({
                mesh,
                speedX: (Math.random() - 0.5) * 0.04,
                speedY: (Math.random() - 0.5) * 0.04,
                orbitSpeed: Math.random() * 0.02 + 0.01,
                radius: Math.random() * 5 + 4
            });
        }

        // --------------------------------------------------------
        // 3. LIGHTING
        // --------------------------------------------------------
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(10, 15, 10);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 512;
        dirLight.shadow.mapSize.height = 512;
        dirLight.shadow.camera.near = 1;
        dirLight.shadow.camera.far = 30;
        dirLight.shadow.camera.left = -10;
        dirLight.shadow.camera.right = 10;
        dirLight.shadow.camera.top = 10;
        dirLight.shadow.camera.bottom = -10;
        scene.add(dirLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
        fillLight.position.set(-10, -5, -10);
        scene.add(fillLight);

        // --------------------------------------------------------
        // 4. POST-PROCESSING: 1-BIT DITHER SHADER
        // --------------------------------------------------------
        const renderTarget = new THREE.WebGLRenderTarget(width, height, {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat
        });

        const bayerSize = 8;
        const bayerData = new Uint8Array(
            [
                0, 32, 8, 40, 2, 34, 10, 42,
                48, 16, 56, 24, 50, 18, 58, 26,
                12, 44, 4, 36, 14, 46, 6, 38,
                60, 28, 52, 20, 62, 30, 54, 22,
                3, 35, 11, 43, 1, 33, 9, 41,
                51, 19, 59, 27, 49, 17, 57, 25,
                15, 47, 7, 39, 13, 45, 5, 37,
                63, 31, 55, 23, 61, 29, 53, 21
            ].map((v) => v * 4)
        );

        const bayerTex = new THREE.DataTexture(
            bayerData,
            bayerSize,
            bayerSize,
            THREE.RedFormat
        );
        bayerTex.minFilter = THREE.NearestFilter;
        bayerTex.magFilter = THREE.NearestFilter;
        bayerTex.wrapS = THREE.RepeatWrapping;
        bayerTex.wrapT = THREE.RepeatWrapping;
        bayerTex.needsUpdate = true;

        const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const postScene = new THREE.Scene();

        const postMaterial = new THREE.ShaderMaterial({
            uniforms: {
                tDiffuse: { value: renderTarget.texture },
                tBayer: { value: bayerTex },
                bayerSize: { value: bayerSize }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D tDiffuse;
                uniform sampler2D tBayer;
                uniform float bayerSize;
                varying vec2 vUv;

                void main() {
                    vec4 texColor = texture2D(tDiffuse, vUv);
                    float lum = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
                    vec2 bayerCoord = gl_FragCoord.xy / bayerSize;
                    float bayerValue = texture2D(tBayer, bayerCoord).r;
                    float finalColor = step(bayerValue, lum);
                    gl_FragColor = vec4(vec3(finalColor), 1.0);
                }
            `
        });

        const postQuadGeometry = new THREE.PlaneGeometry(2, 2);
        const postQuad = new THREE.Mesh(postQuadGeometry, postMaterial);
        postScene.add(postQuad);

        // --------------------------------------------------------
        // 5. INTERACTIVITY & ANIMATION
        // --------------------------------------------------------
        let mouseX = 0;
        let mouseY = 0;

        function onMouseMove(e) {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        }

        function onTouchMove(e) {
            if (e.touches && e.touches.length > 0) {
                mouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
                mouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
            }
        }

        function onResize() {
            width = Math.max(1, Math.floor(window.innerWidth / PIXEL_SCALE));
            height = Math.max(1, Math.floor(window.innerHeight / PIXEL_SCALE));

            renderer.setSize(width, height, false);
            renderTarget.setSize(width, height);

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('resize', onResize);

        let animId;
        let time = 0;

        function animate() {
            animId = requestAnimationFrame(animate);
            time += 0.01;

            // Rotate main object
            knot.rotation.x = time * 0.5;
            knot.rotation.y = time * 0.8;

            // Orbit floaters
            floaters.forEach((floater, i) => {
                floater.mesh.rotation.x += floater.speedX;
                floater.mesh.rotation.y += floater.speedY;
                floater.mesh.position.y += Math.sin(time * 2 + i) * 0.02;
            });

            // Parallax camera movement based on mouse / touch
            camera.position.x += (mouseX * 4 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 4 + 3 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);

            // PASS 1: Render 3D scene to off-screen buffer
            renderer.setRenderTarget(renderTarget);
            renderer.render(scene, camera);

            // PASS 2: Render off-screen buffer through dither shader to screen
            renderer.setRenderTarget(null);
            renderer.render(postScene, postCamera);
        }

        animId = requestAnimationFrame(animate);

        cleanup = () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('resize', onResize);

            renderer.dispose();
            renderTarget.dispose();
            bayerTex.dispose();
            knotGeometry.dispose();
            material.dispose();
            postMaterial.dispose();
            postQuadGeometry.dispose();
            floaterGeometries.forEach((g) => g.dispose());

            if (renderer.domElement && renderer.domElement.parentElement) {
                renderer.domElement.parentElement.removeChild(renderer.domElement);
            }
        };
    });
</script>

<div class="landing-page">
    <div class="canvas-container" bind:this={container}></div>

    <a class="content-overlay" href="/site">
        <h1>ErikG</h1>
        <p class="desktop-text">Where am I?<br /> Oh it's just art.</p>
        <p class="mobile-text">Where am I?</p>
    </a>
</div>

<style>
  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: 'DM Mono', monospace;
  }

  .landing-page {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    color: white;
  }

  .canvas-container {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .canvas-container :global(canvas) {
    width: 100% !important;
    height: 100% !important;
    display: block;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }

  .content-overlay {
	display: block;
	text-decoration: none;
	box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
	min-width: 250px;
    text-align: center;
	background: black;
    color: white;
    cursor: pointer;
    user-select: none;
	padding: 2rem 3rem;
	border: 2px solid white;
	letter-spacing: 4px;
	box-shadow: 10px 10px 0px 0px white;
	transition: box-shadow 0.2s ease, transform 0.2s ease;
  }

  .content-overlay:hover {
	box-shadow: 20px 20px 0px 0px white;
    transform: translate(-50%, -52%);
  }

  .content-overlay h1 {
    font-size: clamp(2.2rem, 6vw, 3.8rem);
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.02em;
    color: white;
  }

  .content-overlay p {
    font-size: clamp(0.9rem, 2.5vw, 1.15rem);
    margin: 0;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.5;
  }

  .desktop-text {
    display: block;
  }

  .mobile-text {
    display: none;
  }

  @media (max-width: 700px) {
    .desktop-text {
      display: none;
    }
    .mobile-text {
      display: block;
    }
  }
</style>
