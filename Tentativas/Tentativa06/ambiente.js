// Importando arquivos
    import { loadLanguage } from "./js/loadLanguage.js";
    import { loadBorderAnimation } from "./js/loadBorderAnimation.js";
    import { loadCategories, idCateg, bgEditCateg, novaCor, novoNome } from "./js/loadCategories.js";
    import { loadNotations } from "./js/loadNotations.js";

// Declarando Variaveis

    // Atualizar Cards
    const adicionarCard = document.getElementById('config-tot')
    const enviar = document.getElementById('sendNote')
    
    // Adicionar Cards
    const adicionar = document.getElementById('adicionar')
    var textareaUm = document.getElementById('resumoFlash')
    var textareaDois = document.getElementById('descricaoFlash')
    
    // All Category variables
        // Category configuration
        const iconeAbrirFechar = document.getElementById('iconeAbrirFechar')
        const bgCriarCategoria = document.getElementById('bg-criarCategoria')
        const newCategory = document.getElementById('newCategory')
        const abrirFechar = document.getElementById('abrirFechar')
        const manipularCategorias = document.getElementById('manipularCategorias')
    
        // Create category
        const saveNewCategory = document.getElementById('saveNewCategory')

        // Edit of categories
        const salvarEditCateg = document.getElementById('salvarEditCateg')

        // Delete categories
        const delConfirmado = document.getElementById('delConfirmado')
        
        
    // Warn 2
    const aviso2 = document.getElementById('aviso2')
    const cliqueAviso = document.getElementById('cliqueAviso')
    const textoAviso = document.getElementById('textoAviso')
    let avisoHeight
    setTimeout(()=>{
        avisoHeight = textoAviso.offsetHeight + 2
        console.log(avisoHeight)
    },[200])
    
    // + 2 pois a borda tbm tem width, 1 pixel em cima e 1 pixel em baixo

    // Warn for mobile devices
    const warnForMobileBg = document.getElementById('warnForMobileBg')

    // Holder for animated border
    const holder = document.getElementById('holder')

    // Language section
    const changeLanguage = document.getElementById('changeLanguage')
    const langsNodelist = document.querySelectorAll('.lang')
    const langsFormatted = Array.from(langsNodelist)

// Fim Declarando Variaveis

// Configuration for localStorage and language changer
const langFromLocalStorage = localStorage.getItem('lang')
let langForFunction;

if(!langFromLocalStorage){
    localStorage.setItem('lang', JSON.stringify({lang: 'us'}))
    langForFunction = 'us'

    langsFormatted.forEach((lang)=>{
        if(lang.id == 'us'){
            lang.className = 'lang selected'
        }else{
            lang.className = 'lang unSelected'
        }
    })
}else{
    langsFormatted.forEach((lang)=>{
        const language = JSON.parse(langFromLocalStorage).lang
        langForFunction = language

        if(lang.id == language){
            lang.className = 'lang selected'
        }else{
            lang.className = 'lang unSelected'
        }
    })
}



// resgata as anotações e as categorias que estão no local storage, se n tiver nenhuma eles recebem arrays vazios
    const categorias = JSON.parse(localStorage.getItem('categorias')) || []
    const anotacoes = JSON.parse(localStorage.getItem('anotacoes')) || []

// Function to simplify the use of styles
function aplyStyles(element, styles) {
    Object.assign(element.style, styles)
}

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

    
    // Analisa se a edição de categorias está aberta, e se ao mesmo tempo o usuario clicou em outro lugar da tela, fazendo com que a edição de categorias seja fechada, também analisa se a edição de categoria está aberta, se estiver aberta, ele não fecha a mostragem de todas as categorias 
    window.addEventListener('click', (e)=>{
        if(!manipularCategorias.contains(e.target) && !abrirFechar.contains(e.target) && manipularCategorias.style.width == '220px' && !bgEditCateg.contains(e.target)){
            aplyStyles(manipularCategorias, {
                animation : 'fecharCategorias 1s ease-in-out',
                width : '0px',
                border : '0px solid white',
                height : '0px',
            })
            iconeAbrirFechar.style.rotate = '0deg'
        }
    })

    // Abre e fecha as categorias usando uma animação para deixar elegante
    abrirFechar.addEventListener('click', ()=>{
        if(manipularCategorias.style.width == '220px'){
            aplyStyles(manipularCategorias, {
                animation : 'fecharCategorias 1s ease-in-out',
                width : '0px',
                border : '0px solid white',
                height : '0px',
            })

            iconeAbrirFechar.style.rotate = '0deg'
        }else if(manipularCategorias.style.width == '0px'){
            aplyStyles(manipularCategorias, {
                animation : 'abrirCategorias 1s ease-in-out',
                width : '220px',
                border : '1px solid white',
                height : '220px',
            })
            iconeAbrirFechar.style.rotate = '135deg'
        }
    })

    // Abre a criação de uma nova categoria
    newCategory.addEventListener('click', ()=>{
        bgCriarCategoria.style.display = 'flex'
    })

    // Exibe o aviso do localStorage
    cliqueAviso.addEventListener('click', ()=>{
        if(window.innerWidth >= 768){
            if(aviso2.style.transform == `translateY(${avisoHeight}px)`){
                aviso2.style.transform = "translateY(0px)"
            }else if(aviso2.style.transform == "translateY(0px)"){
                aviso2.style.transform = `translateY(${avisoHeight}px)`
            }
        }else{
            console.log('oi')
            warnForMobileBg.style.display = 'flex'
        }
        
    })

    setTimeout(()=>{
       // Executed just once, did for eventlisteners get configurated
        if(window.innerWidth >= 768){
            // Fecha o aviso do localStorage quando a pagina carrega
            aviso2.style.transform = `translateY(${avisoHeight}px)`
        }else{
            // Se a tela for mobile, configura o aviso para tal
            textoAviso.style.display = 'none'
            aviso2.style.width = '60px'
        } 
    },[200])
    

    // Fecha o aviso do localStorage && Fecha o aviso para dispositivo mobile
    window.addEventListener('click', (e)=>{
        if(aviso2.style.transform == "translateY(0px)" && !textoAviso.contains(e.target) && !cliqueAviso.contains(e.target) && textoAviso.style.display == 'block'){
            aviso2.style.transform = `translateY(${avisoHeight}px)`
        }

        if(warnForMobileBg.style.display == 'flex' && e.target === warnForMobileBg){
            warnForMobileBg.style.display = 'none'
        }
    })

    // Closes the localStorage warn when the screen resizes
    window.addEventListener('resize', (e)=>{
        

        if(e.target.innerWidth < 768){
            console.log('i')
            aviso2.style.transform = `translateY(0px)`
            textoAviso.style.display = 'none'
            aviso2.style.width = '60px'
        }else{
            
            console.log(avisoHeight)

            aviso2.style.transform = `translateY(${avisoHeight}px)`
            textoAviso.style.display = 'block'
        
            aviso2.style.width = '240px'
        }
    })

    // Analizys when the border needs an atualization for its values
    const observer = new ResizeObserver(() => {
        loadBorderAnimation()
    });

    observer.observe(holder)

    // Criar categoria
    saveNewCategory.addEventListener('click', ()=>{
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

    changeLanguage.addEventListener('click', (e)=>{
        if(changeLanguage.className == 'offSelection'){
            changeLanguage.className = 'onSelection'
            
            langsFormatted.forEach((lang)=>lang.className = 'lang selection')
        }else{
            if(e.target === changeLanguage){
                return;
            }

            const userClick = langsFormatted.find(lang => lang.id == e.target.id)
            
            localStorage.setItem('lang', JSON.stringify({lang: userClick.id}))
            loadLanguage(userClick.id)

            changeLanguage.className = 'offSelection'

            langsFormatted.forEach((lang)=>{
                const language = userClick.id
                
                if(lang.id == language){
                    lang.className = 'lang selected'
                }else{
                    lang.className = 'lang unSelected'
                }
            })

            // When the language changes, it gets the new height
            avisoHeight = textoAviso.offsetHeight + 2
            aviso2.style.transform = `translateY(${avisoHeight}px)`
        }
    })

// Fim Adicionando os EventListeners

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



// it didn't need to call loadBorderAnimation(), 'cause when the observer starts to observer the div, it already call the function, but for now, i'll let it there, 'cause it looks cool xD
loadBorderAnimation()
// Gets all cards on the localStorage that has been put on the const 'anotacoes' and create the frontend with it || Pega os cards do local storage que foram armazenados na const 'anotacoes' e cria o front com suas features
loadNotations()
// Gets the categories on the localStorage, and load the selects with it, and controls wich category the user is editing
loadCategories()
// Sets the site language
loadLanguage(langForFunction)