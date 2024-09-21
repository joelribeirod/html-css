const slider = document.querySelectorAll('.carrosel-item')
const sliderCel = document.querySelectorAll('.carrosel')

const carrosselItems = document.querySelectorAll('.carrosel')

let intervalo
let outrointervalo
let imgAtual = 0

//Celular
//faz os itens desaparecerem
function addicionar(){
    sliderCel.forEach(item => item.classList.add('off'))
}
//apenas o item desejado não desaparece
function remover(){
    sliderCel[imgAtual].classList.remove('off')
}

function prox(){
    addicionar()
    //esse for serve para quando a tela sai de pc para celular, a imagem voltar para o posicionamento original
    for(let i = 0; i<5; i++){
        carrosselItems[i].style.transform = `translateX(${0}px)`
    }
    //analisa qual sera a proxima imagem e se deve resetar a contagem
    if(imgAtual === sliderCel.length -1){
        imgAtual = 0
    }else{
        imgAtual++
    }
    remover()
}

function carroCel(){
    //limpa os intervalos para n ocorrer de uma função ser executada varias vezes ao mesmo tempo
    clearInterval(intervalo)
    intervalo = setInterval(prox, 2000)
    clearInterval(outrointervalo)
}
//fimCelular

//Pc
function mover(){
    //pega o tamanho da imagem
    let tamanhoimg = document.querySelector('.teste').clientWidth
    //analisa o quanto devera ser o deslocamento se a div estiver reduzida(em vez de um valor fixo, ele calcula sozinho o valor que devera mover para o lado a imagem)
    let deslocamento = -imgAtual * tamanhoimg
    //esse for, pega todos os itens, e muda para o lado, na quantidade de pixels desejado
    for(let i = 0; i<5; i++){
        carrosselItems[i].style.transform = `translateX(${deslocamento}px)`
    }
}

function proxPc(){
    //analisa qual sera a proxima imagem e se deve resetar a contagem
    if(imgAtual < carrosselItems.length - 3){
        imgAtual++
    }else{
        imgAtual = 0
    }
    mover()
}

function carroPc(){
    //limpa os intervalos para n ocorrer de uma função ser executada varias vezes ao mesmo tempo
    clearInterval(outrointervalo)
    outrointervalo = setInterval(proxPc, 3000)
    clearInterval(intervalo)
}
//fimPc

function inicializar(){
    //analisa qual o tamanho da tela, e qual função devera ser iniciada
    if(window.innerWidth <= 768){
        carroCel()
    }else if(window.innerWidth > 768){
        carroPc()
    }
    
}

inicializar()

window.addEventListener('resize', inicializar)