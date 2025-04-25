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

    // Découper une porte rectangulaire dans le mur droit
    const wallRightCSG = BABYLON.CSG.FromMesh(wallRight); // Convertir le mur droit en CSG

    // Créer la forme rectangulaire de la porte
    const doorShape = BABYLON.MeshBuilder.CreateBox("doorShape", { width: 2, height: 5, depth: wallThickness + 3 }, scene);
    doorShape.position = new BABYLON.Vector3(wallRight.position.x, 1.5, 0); // Positionner la porte au milieu du mur droit

    // Soustraire la porte du mur droit
    const wallRightWithDoor = wallRightCSG.subtract(BABYLON.CSG.FromMesh(doorShape)); // Soustraire la porte
    wallRight.dispose(); // Supprimer l'ancien mur droit
    doorShape.dispose(); // Supprimer la forme de la porte

    // Créer le nouveau mur droit avec la porte
    const wallRightWithDoorMesh = wallRightWithDoor.toMesh("wallRightWithDoor", null, scene);
    wallRightWithDoorMesh.material = wallMaterial; // Appliquer le matériau au mur droit
    wallRightWithDoorMesh.checkCollisions = true; // Activer les collisions pour le mur droit

    // Ajouter deux moitiés de porte à partir de la porte existante
    const doorLeft = BABYLON.MeshBuilder.CreateBox("doorLeft", { width: 2, height: 4, depth: 0.4 }, scene); // Moitié gauche
    doorLeft.position = new BABYLON.Vector3(wallRightWithDoorMesh.position.x - 0.75, 2, -1.75); // Positionner la moitié gauche
    doorLeft.rotation.y = Math.PI / 2; // Position fermée initiale
    doorLeft.setPivotMatrix(BABYLON.Matrix.Translation(-0.75, 0, 0)); // Déplacer le pivot vers le bord droit




    const doorRight = BABYLON.MeshBuilder.CreateBox("doorRight", { width: 2, height: 4, depth: 0.4 }, scene); // Moitié droite
    doorRight.position = new BABYLON.Vector3(wallRightWithDoorMesh.position.x + 0.75, 2, 1.75); // Positionner la moitié droite
    doorRight.rotation.y = Math.PI / 2; // Position fermée initiale
    doorRight.setPivotMatrix(BABYLON.Matrix.Translation(0.75, 0, 0)); // Déplacer le pivot vers le bord gauche



    // Appliquer un matériau aux deux moitiés
    const doorMaterial = new BABYLON.StandardMaterial("doorMaterial", scene);
    const doorTexture = new BABYLON.Texture("/JTM-donjon/Img/porte.webp", scene); // Charger une texture pour la porte
    doorMaterial.diffuseTexture = doorTexture; // Appliquer la texture au matériau
    doorLeft.material = doorMaterial;
    doorRight.material = doorMaterial;

    // Activer les collisions pour les deux moitiés
    doorLeft.checkCollisions = true;
    doorRight.checkCollisions = true;




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
        barBack.position = new BABYLON.Vector3(-0.6 + i * barSpacingBack, wallHeight - 1, wallBack.position.z - wallThickness / 5); // Positionner le barreau
        barBack.rotation.x = 0; // Aligner le barreau verticalement
    }

    wallBackWithWindowMesh.material = wallMaterial;



    // Activer les collisions pour les murs
    wallFront.checkCollisions = true;
    wallBack.checkCollisions = true;
    wallLeft.checkCollisions = true;
    wallRight.checkCollisions = true;

    // Création du plafond
    const ceiling = BABYLON.MeshBuilder.CreateBox("ceiling", { width: groundWidth, height: wallThickness, depth: groundWidth }, scene);
    ceiling.position.y = wallHeight + wallThickness / 2; // Position au-dessus des murs
    ceiling.checkCollisions = true; // Activer les collisions pour le plafond

    // Ajouter un ciel bleu
    const skybox = BABYLON.MeshBuilder.CreateSphere("skybox", { diameter: 1000, segments: 32 }, scene);
    skybox.infiniteDistance = true; // Le ciel reste fixe par rapport à la caméra

    // Créer un matériau pour le ciel
    const skyMaterial = new BABYLON.StandardMaterial("skyMaterial", scene);
    skyMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.8, 1); // Bleu clair
    skyMaterial.specularColor = new BABYLON.Color3(0, 0, 0); // Pas de reflets
    skyMaterial.backFaceCulling = false; // Afficher l'intérieur de la sphère
    skybox.material = skyMaterial;

    // Ajouter une lumière directionnelle pour simuler le soleil
    const sunLight = new BABYLON.DirectionalLight("sunLight", new BABYLON.Vector3(0, -1, 0), scene);
    sunLight.position = new BABYLON.Vector3(50, 50, 50);
    sunLight.intensity = 1.5; // Intensité de la lumière

    // Ajouter une sphère jaune pour représenter le soleil
    const sun = BABYLON.MeshBuilder.CreateSphere("sun", { diameter: 5 }, scene);
    sun.position = sunLight.position; // Positionner la sphère au même endroit que la lumière
    const sunMaterial = new BABYLON.StandardMaterial("sunMaterial", scene);
    sunMaterial.emissiveColor = new BABYLON.Color3(1, 1, 0); // Jaune brillant
    sun.material = sunMaterial;

    // Ajouter un générateur d'ombres pour la lumière directionnelle
    const shadowGenerator = new BABYLON.ShadowGenerator(1024, sunLight);
    shadowGenerator.useBlurExponentialShadowMap = true; // Activer les ombres floues
    shadowGenerator.blurScale = 2; // Ajuster le flou des ombres
    shadowGenerator.setDarkness(0.5); // Ajuster l'obscurité des ombres

    // Ajouter les objets qui projettent des ombres
    shadowGenerator.addShadowCaster(wallFront);
    shadowGenerator.addShadowCaster(wallBackWithWindowMesh);
    shadowGenerator.addShadowCaster(wallLeft);
    shadowGenerator.addShadowCaster(wallRightWithDoorMesh);
    shadowGenerator.addShadowCaster(ceiling);

    // Activer la réception des ombres
    ground.receiveShadows = true;
    wallFront.receiveShadows = true;
    wallBackWithWindowMesh.receiveShadows = true;
    wallLeft.receiveShadows = true;
    wallRightWithDoorMesh.receiveShadows = true;
    ceiling.receiveShadows = true;

    //BABYLON.SceneLoader.ImportMesh("", "./GameJS/model/", "Test_prison.gltf", scene)
    // Gérer les entrées clavier pour le mouvement
    let inputMap = {
        "KeyW": false,
        "KeyA": false,
        "KeyS": false,
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

    // Fonction pour vérifier si les portes peuvent s'ouvrir
    let canOpenDoors = false
    scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN) {
            // Vérifiez si le pointeur est verrouillé
            if (document.pointerLockElement === canvas) {
                if (pointerInfo.pickInfo.hit) {
                    const pickedMesh = pointerInfo.pickInfo.pickedMesh;

                    // Vérifiez si l'objet cliqué est une porte
                    if (pickedMesh.name === "doorLeft" || pickedMesh.name === "doorRight") {
                        let code = document.getElementById("codeBefore");
                        code.id = "code";
                        let code_input = document.getElementById("codeInput");
                        let sub_code = document.getElementById("submitCode");
                        sub_code.addEventListener("click", function () {
                            // Vérifiez si le code est correct
                            if (code_input.value == '2606') {
                                canOpenDoors = true;
                                code.id = "codeBefore";
                                setTimeout(() => {
                                    window.location = "couloir.html";
                                }, 5000);
                            } else {
                                let p = document.createElement("p");
                                p.textContent = "Code incorrect !";
                                p.style.color = "red";
                                p.style.fontSize = "20px";
                                code.appendChild(p);
                                setTimeout(() => {
                                    p.remove();
                                    code.id = "codeBefore";
                                }, 2000);
                            }

                            // Vérifiez si les portes ne sont pas déjà ouvertes
                            if (!doorLeft.isOpen && !doorRight.isOpen) {
                                // Vérifiez si les conditions pour ouvrir les portes sont remplies
                                if (canOpenDoors) {
                                    // Définir les animations pour la porte gauche
                                    const leftDoorAnimation = new BABYLON.Animation(
                                        "leftDoorAnimation",
                                        "rotation.y",
                                        30, // Framerate
                                        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
                                    );

                                    const leftKeys = [
                                        { frame: 0, value: doorLeft.rotation.y }, // Position actuelle
                                        { frame: 30, value: doorLeft.rotation.y - Math.PI / 2 } // Rotation finale
                                    ];

                                    leftDoorAnimation.setKeys(leftKeys);
                                    doorLeft.animations = [];
                                    doorLeft.animations.push(leftDoorAnimation);

                                    // Définir les animations pour la porte droite
                                    const rightDoorAnimation = new BABYLON.Animation(
                                        "rightDoorAnimation",
                                        "rotation.y",
                                        30, // Framerate
                                        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
                                    );

                                    const rightKeys = [
                                        { frame: 0, value: doorRight.rotation.y }, // Position actuelle
                                        { frame: 30, value: doorRight.rotation.y + Math.PI / 2 } // Rotation finale
                                    ];

                                    rightDoorAnimation.setKeys(rightKeys);
                                    doorRight.animations = [];
                                    doorRight.animations.push(rightDoorAnimation);

                                    // Lancer les animations pour les deux portes
                                    scene.beginAnimation(doorLeft, 0, 30, false);
                                    scene.beginAnimation(doorRight, 0, 30, false);

                                    // Marquer les portes comme ouvertes
                                    doorLeft.isOpen = true;
                                    doorRight.isOpen = true;
                                }
                            }
                        });
                    } else if (pickedMesh.name === "torchBase" || pickedMesh.name === "torchHead") {

                        let message = document.getElementById("message_coder");
                        if (message) {
                            message.classList.add("visible"); // Ajoutez une classe pour afficher le message
                            setTimeout(() => {
                                message.classList.remove("visible"); // Supprimez la classe après 5 secondes
                            }, 5000);
                        }
                    }
                }
            }
        }
    });
    
    // Gérer le clic de la souris pour verrouiller le pointeur
    return scene;
}