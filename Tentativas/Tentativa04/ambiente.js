var res = document.getElementById('res')
var nMaisA  
var restot = 0

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

}

function multiplicar(){

}

function adicionar(){
    let n = document.getElementById('res')
    var nMais = n.textContent
    nMaisA = Number(nMais)
    restot += nMaisA
    //nMaisA.push(nMais)
    
    num = []
    res.innerHTML = ""  
    res.innerHTML += "+"
    res.innerHTML += restot
    
}

function dividir(){

}

function calcular(){
    //calcula o valor e manda pro resultado
    var oi = document.getElementById('res')
    var oi2 = oi.textContent
    
    num = []
    restot += Number(oi2)
    res.innerHTML = restot
    restot = 0
    
}

function limpar(){
    //apaga todos os valores do array
    res.innerHTML = ""   
    nMaisA = null
    num = []
    res.innerHTML += num
}