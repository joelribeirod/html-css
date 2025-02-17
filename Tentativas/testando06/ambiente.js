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
    
    var setinha = document.createElement('span')
    setinha.className = 'material-symbols-outlined setinha'
    setinha.textContent = 'arrow_drop_down'

    let config = document.createElement('div')
    config.className = 'config'

    let settings = document.createElement('span')
    settings.className = 'material-symbols-outlined spanconfig'
    settings.textContent = 'settings'

    let deletar = document.createElement('span')
    deletar.className = 'material-symbols-outlined deletar'
    deletar.textContent = 'delete'

    //edita um card ja existente
    settings.addEventListener('click', () => {
        editR.value = ''
        editC.value = ''
        edit.style.display = 'flex'
        edit.addEventListener('click', (clicou) => {
            if(clicou.target.value == 1){
                edit.style.display = 'none'
            }else if(clicou.target.value == 2){
                //pega os valores que foram digitados na edit
                testeR = document.getElementById('editResumo').value
                testeC = document.getElementById('editDesc').value
 
                //apaga o valor anterior e coloca os novos e faz a comparação, se o valor for nulo, ou seja, se a caixa n for alterada, o valor antigo permanece
                if(testeR != ''){
                    resumo.textContent = ''
                    resumo.appendChild(setinha)
                    resumo.innerHTML += ` ${testeR}`
                }
                if(testeC != ''){
                    total.textContent = ''
                    total.textContent = testeC
                }
                //faz a edição sumir
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

    //faz com que a descricao apareça quando clicar no resumo
    configCard.addEventListener('click', (event) => {
        if(event.target === configCard || event.target.closest(".resumo")){
            if(total.style.display == 'block'){
                total.style.display = 'none';
                //nao esta funcionando -> setinha.classList.remove('setinha');
            }else{
                total.style.display = 'block';
                //nao esta funcionando -> setinha.classList.add('setinha');
            }
        }
    })

    //remove o card que foi clicado
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

