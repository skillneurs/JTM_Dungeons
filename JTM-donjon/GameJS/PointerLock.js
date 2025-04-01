
const canvas = document.querySelector('canvas')
const crosshair = document.querySelector('#crosshair')

canvas.addEventListener('click', () => {
    canvas.requestPointerLock()
    
})

document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement){
        crosshair.style.display = 'block'
        console.log('pointer locké')
    }else{
        console.log('pointer perdu')
        crosshair.style.display = 'none'
    }
})






