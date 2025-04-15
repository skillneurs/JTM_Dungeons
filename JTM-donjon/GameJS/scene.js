export const createScene = function (engine, canvas) {
    const scene = new BABYLON.Scene(engine);

    // Crée une caméra Free
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true); // Assurez-vous que la caméra suit la souris

    // Configurer l'ellipsoïde pour la caméra
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1); // Taille de l'ellipsoïde
    camera.ellipsoidOffset = new BABYLON.Vector3(0, 1, 0); // Décalage de l'ellipsoïde

    // Activer les collisions
    scene.collisionsEnabled = true;
    camera.checkCollisions = true; // Vérifie les collisions de la caméra
    camera.inertia = 0.1

    // Création de la lumière
    //const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    //light.intensity = 0.7;

    // Création du player (sphère)
    const player = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 1, segments: 32 }, scene);
    player.position.y = 1;
    player.checkCollisions = true;

    // Configurer l'ellipsoïde pour le joueur
    player.ellipsoid = new BABYLON.Vector3(1, 1.5, 1); // Taille de l'ellipsoïde
    player.ellipsoidOffset = new BABYLON.Vector3(0, 1, 0); // Décalage de l'ellipsoïde

    // Création du sol
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
    ground.checkCollisions = true;
    const woodTexture = new BABYLON.Texture("/JTM-donjon/Img/plancher.avif", scene);
    const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = woodTexture; // Appliquer la texture au matériau
    ground.material = groundMaterial; // Appliquer le matériau au sol
    player.checkCollisions = true;

    // Création des murs autour du sol
    const wallHeight = 5; // Hauteur des murs
    const wallThickness = 0.5; // Épaisseur des murs
    const groundWidth = 10; // Largeur du sol (doit correspondre à celle du sol)

    // Mur avant
    const wallFront = BABYLON.MeshBuilder.CreateBox("wallFront", { width: groundWidth, height: wallHeight, depth: wallThickness }, scene);
    wallFront.position.z = -groundWidth / 2 - wallThickness / 2; // Position devant le sol
    wallFront.position.y = wallHeight / 2; // Position verticale

    // Créer un matériau pour le mur avant
    const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);

    // Charger une image de texture pour le mur
    const stoneTexture = new BABYLON.Texture("/JTM-donjon/Img/mur.jpg", scene);

    // Appliquer la texture au matériau
    wallMaterial.diffuseTexture = stoneTexture;

    // Ajuster la répétition de la texture si nécessaire
    stoneTexture.uScale = 2; // Répétition horizontale
    stoneTexture.vScale = 2; // Répétition verticale

    // Appliquer le matériau au mur avant
    wallFront.material = wallMaterial;


    // Ajouter une torche réaliste au mur avant
    const torchBase = BABYLON.MeshBuilder.CreateCylinder("torchBase", { diameter: 0.1, height: 1.5 }, scene); // Manche de la torche
    torchBase.position = new BABYLON.Vector3(0, wallHeight - 2, wallFront.position.z + wallThickness / 2 + 0.1); // Position sur le mur avant
    torchBase.rotation.x = Math.PI / 8; // Incliner la torche à 45 degrés sur l'axe X

    // Ajouter la tête de la torche
    const torchHead = BABYLON.MeshBuilder.CreateCylinder("torchHead", { diameterTop: 0.2, diameterBottom: 0.3, height: 0.3 }, scene); // Tête de la torche
    torchHead.parent = torchBase; // Lier la tête au manche
    torchHead.position = new BABYLON.Vector3(0, 0.8, 0); // Position relative au manche

    // Ajouter une lumière ponctuelle pour la torche
    const torchLight = new BABYLON.PointLight("torchLight", BABYLON.Vector3.Zero(), scene);
    torchLight.parent = torchHead; // Lier la lumière à la tête de la torche
    torchLight.position = new BABYLON.Vector3(0, 0.8, 0); // Position relative à la tête
    torchLight.diffuse = new BABYLON.Color3(1, 0.8, 0.5); // Lumière chaude
    torchLight.specular = new BABYLON.Color3(0, 0, 0); // Pas de reflets
    torchLight.intensity = 1; // Intensité initiale de la lumière
    torchLight.range = 15; // Portée de la lumière

    // Ajouter une animation pour simuler une lumière vacillante
    let flickerTime = 0; // Temps accumulé pour contrôler la fréquence du clignotement
    scene.registerBeforeRender(() => {
        flickerTime += scene.getEngine().getDeltaTime(); // Ajouter le temps écoulé depuis la dernière frame
        if (flickerTime > 100) { // Mettre à jour l'intensité toutes les 100 ms (0.1 seconde)
            torchLight.intensity = 1.8 + Math.random() * 0.4; // Faire varier l'intensité entre 1.8 et 2.2
            flickerTime = 0; // Réinitialiser le temps accumulé
        }
    });

    // Ajouter une flamme au-dessus de la torche
    const flame = new BABYLON.ParticleSystem("flame", 2000, scene);
    flame.particleTexture = new BABYLON.Texture("https://playground.babylonjs.com/textures/flare.png", scene);
    flame.emitter = torchHead; // Lier la flamme à la tête de la torche
    flame.minEmitBox = new BABYLON.Vector3(0, 0.2, 0); // Zone minimale d'émission relative à la tête
    flame.maxEmitBox = new BABYLON.Vector3(0, 0.2, 0); // Zone maximale d'émission relative à la tête

    // Paramètres des particules
    flame.color1 = new BABYLON.Color4(1, 0.5, 0, 1); // Couleur orange
    flame.color2 = new BABYLON.Color4(1, 0, 0, 1); // Couleur rouge
    flame.colorDead = new BABYLON.Color4(0, 0, 0, 0); // Couleur lorsqu'elle disparaît

    flame.minSize = 0.1; // Taille minimale des particules
    flame.maxSize = 0.3; // Taille maximale des particules

    flame.minLifeTime = 0.2; // Durée de vie minimale des particules
    flame.maxLifeTime = 0.5; // Durée de vie maximale des particules

    flame.emitRate = 150; // Nombre de particules émises par seconde

    // Direction des particules
    flame.direction1 = new BABYLON.Vector3(0, 1, 0); // Direction vers le haut
    flame.direction2 = new BABYLON.Vector3(0, 1, 0); // Direction vers le haut

    // Vitesse des particules
    flame.minEmitPower = 1;
    flame.maxEmitPower = 2;
    flame.updateSpeed = 0.01;

    // Démarrer le système de particules
    flame.start();

    // Mur arrière
    const wallBack = BABYLON.MeshBuilder.CreateBox("wallBack", { width: groundWidth, height: wallHeight, depth: wallThickness }, scene);
    wallBack.position.z = groundWidth / 2 + wallThickness / 2; // Position derrière le sol
    wallBack.position.y = wallHeight / 2;
    

    // Mur gauche
    const wallLeft = BABYLON.MeshBuilder.CreateBox("wallLeft", { width: wallThickness, height: wallHeight, depth: groundWidth }, scene);
    wallLeft.position.x = -groundWidth / 2 - wallThickness / 2; // Position à gauche du sol
    wallLeft.position.y = wallHeight / 2;
    wallLeft.material = wallMaterial; // Appliquer le matériau au mur gauche

    // Mur droit
    const wallRight = BABYLON.MeshBuilder.CreateBox("wallRight", { width: wallThickness, height: wallHeight, depth: groundWidth }, scene);
    wallRight.position.x = groundWidth / 2 + wallThickness / 2; // Position à droite du sol
    wallRight.position.y = wallHeight / 2;
    wallRight.material = wallMaterial; // Appliquer le matériau au mur droit




    // Découper une fenêtre dans le mur arrière
    const wallBackCSG = BABYLON.CSG.FromMesh(wallBack); // Convertir le mur arrière en CSG
    const windowShapeBack = BABYLON.MeshBuilder.CreateBox("windowShapeBack", { width: 2, height: 1.5, depth: wallThickness + 0.1 }, scene); // Créer la forme de la fenêtre
    windowShapeBack.position = new BABYLON.Vector3(0, wallHeight - 1, wallBack.position.z); // Positionner la fenêtre sur le mur arrière
    const windowCSGBack = BABYLON.CSG.FromMesh(windowShapeBack); // Convertir la fenêtre en CSG
    const wallBackWithWindow = wallBackCSG.subtract(windowCSGBack); // Soustraire la fenêtre du mur arrière
    wallBack.dispose(); // Supprimer l'ancien mur arrière
    windowShapeBack.dispose(); // Supprimer la forme de la fenêtre
    const wallBackWithWindowMesh = wallBackWithWindow.toMesh("wallBackWithWindow", null, scene); // Créer le nouveau mur arrière avec la fenêtre
    wallBackWithWindowMesh.checkCollisions = true; // Activer les collisions pour le mur arrière

    // Ajouter des barreaux à la fenêtre du mur arrière
    const barCountBack = 4; // Nombre de barreaux
    const barSpacingBack = 0.4; // Espacement entre les barreaux
    for (let i = 0; i < barCountBack; i++) {
        const barBack = BABYLON.MeshBuilder.CreateCylinder(`barBack${i}`, { diameter: 0.1, height: 1.5 }, scene); // Créer un barreau
        barBack.position = new BABYLON.Vector3(-0.6 + i * barSpacingBack, wallHeight - 1, wallBack.position.z - wallThickness / 5 ); // Positionner le barreau
        barBack.rotation.x = 0; // Aligner le barreau verticalement
    }

    wallBack.material = wallMaterial;



    // Activer les collisions pour les murs
    wallFront.checkCollisions = true;
    wallBack.checkCollisions = true;
    wallLeft.checkCollisions = true;
    wallRight.checkCollisions = true;

    // Création du plafond
    const ceiling = BABYLON.MeshBuilder.CreateBox("ceiling", { width: groundWidth, height: wallThickness, depth: groundWidth }, scene);
    ceiling.position.y = wallHeight + wallThickness / 2; // Position au-dessus des murs
    ceiling.checkCollisions = true; // Activer les collisions pour le plafond

    //BABYLON.SceneLoader.ImportMesh("", "./GameJS/model/", "Test_prison.gltf", scene)
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
        const moveSpeed = 0.05; // Vitesse de déplacement

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
            player.moveWithCollisions(forward.scale(moveSpeed)); // Déplace la sphère en avant avec collisions
        }
        if (inputMap["KeyS"] || inputMap["ArrowDown"]) {
            player.moveWithCollisions(forward.scale(-moveSpeed)); // Déplace la sphère en arrière avec collisions
        }
        if (inputMap["KeyA"] || inputMap["ArrowLeft"]) {
            player.moveWithCollisions(right.scale(moveSpeed)); // Déplace la sphère à gauche avec collisions
        }
        if (inputMap["KeyD"] || inputMap["ArrowRight"]) {
            player.moveWithCollisions(right.scale(-moveSpeed)); // Déplace la sphère à droite avec collisions
        }
        camera.position.x = player.position.x;
        camera.position.y = player.position.y + 2; // Décalage vertical pour que la caméra soit au-dessus du joueur
        camera.position.z = player.position.z; // Décalage arrière pour éloigner la caméra
    });

    return scene;
};
