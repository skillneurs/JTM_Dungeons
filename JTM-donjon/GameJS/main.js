import { createScene } from './scene.js';
import './PointerLock.js'; 
const start = document.querySelector('#closePopup');

start.addEventListener("click", function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    var scene = createScene(engine, canvas); // Création de la scène

    // Sélectionner l'élément HTML pour afficher les FPS
    const fpsCounter = document.getElementById("fpsCounter");

    engine.runRenderLoop(function () {
        scene.render(); // Rendu de la scène à chaque image

        // Mettre à jour les FPS
        const fps = Math.round(engine.getFps());
        fpsCounter.textContent = `FPS: ${fps}`;
    });

    window.addEventListener("resize", function () {
        engine.resize(); // Redimensionne le moteur quand la fenêtre change de taille
    });
});
