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
    console.log(Xbah)
    Xbah /= numeros.length
    console.log(Xbah)

    for (const cont of numeros) {
        let teste = (cont - Xbah)**2
        console.log(teste)
        tot += teste
    }
    console.log(`o total é ${tot}`)
    s = tot/numeros.length

    if(s == 0){
        window.alert('Digite mais de um valor')
    }else{
        console.log(`S^2 é igual a: ${s}`)
        window.alert(`S^2 é igual a: ${s}`)
    }    
    Xbah = 0
    tot = 0
    s = 0
    numeros = []
})
