var res = document.getElementById('res')
var nMaisA 
var nMenosA
var nMultiA
var nDivA
var nPontoA
var restot = 0

let mais = false
let menos = false
let div = false
let multi = false
let nPonto = false
let apagou = false

//analisa qual numero que foi escolhido
var numeros 
var num = []
var clicou = document.getElementsByClassName('botaoN')
for(var i = 0; i < clicou.length; i++){
    clicou[i].addEventListener('click', function(){
        numeros = this.value;
        num.push(numeros)
        console.log(num);

        res.innerHTML = ""
        if(nPonto == true){
            res.innerHTML = nPontoA
        }

        res.innerHTML += num.join("")


    }) ;
}

function subtrair(){
    //pega o primeiro numero que foi digitado
    let n = document.getElementById('res')
    let nMenos = n.textContent
    //Analisa se tem alguma operação pendente e apaga ela, substituindo para não ocorrer um erro
    if(nMenos.endsWith('+') || nMenos.endsWith('x') || nMenos.endsWith('/') || nMenos.endsWith('-')){
        nMenos = nMenos.slice(0,-1)
        menos = true
        div = false
        mais = false
        multi = false
    }
    nMenosA = Number(nMenos)
    nPonto = false

    
    //analisa qual operação deve ser feita
    if(nPonto == true){
        nPonto = false
    }
    if(multi == true){
        multi = false
        restot *= nMenosA
        restot -= nMenosA
    }else if(div == true){
        div = false
        restot /= nMenosA
        restot -= nMenosA
    }  
    
    if(menos == true){
        menos = false
        restot -= nMenosA
        restot += nMenosA
    }else if(apagou == true){
        apagou = false
        restot = nMenosA
    }else{
        restot += nMenosA 
    }    
         
    //sinaliza para a proxima função qual operação devera ser feita
    if(menos == false){
        mais = false
        menos = true
        div = false
        multi = false
        
    }

    //limpa a tela e os valores
    num = []
    res.innerHTML = ""  
    res.innerHTML += restot
    res.innerHTML += '-'
}

function adicionar(){
    let n = document.getElementById('res')
    let nMais = n.textContent
    if(nMais.endsWith('+') || nMais.endsWith('x') || nMais.endsWith('/') || nMais.endsWith('-')){
        nMais = nMais.slice(0,-1)
        menos = false
        div = false
        mais = false
        multi = false
        apagou = true
    }
    nMaisA = Number(nMais)

    if(nPonto == true){
        nPonto = false
    }
    if(multi == true){
        multi = false
        restot *= nMaisA
        restot -= nMaisA
    }else if(menos == true){
        menos = false
        restot -= nMaisA
        
    }else if(apagou == true){
        apagou = false
        restot = nMaisA
    }else if(div == true){
        div = false
        restot /= nMaisA
        restot -= nMaisA
    }
    else{     
        restot += nMaisA 
    }

    num = []
    res.innerHTML = ""  
    res.innerHTML += restot
    res.innerHTML += '+'
    
    if(mais == false){
        mais = true
        menos = false
        div = false
        multi = false
    }
}

function multiplicar(){
    let n = document.getElementById('res')
    let nMulti = n.textContent
    if(nMulti.endsWith('+') || nMulti.endsWith('x') || nMulti.endsWith('/') || nMulti.endsWith('-')){
        nMulti = nMulti.slice(0,-1)
        menos = false
        div = false
        mais = false
        multi = false
    }
    nMultiA = Number(nMulti)

    if(nPonto == true){
        nPonto = false
    }
    if(mais == true){
        mais = false
        restot += nMultiA
    }else if(menos == true){
        menos = false
        restot -= nMultiA    
    }else if(div == true){
        div = false
        restot /= nMultiA
        restot /= nMultiA
    }

    if(multi == true){
        multi = false
        restot *= nMultiA
    }else if(restot == 0){
        restot = nMultiA
    }
    
    num = []
    res.innerHTML = ""  
    res.innerHTML += restot
    res.innerHTML += "x"
    
    if(multi == false){
        mais = false
        menos = false
        div = false
        multi = true
    }
}

function dividir(){
    let n = document.getElementById('res')
    let nDiv = n.textContent
    if(nDiv.endsWith('+') || nDiv.endsWith('x') || nDiv.endsWith('/') || nDiv.endsWith('-')){
        nDiv = nDiv.slice(0,-1)
        menos = true
        div = false
        mais = false
        multi = false
    }
    nDivA = Number(nDiv)
    
    if(nPonto == true){
        nPonto = false
    }
    if(multi == true){
        multi = false
        restot *= nDivA 
        
    }else if(menos == true){
        menos = false
        restot -= nDivA
    }else if(mais == true){
        mais = false
        restot += nDivA
    }

    if(div == true){
        div = false
        restot /= nDivA
    }else if(restot == 0){
        restot = nDivA
    }
    

    num = []
    res.innerHTML = ""  
    res.innerHTML += restot
    res.innerHTML += "/"

    if(div == false){
        mais = false
        menos = false
        div = true
        multi = false
    }
}

function calcular(){
    //calcula o valor e manda pro resultado
    var oi = document.getElementById('res')
    var oi2 = oi.textContent
    
    
    if(mais == true){
        mais = false
        restot += Number(oi2)
    }else if(menos == true){
        menos = false
        restot -= Number(oi2)    
    }else if(multi == true){
        multi = false
        restot *= Number(oi2)
    }else if(div == true){
        div = false
        if(Number(oi2) == 0){
            window.alert('Não pode dividir por zero')
        }else{
            restot /= Number(oi2)
        }  
    }else{
        window.alert('Digite uma operação para calcular')
    }

    num = []
    res.innerHTML = restot
    restot = 0
    
}

function limpar(){
    //apaga todos os valores do array
    res.innerHTML = ""   
    nMaisA = null
    nMenosA = null
    nMultiA = null
    nDivA = null
    nPontoA = null
    num = []
    res.innerHTML += num
    restot = 0

    menos = false
    div = false
    mais = false
    multi = false
}

function ponto(){
    let n = document.getElementById('res')
    let nPontos = n.textContent
    nPontoA = Number(nPontos)
    
    if(nPonto == false){
        nPontoA += '.'
    }else{
        window.alert('Não pode colocar dois pontos')
    }
    
    console.log(nPontoA)
    num = []
    //Ideia para testar depois: Criar uma variavel para pegar o valor que esta aqui, e depois continuar digitando outros valores depois da virgula
    res.innerHTML = ""  
    res.innerHTML += nPontoA
    nPonto = true
    //corrigir problema onde, se apagar o ponto, se vc n fazer nenhuma operação, ele não deix colocar outro ponto
    
}

function apagar(){
    //Apaga o ultimo digito colocado
    let n = document.getElementById('res').textContent
    if(n.includes('.')){
        n = n.slice(0,-1)
        if(n.endsWith('.')){
            n = n.slice(0,-1)
            nPontoA = n
        }
    }else{
        n = n.slice(0,-1)
    }

    let nFinal = parseFloat(n)

    if(mais == true){
        mais = false
    }else if(menos == true){
        menos = false
    }else if(multi == true){
        multi = false
    }else if(div == true){
        div = false
    }
    
    num.pop()
    if(isNaN(nFinal)){
        res.innerHTML = 0
    }else{
        res.innerHTML = nFinal  
    }
    apagou = true
    //ideia para teste: na hora de apagar o ultimo valor, a função pode pegar o numero, transformar numa string, remover o ultimo numero e depois transformar denovo em um numero, isso em 2 ocasiões, 
    //1: se não tiver como usar um metodo para apagar o ultimo digito de um numero
    //2: tem que ver se existe um metodo para apagar o ultimo digito de uma string

    //o metodo que usei foi o 2 mesmo, para o array só usei um outro metodo chamado pop, que apaga o ultimo digito
}