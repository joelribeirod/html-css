const adicionarCard = document.getElementById('config-tot')
const adicionar = document.getElementById('adicionar')
const enviar = document.getElementById('enviarFlash')
const central = document.getElementById('central')
var textareaUm = document.getElementById('resumoFlash')
var textareaDois = document.getElementById('descricaoFlash')

let resuminho
let desc

adicionar.addEventListener('click', () => {
    textareaUm.value = ""
    textareaDois.value = ""
    adicionarCard.style.display = 'flex'
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

    let resumo = document.createElement('p')
    resumo.appendChild(setinha)
    resumo.innerHTML += ` ${resuminho}`
    resumo.className = 'resumo'

    let config = document.createElement('div')
    config.className = 'config'

    let settings = document.createElement('span')
    settings.className = 'material-symbols-outlined'
    settings.textContent = 'settings'

    let deletar = document.createElement('span')
    deletar.className = 'material-symbols-outlined'
    deletar.textContent = 'delete'

    let total = document.createElement('div')
    total.className = 'total'
    total.textContent = desc

    card.appendChild(configCard)
    card.appendChild(total)
    configCard.appendChild(resumo)
    configCard.appendChild(config)
    config.appendChild(settings)
    config.appendChild(deletar)

    central.appendChild(card)
    
})