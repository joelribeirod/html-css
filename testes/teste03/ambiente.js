//const nums = [2,4,6,8,10]
let add = document.getElementById('addNUM')
let reset = document.getElementById('reset')
let calc = document.getElementById('calc')

let numeros = []

add.addEventListener('click', () => {
    let totDiv = document.getElementById('num')
    let nums = totDiv.value
    numeros.push(nums)
    totDiv.value = ''

    console.log(numeros)
})

reset.addEventListener('click', () => {
    let totDiv = document.getElementById('num')
    totDiv.value = ''
    numeros = []
    console.log(numeros)
})

calc.addEventListener('click', () => {
    let Xbah = 0
    let tot = 0
    let s = 0

    for (const cont of numeros) {
        Xbah += Number(cont)
    }

    Xbah /= numeros.length

    for (const cont of numeros) {
        tot += (cont - Xbah)**2
    }

    s = tot/numeros.length

    if(s == 0){
        window.alert('Digite mais de um valor')
    }else{
        window.alert(`S^2 é igual a: ${s}`)
    }    
    Xbah = 0
    tot = 0
    s = 0
    numeros = []
})
