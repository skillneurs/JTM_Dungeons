import { createScene } from './scene.js';
import './PointerLock.js'; // Import de la fonction createScene

window.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    var scene = createScene(engine, canvas); // Création de la scène

    engine.runRenderLoop(function () {
        scene.render(); // Rendu de la scène à chaque image
    });

    window.addEventListener("resize", function () {
        engine.resize(); // Redimensionne le moteur quand la fenêtre change de taille
    });
});
