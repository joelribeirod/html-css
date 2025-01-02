const boxs = document.querySelectorAll('.box')

const btn = document.getElementById('vol')



boxs.forEach((box) => {
    box.addEventListener('click', (e) =>{
        const caixaclicada = e.target
        
        caixaclicada.style.zIndex = 1
        
        if(caixaclicada){
            boxs[0].style.transform = 'translateX(370px)'
            boxs[2].style.transform = 'translateX(-370px)'
        }
        console.log(`clicou na ${e.target}`)
        caixaclicada.style.width = '400px'
        caixaclicada.style.height = '250px'
    })
})

btn.addEventListener('click', () => {
    boxs.forEach((box) => {
        box.style.transform = 'translateX(0px)'
        box.style.zIndex = 0
        box.style.width = '350px'
        box.style.height = '219px'
    })
})

function aviso(){
    window.onload(alert('Aviso: este site é apenas uma cópia fajuta da Tentativa1 com react, nada aqui deve ser levado a sério (apesar de quase ter ficado bom)'))
}

setTimeout(aviso, 500)

