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

let novoR
let novoC

const anotacoes = JSON.parse(localStorage.getItem('anotacoes')) || []
console.log(anotacoes)

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


function loadNotatios(){
    anotacoes.forEach(anotacao => {
        //Estrutura
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

            let resumo = document.createElement('p')
            resumo.appendChild(setinha)
            resumo.innerHTML += ` ${anotacao.resumo}`
            resumo.className = 'resumo'

            let total = document.createElement('div')
            total.className = 'total'
            total.textContent = anotacao.descricao
        // Fim Estrutura

        function atualizarP(clicou) {
            if(clicou.target.value == 1){
                edit.style.display = 'none'
                edit.removeEventListener('click', atualizarP)
            }else if(clicou.target.value == 2){
                //pega os valores que foram digitados na edit
                novoR = document.getElementById('editResumo').value
                novoC = document.getElementById('editDesc').value

                if (!novoC || !novoR) {
                    window.alert("Escreva algo para atualizar")
                }else{
                    const att = anotacoes.filter((anotation) => anotation.id === anotacao.id)

                    att[0].resumo = novoR
                    att[0].descricao = novoC

                    localStorage.setItem('anotacoes', JSON.stringify(anotacoes))
                    window.location.reload()
                }

                //faz a edição sumir
                edit.style.display = 'none'
                edit.removeEventListener('click', atualizarP)
            }
        }
    
        function deletarP(clicou) {
            if(clicou.target.value == 1){
                confirmDel.style.display = 'none'
                const del = anotacoes.filter((anotation) => anotation.id !== anotacao.id)

                localStorage.setItem('anotacoes', JSON.stringify(del))
                window.location.reload()
            }else if(clicou.target.value == 2){
                confirmDel.style.display = 'none'
                confirmDel.removeEventListener('click', deletarP)
            }
        }

        confirmDel.addEventListener('click', (event) => {
            if(event.target === confirmDel){
                confirmDel.style.display = 'none'
                confirmDel.removeEventListener('click', deletarP)
            }
        })
    
        edit.addEventListener('click', (event) => {
            if(event.target === edit){
                edit.style.display = 'none'
                edit.removeEventListener('click', atualizarP)
            }
        })

        //remove o card que foi clicado
        deletar.addEventListener('click', () => {
            confirmDel.style.display = 'flex'
            confirmDel.addEventListener('click', deletarP)  
        })

        //edita um card ja existente
        settings.addEventListener('click', () => {
            editR.value = anotacao.resumo
            editC.value = anotacao.descricao
            edit.style.display = 'flex'
            edit.addEventListener('click', atualizarP)
        })

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

        card.appendChild(configCard)
        card.appendChild(total)
        configCard.appendChild(resumo)
        configCard.appendChild(config)
        config.appendChild(settings)
        config.appendChild(deletar)

        central.appendChild(card)

    })

    
}

enviar.addEventListener('click', ()=>{
    resuminho = document.getElementById("resumoFlash").value
    desc = document.getElementById('descricaoFlash').value

    adicionarCard.style.display = 'none'

    const anotation = {
        resumo: resuminho,
        descricao: desc,
        id: crypto.randomUUID()
    }

    anotacoes.push(anotation)

    localStorage.setItem('anotacoes', JSON.stringify(anotacoes))

    window.location.reload()
})

loadNotatios()