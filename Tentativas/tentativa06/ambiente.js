const adicionarCard = document.getElementById('config-tot')
const adicionar = document.getElementById('adicionar')
const enviar = document.getElementById('enviarFlash')
const central = document.getElementById('central')
const deletando = document.getElementsByClassName('deletar') 
const confirmDel = document.getElementById('bg-confirm')
const edit = document.getElementById('bg-edit')
const editR = document.getElementById('editResumo')
const editC = document.getElementById('editDesc')
var textareaUm = document.getElementById('resumoFlash')
var textareaDois = document.getElementById('descricaoFlash')

let resuminho
let desc

let testeR
let testeC

adicionar.addEventListener('click', () => {
    textareaUm.value = ""
    textareaDois.value = ""
    adicionarCard.style.display = 'flex'
})

confirmDel.addEventListener('click', (event) => {
    if(event.target === confirmDel){
        confirmDel.style.display = 'none'
    }
})

edit.addEventListener('click', (event) => {
    if(event.target === edit){
        edit.style.display = 'none'
    }
})

adicionarCard.addEventListener('click', (event) => {
    if(event.target === adicionarCard){
        adicionarCard.style.display = 'none'
    }
})



enviar.addEventListener('click', ()=>{
    resuminho = document.getElementById("resumoFlash").value
    desc = document.getElementById('descricaoFlash').value
    adicionarCard.style.display = 'none'
    console.log(resuminho, desc)

    let card = document.createElement('div')
    card.className = 'card'

    let configCard = document.createElement('div')
    configCard.className = 'configCard'
    
    let setinha = document.createElement('span')
    setinha.className = 'material-symbols-outlined'
    setinha.textContent = 'arrow_drop_down'

    let config = document.createElement('div')
    config.className = 'config'

    let settings = document.createElement('span')
    settings.className = 'material-symbols-outlined'
    settings.textContent = 'settings'

    let deletar = document.createElement('span')
    deletar.className = 'material-symbols-outlined deletar'
    deletar.textContent = 'delete'

    settings.addEventListener('click', () => {
        edit.style.display = 'flex'
        edit.addEventListener('click', (clicou) => {
            if(clicou.target.value == 1){
                edit.style.display = 'none'
            }else if(clicou.target.value == 2){
                testeR = document.getElementById('editResumo').value
                testeC = document.getElementById('editDesc').value
                
                resumo.textContent = ''
                total.textContent = ''

                resumo.appendChild(setinha)
                resumo.innerHTML += ` ${testeR}`
                total.textContent = testeC

                console.log(testeC, testeR)
                edit.style.display = 'none'
            }
        })
    })

    let resumo = document.createElement('p')
    resumo.appendChild(setinha)
    resumo.innerHTML += ` ${resuminho}`
    resumo.className = 'resumo'

    let total = document.createElement('div')
    total.className = 'total'
    total.textContent = desc

    configCard.addEventListener('click', (event) => {
        if(event.target === configCard || event.target.closest(".resumo")){
            if(total.style.display == 'block'){
                total.style.display = 'none'
            }else{
                total.style.display = 'block'
            }
        }
    })

    deletar.addEventListener('click', () => {
        confirmDel.style.display = 'flex'
        confirmDel.addEventListener('click', (clicou) => {
            if(clicou.target.value == 1){
                confirmDel.style.display = 'none'
                card.remove()
            }else if(clicou.target.value == 2){
                confirmDel.style.display = 'none'
            }
        })
        
    })

    card.appendChild(configCard)
    card.appendChild(total)
    configCard.appendChild(resumo)
    configCard.appendChild(config)
    config.appendChild(settings)
    config.appendChild(deletar)

    central.appendChild(card)
})

