
const canvas = document.querySelector('canvas')

canvas.addEventListener('click', () => {
    canvas.requestPointerLock()
    if (canvas.pointerLockElement === true){
        console.log("2")
    }
})






