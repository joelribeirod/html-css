//teste criar um if else do seguinte modo
//se a tela for para pc, deixa mostrando imagens, esconder as outras duas, e por fim fazer o carrossel
//se a tela for para celular, deixar mostrando apenas uma imagem, esconder o resto, e deixar o carrossel rodando
//Só n sei como vou fazer para ter o efeito de rolagem lateral, tipo, vc ver o carrosel indo pro lado e escondendo a imagem

const slider = document.querySelectorAll('.imgcarro')


let intervalo
let imgAtual = 0

function addicionar(){
    slider.forEach(item => item.classList.add('off'))
}

function remover(){
    slider[imgAtual].classList.remove('off')
}

function prox(){
    addicionar()
    if(imgAtual === slider.length -1){
        imgAtual = 0
    }else{
        imgAtual++
    }
    remover()
}

function carroCel(){
    clearInterval(intervalo)
    intervalo = setInterval(prox, 2000)
}

function inicializar(){
    carroCel()
}

inicializar()

window.addEventListener('resize', inicializar)