var res = document.getElementById('res')
var nMaisA 
var nMenosA
var restot = 0

let mais = false
let menos = false
let div = false
let multi = false

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
        res.innerHTML += num.join("")
        
    }) ;
}

function subtrair(){
    let n = document.getElementById('res')
    let nMenos = n.textContent
    nMenosA = Number(nMenos)
    
    if(restot>0){
        restot -= nMenosA
        console.log(restot)
    }else {

        restot += nMenosA
    }
    num = []
    res.innerHTML = ""  
    res.innerHTML += restot
    res.innerHTML += '-'
    
    if(menos == false){
        mais = false
        menos = true
        div = false
        multi = false
    }
    
}

function adicionar(){
    let n = document.getElementById('res')
    let nMais = n.textContent
    nMaisA = Number(nMais)
    
    restot += nMaisA
    
    
    
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

}

function dividir(){

}

function calcular(){
    //calcula o valor e manda pro resultado
    var oi = document.getElementById('res')
    var oi2 = oi.textContent
    
    
    if(mais == true){
        restot += Number(oi2)
    }else if(menos == true){
        restot -= Number(oi2)
        
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
    num = []
    res.innerHTML += num
    restot = 0
}