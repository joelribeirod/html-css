const categorias = JSON.parse(localStorage.getItem('categorias')) || []
const anotacoes = JSON.parse(localStorage.getItem('anotacoes')) || []

// Filter by categories
const selectCategories = document.getElementById('selectCategories')

// Carrega todos os Cards
const central = document.getElementById('central')

// Edição de Cards
const edit = document.getElementById('bg-edit')
const editR = document.getElementById('editResumo')
const editC = document.getElementById('editDesc')

// Deletar Cards
const confirmDel = document.getElementById('bg-confirm')

export function loadNotations(){
    anotacoes.forEach(anotacao => {
        //Recuperando a categoria
            let categoria = categorias.find(categ=> categ.id === anotacao.categId)
        //Estrutura
            let card = document.createElement('div')
            card.className = 'card'

            if(categoria){
                card.style.backgroundColor = categoria.cor
            }
            
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
                let novoR = document.getElementById('editResumo').value
                let novoC = document.getElementById('editDesc').value
                let novaCateg = document.getElementById('editarCategoriaCard').value

                if (!novoC || !novoR) {
                    window.alert("Escreva algo para atualizar")
                }else{
                    const cardAtualizado = anotacoes.find((anotation) => anotation.id === anotacao.id)

                    cardAtualizado.resumo = novoR
                    cardAtualizado.descricao = novoC
                    cardAtualizado.categId = novaCateg

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
            // Resgata a categoria da anotação e ja mantem selecionada
            let editarOptions = document.querySelectorAll('#editarCategoriaCard option')
            let option = Array.from(editarOptions).find(option => option.value === anotacao.categId)

            // Coloca os valores da anotação nos inputs
            editR.value = anotacao.resumo
            editC.value = anotacao.descricao
            option.selected = true

            // Abre a edição
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

// Analise qual opção está selecionada no filtro de categorias
selectCategories.addEventListener('change', (e)=>{
    // Remover todos os cards
    document.querySelectorAll('.card').forEach((card)=>{
        card.remove()
    })
    // Fim Remover todos os cards

    let anotacoesFiltradas = []

    // Analisa se o valor do filtro é 0, se for, o filtro vai selecionar todos os cards, se não ele vai somente selecionar os cards de uma determinada categoria
    if(e.target.value == 0){
        anotacoesFiltradas = anotacoes
    }else{
        anotacoesFiltradas = anotacoes.filter((anotacao) => anotacao.categId === e.target.value)
    }
    // Fim analise

    // Recria todos os cards com base no que foi filtrado (a estrutura é a mesmo do LoadNotations)
    anotacoesFiltradas.forEach(anotacao => {
        //Recuperando a categoria
            let categoria = categorias.find(categ=> categ.id === anotacao.categId)
        //Estrutura
            let card = document.createElement('div')
            card.className = 'card'

            if(categoria){
                card.style.backgroundColor = categoria.cor
            }
            
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
                let novoR = document.getElementById('editResumo').value
                let novoC = document.getElementById('editDesc').value
                let novaCateg = document.getElementById('editarCategoriaCard').value

                if (!novoC || !novoR) {
                    window.alert("Escreva algo para atualizar")
                }else{
                    const cardAtualizado = anotacoes.find((anotation) => anotation.id === anotacao.id)

                    cardAtualizado.resumo = novoR
                    cardAtualizado.descricao = novoC
                    cardAtualizado.categId = novaCateg

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
            // Resgata a categoria da anotação e ja mantem selecionada
            let editarOptions = document.querySelectorAll('#editarCategoriaCard option')
            let option = Array.from(editarOptions).find(option => option.value === anotacao.categId)

            // Coloca os valores da anotação nos inputs
            editR.value = anotacao.resumo
            editC.value = anotacao.descricao
            option.selected = true

            // Abre a edição
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
})