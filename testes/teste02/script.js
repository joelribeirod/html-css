const carrosel = document.querySelector('.carrosel-img')
const carroselItens = document.querySelectorAll('.carrosel')
let tamanho = 300
let imgAtual = 0

console.log(carroselItens)

function mover(){
    let deslocamento = -imgAtual * tamanho
    //carroselItens.style.transform = `translateX(${deslocamento}px)`
    for(let i = 0; i<5; i++){
        carroselItens[i].style.transform = `translateX(${deslocamento}px)`
    }
}

function prox(){
    if(imgAtual < carroselItens.length - 3){
        imgAtual++
    }else{
        imgAtual = 0
        //carroselItens.style.transform = `translateX(0px)`
    }
    mover()
}

setInterval(prox, 2000)

//DEU CERTO!!!


const resgatarCor = document.getElementById('resgatarCor')
const enviarCor = document.getElementById('enviarCor')

enviarCor.addEventListener('click', (e) => {
    console.log(resgatarCor.value)
})



const selecaoDeCategs = document.getElementById('selecaoDeCategs')
const enviarOpt = document.getElementById("enviarOpt")

enviarOpt.addEventListener('click',()=>{
    console.log(selecaoDeCategs.value)
})