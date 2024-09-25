const slider = document.querySelectorAll('.on')
const prev = document.getElementById('prev')
const next = document.getElementById('next')

let imgAtual = 0
let intervalo

function addicionar(){
    slider.forEach(item => item.classList.add('imgs'))//1;  o problema tava nessas 2 linhas
}

function remover(){
    slider[imgAtual].classList.remove('imgs')//2; 
}
//esse carrosel, só coloca a classe imgs(classe que faz a imagem sumir) em uma unica imagem por vez, ou seja
//se a imagem 0 desaparece, a imagem 2 é mostrada
//se a imagem 1 desaparece, a imagem 2 é mostrada
//se a imagem 2 desaparece, a imagem 1 é mostrada
//de forma que, a imagem 0 em nenhum dos casos aparece

//problema resolvido: a logica antes era; não mostrar uma imagem em especifico
//agora a logica esta em; mostrar uma imagem em especifico
function prox(){
    addicionar()
    if(imgAtual === slider.length -1){
        imgAtual = 0
    }else{
        imgAtual++
    }
    
    
    remover()
    iniciarIntervalo()
}

function anterior(){
    addicionar()
    if(imgAtual === 0){
        imgAtual = slider.length -1
    }else{
        imgAtual--
    }
    remover()
    iniciarIntervalo()
}

function iniciarIntervalo() {
    clearInterval(intervalo);

    intervalo = setInterval(prox, 5000);
}

iniciarIntervalo()


prev.addEventListener('click', anterior)
next.addEventListener('click', prox)


