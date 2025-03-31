export const createScene = function (engine, canvas) {
    const scene = new BABYLON.Scene(engine);

    // Crée une caméra Free
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true); // Assurez-vous que la caméra suit la souris

    // Activer les collisions
    scene.collisionsEnabled = true;
    camera.inertia = 0.1

    // Création de la lumière
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Création du player (sphère)
    const player = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    player.position.y = 1;
    player.checkCollisions = true;

    // Création du sol
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);
    ground.checkCollisions = true;
    
    // Gérer les entrées clavier pour le mouvement
    let inputMap = {
        "KeyW": false,  // Correspond à la touche "Z"
        "KeyA": false,  // Correspond à la touche "Q"
        "KeyS": false,  // Correspond à la touche "S"
        "KeyD": false,
        "ArrowUp": false,
        "ArrowDown": false,
        "ArrowLeft": false,
        "ArrowRight": false
    };

    document.addEventListener('keydown', (e) => {
        if (inputMap[e.code] !== undefined) {
            inputMap[e.code] = true;
            console.log(`Key down: ${e.code}`); // Débogage
        }
    });

    document.addEventListener('keyup', (e) => {
        if (inputMap[e.code] !== undefined) {
            inputMap[e.code] = false;
            console.log(`Key up: ${e.code}`); // Débogage
        }
    });

    // Déplacement de la sphère

    scene.onBeforeRenderObservable.add(() => {
        const moveSpeed = 0.2; // Vitesse de déplacement

        // Calcul de la direction de la caméra (avant)
        const forward = new BABYLON.Vector3(
            Math.sin(camera.rotation.y),
            0,
            Math.cos(camera.rotation.y)
        ).normalize(); // Vecteur de direction devant la caméra

        // Calcul de la direction latérale de la caméra (droite)
        const right = new BABYLON.Vector3(
            Math.sin(camera.rotation.y - Math.PI / 2),
            0,
            Math.cos(camera.rotation.y - Math.PI / 2)
        ).normalize();

        if (inputMap["KeyW"] || inputMap["ArrowUp"]) {
            player.position.addInPlace(forward.scale(moveSpeed));  // Déplace la sphère en avant
        }
        if (inputMap["KeyS"] || inputMap["ArrowDown"]) {
            player.position.addInPlace(forward.scale(-moveSpeed));  // Déplace la sphère en arrière
        }
        if (inputMap["KeyA"] || inputMap["ArrowLeft"]) {
            player.position.addInPlace(right.scale(moveSpeed));
            // Déplace la sphère à gauche
        }
        if (inputMap["KeyD"] || inputMap["ArrowRight"]) {
            player.position.addInPlace(right.scale(-moveSpeed));  // Déplace la sphère à droite
        }
        camera.position.x = player.position.x
        camera.position.y = player.position.y
        camera.position.z = player.position.z
    });

    return scene;
};
