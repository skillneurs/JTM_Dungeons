import { createScene } from './scene.js';
import './PointerLock.js';
const start = document.querySelector('#closePopup');
const section = document.getElementById('qst1');
const sub = document.querySelector('#sub');
const popup = document.querySelector('.popup');
const radio = document.querySelectorAll('.check input[type="checkbox"]');




start.addEventListener("click", function () {
    section.classList.remove('none')
    section.classList.add('qst1') // Ajoute la classe qst1 à la section
    popup.classList.add('none');
    popup.classList.remove('popup') // Masque le bouton de démarrage
    sub.addEventListener("click", function () {
        console.log("ok")
        radio.forEach(function (radio) {
            if (radio.checked) {
                console.log(radio.value)
                if (radio.value === "yes") {
                    section.classList.add('none'); // Masque la section de question
                    section.classList.remove('qst1') // Enlève la classe qst1 à la section

                    if (section.classList.contains('none')) {

                        var canvas = document.querySelector(".renderCanvas");
                        var engine = new BABYLON.Engine(canvas, true, { antialias: true });
                        canvas.classList.remove('none');
                        canvas.style.width = "100%";
                        canvas.style.height = "100%";
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;// Affiche le canvas
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
                    }

                } else {
                    let p = document.createElement("p")
                    p.textContent = "FALSE !"
                    p.style.color = "red"
                    p.style.zIndex = "1000"
                    p.classList.toggle('false')
                    section.append(p);
                    setTimeout(() => {
                        p.remove()
                    }, 5000);
                }
            }
        })

    });
});
