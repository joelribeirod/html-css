// Declarando Variaveis
    // Edição de Cards
    const edit = document.getElementById('bg-edit')
    const editR = document.getElementById('editResumo')
    const editC = document.getElementById('editDesc')
    const editarCategoriaCard = document.getElementById('editarCategoriaCard')

    // Deletar Cards
    const confirmDel = document.getElementById('bg-confirm')

    // Atualizar Cards
    const adicionarCard = document.getElementById('config-tot')
    const enviar = document.getElementById('enviarFlash')
    
    // Adicionar Cards
    const adicionar = document.getElementById('adicionar')
    var textareaUm = document.getElementById('resumoFlash')
    var textareaDois = document.getElementById('descricaoFlash')
    const selectDeCategorias = document.getElementById('selectDeCategorias')

    // Carrega todos os Cards
    const central = document.getElementById('central')
    
    // Configurações das categorias
    const iconeAbrirFechar = document.getElementById('iconeAbrirFechar')
    const bgCriarCategoria = document.getElementById('bg-criarCategoria')
    const novaCategoria = document.getElementById('novaCategoria')
    const abrirFechar = document.getElementById('abrirFechar')
    const manipularCategorias = document.getElementById('manipularCategorias')
    
    // Criar categoria
    const criarCategoria = document.getElementById('criarCategoria')
    const salvarCategoria = document.getElementById('salvarCategoria')

    // Resgatar as categorias
    const todasCategorias = document.getElementById('todasCategorias')

    // Aviso 2
    const aviso2 = document.getElementById('aviso2')
    const cliqueAviso = document.getElementById('cliqueAviso')
    const textoAviso = document.getElementById('textoAviso')
    const avisoHeigth = textoAviso.offsetHeight
    console.log(avisoHeigth)

    // Edição de categoria
    const bgEditCateg = document.getElementById('bg-editCateg')
    const novaCor = document.getElementById('novaCor')
    const novoNome = document.getElementById('novoNome')
    const salvarEditCateg = document.getElementById('salvarEditCateg')
    const cancelarEditCateg = document.getElementById('cancelarEditCateg')

    let idCateg

    // Deletar Categoria
    const deletarCateg = document.getElementById('deletarCateg')
    const confirmDelCateg = document.getElementById('confirmDelCateg')
    const delConfirmado = document.getElementById('delConfirmado')
    const delCancelado = document.getElementById('delCancelado')

    // Filtrar por categorias
    const selecionarCategorias = document.getElementById('selecionarCategorias')

// Fim Declarando Variaveis

// resgata as anotações e as categorias que estão no local storage, se n tiver nenhuma eles recebem arrays vazios
    const anotacoes = JSON.parse(localStorage.getItem('anotacoes')) || []
    const categorias = JSON.parse(localStorage.getItem('categorias')) || []
// Adicionando os EventListeners

    // Abre a criação de um novo card
    adicionar.addEventListener('click', () => {
        textareaUm.value = ""
        textareaDois.value = ""
        adicionarCard.style.display = 'flex'
    })

    // Fechar a criação de um card
    adicionarCard.addEventListener('click', (event) => {
        if(event.target === adicionarCard){
            adicionarCard.style.display = 'none'
        }
    })

    // Fechar a criação de uma nova categoria
    bgCriarCategoria.addEventListener('click', (e)=>{
        if(e.target === bgCriarCategoria){
            bgCriarCategoria.style.display = 'none'
        }
    })

    // Fechar a edição de categoria
    bgEditCateg.addEventListener('click', (e)=>{
        if(e.target === bgEditCateg){
            bgEditCateg.style.display = 'none'
            confirmDelCateg.style.display = 'none'
        }
    })

    // Analisa se a edição de categorias está aberta, e se ao mesmo tempo o usuario clicou em outro lugar da tela, fazendo com que a edição de categorias seja fechada, também analisa se a edição de categoria está aberta, se estiver aberta, ele não fecha a mostragem de todas as categorias 
    window.addEventListener('click', (e)=>{
        if(!manipularCategorias.contains(e.target) && !abrirFechar.contains(e.target) && manipularCategorias.style.width == '220px' && !bgEditCateg.contains(e.target)){
            manipularCategorias.style.animation = 'fecharCategorias 1s ease-in-out'
            manipularCategorias.style.width = '0px'
            manipularCategorias.style.border = '0px solid white'
            manipularCategorias.style.height = '0px'
            iconeAbrirFechar.style.rotate = '0deg'
        }
    })

    // Abre e fecha as categorias usando uma animação para deixar elegante
    abrirFechar.addEventListener('click', ()=>{
        if(manipularCategorias.style.width == '220px'){
            manipularCategorias.style.animation = 'fecharCategorias 1s ease-in-out'
            manipularCategorias.style.width = '0px'
            manipularCategorias.style.border = '0px solid white'
            manipularCategorias.style.height = '0px'
            iconeAbrirFechar.style.rotate = '0deg'
        }else if(manipularCategorias.style.width == '0px'){
            manipularCategorias.style.animation = 'abrirCategorias 1s ease-in-out'
            manipularCategorias.style.width = '220px'
            manipularCategorias.style.border = '1px solid white'
            manipularCategorias.style.height = '220px'
            iconeAbrirFechar.style.rotate = '135deg'
        }
    })

    // Abre a criação de uma nova categoria
    novaCategoria.addEventListener('click', ()=>{
        bgCriarCategoria.style.display = 'flex'
    })

    // Exibe o aviso do localStorage
    cliqueAviso.addEventListener('click', ()=>{
        if(aviso2.style.transform == `translateY(${avisoHeigth}px)`){
            aviso2.style.transform = "translateY(0px)"
        }else if(aviso2.style.transform == "translateY(0px)"){
            aviso2.style.transform = `translateY(${avisoHeigth}px)`
        }
    })

    // Fecha o aviso do localStorage
    window.addEventListener('click', (e)=>{
        if(aviso2.style.transform == "translateY(0px)" && !textoAviso.contains(e.target) && !cliqueAviso.contains(e.target)){
            aviso2.style.transform = `translateY(${avisoHeigth}px)`
        }
    })
    // Fecha o aviso do localStorage quando a pagina carrega
    aviso2.style.transform = `translateY(${avisoHeigth}px)`

    // Cancela a edição de categorias
    cancelarEditCateg.addEventListener('click', ()=>{
        bgEditCateg.style.display = 'none'
    })

    // Cancela o deletar de categorias
    delCancelado.addEventListener('click', ()=>{
        confirmDelCateg.style.display = 'none'
    })

    // Abre a confirmação de delete de categorias
    deletarCateg.addEventListener('click', ()=>{
        confirmDelCateg.style.display = 'block'
    })

    // Analise qual opção está selecionada no filtro de categorias
    selecionarCategorias.addEventListener('click', (e)=>{
        // Remover todos os cards
        let totCard = document.querySelectorAll('.card')
        totCard.forEach((card)=>{
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
    })

    // Criar categoria
    salvarCategoria.addEventListener('click', ()=>{
        let categoriaNome = document.getElementById('categoriaNome').value
        let categoriaCor = document.getElementById('categoriaCor').value

        bgCriarCategoria.style.display = 'none'

        const category = {
            nome: categoriaNome,
            cor: categoriaCor,
            id: crypto.randomUUID()
        }

        categorias.push(category)
        
        localStorage.setItem('categorias', JSON.stringify(categorias))

        window.location.reload()
    })

    // Cria o card e ja o armazena no local storage
    enviar.addEventListener('click', ()=>{
        let enviarResumo = document.getElementById("resumoFlash").value
        let enviarDesc = document.getElementById('descricaoFlash').value
        let enviarCateg = document.getElementById('selectDeCategorias').value

        adicionarCard.style.display = 'none'

        const anotation = {
            resumo: enviarResumo,
            descricao: enviarDesc,
            categId: enviarCateg,
            id: crypto.randomUUID()
        }

        anotacoes.push(anotation)

        localStorage.setItem('anotacoes', JSON.stringify(anotacoes))

        window.location.reload()
    })

// Fim Adicionando os EventListeners

// Pega os cards do local storage que foram armazenados na const 'anotacoes' e cria o front com suas features
function loadNotations(){
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

function loadCategorys(){
    // Carrega as categorias no select de filtragem
    categorias.forEach((categoria)=>{
        let opcao = document.createElement('option')

        opcao.value = categoria.id
        opcao.textContent = categoria.nome

        selecionarCategorias.appendChild(opcao)
    })

    // Carrega as categorias no select da criação de cards
    categorias.forEach((categoria)=>{
        let opcao = document.createElement('option')

        opcao.value = categoria.id
        opcao.textContent = categoria.nome

        selectDeCategorias.appendChild(opcao)
    })

    // Carrega as categorias no menu de categorias
    categorias.forEach((categoria)=>{
        let category = document.createElement('div')
        category.classList = 'categoria'

        let categoriaNome = document.createElement('p')
        categoriaNome.textContent = categoria.nome

        category.appendChild(categoriaNome)

        category.addEventListener('click', ()=>{
            idCateg = categoria.id
            editCateg(categoria.nome, categoria.cor) 
        })

        todasCategorias.appendChild(category)
    })

    // Carrega as categorias na edição de card
    categorias.forEach((categoria)=>{
        let opcao = document.createElement('option')

        opcao.value = categoria.id
        opcao.textContent = categoria.nome

        editarCategoriaCard.appendChild(opcao)
    })
}

// Atualiza os valores da categoria que o usuário quer, adiciona de volta no localStorage e da um reload na pagina
function salvarEdit() {
    const atualizarCateg = categorias.find((categoria) => categoria.id === idCateg)

    atualizarCateg.nome = novoNome.value
    atualizarCateg.cor = novaCor.value

    localStorage.setItem('categorias', JSON.stringify(categorias))

    salvarEditCateg.removeEventListener('click', salvarEdit)

    window.location.reload()
}
salvarEditCateg.addEventListener('click', salvarEdit)

// Deleta a categoria que o usuário deseja e também deleta todas as anotações que possuem essa categoria
function delCateg(){
    const novasCategorias = categorias.filter((categoria) => categoria.id != idCateg)
    const novasAnotacoes = anotacoes.filter((anotacoes) => anotacoes.categId != idCateg)

    localStorage.setItem('anotacoes', JSON.stringify(novasAnotacoes))
    localStorage.setItem('categorias', JSON.stringify(novasCategorias))

    delConfirmado.removeEventListener('click', delCateg)

    window.location.reload()
}
delConfirmado.addEventListener('click', delCateg)

// Abre a edição da categoria e ja deixa com os valores da categoria nos inputs
function editCateg(nome, cor){
    bgEditCateg.style.display = 'flex'
    novoNome.value = nome
    novaCor.value = cor
}

loadNotations()
loadCategorys()