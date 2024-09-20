const slider = document.querySelectorAll('.carrosel-item')
const sliderCel = document.querySelectorAll('.carrosel')

const carrosselItems = document.querySelectorAll('.carrosel')

let intervalo
let outrointervalo
let imgAtual = 0

//Celular
function addicionar(){
    sliderCel.forEach(item => item.classList.add('off'))
}

function remover(){
    sliderCel[imgAtual].classList.remove('off')
}

function prox(){
    addicionar()
    for(let i = 0; i<5; i++){
        carrosselItems[i].style.transform = `translateX(${0}px)`
    }
    if(imgAtual === sliderCel.length -1){
        imgAtual = 0
    }else{
        imgAtual++
    }
    remover()
}

function carroCel(){
    clearInterval(intervalo)
    intervalo = setInterval(prox, 2000)
    clearInterval(outrointervalo)
}
//fimCelular

//Pc
function mover(){
    let tamanhoimg = document.querySelector('.teste').clientWidth
    let deslocamento = -imgAtual * tamanhoimg
    for(let i = 0; i<5; i++){
        carrosselItems[i].style.transform = `translateX(${deslocamento}px)`
    }
}

function proxPc(){
    if(imgAtual < carrosselItems.length - 3){
        imgAtual++
    }else{
        imgAtual = 0
    }
    mover()
}

function carroPc(){
    clearInterval(outrointervalo)
    outrointervalo = setInterval(proxPc, 2000)
    clearInterval(intervalo)
}
//fimPc

function inicializar(){
    if(window.innerWidth < 768){
        carroCel()
    }else if(window.innerWidth >= 768){
        carroPc()
    }
    
}

inicializar()

window.addEventListener('resize', inicializar)