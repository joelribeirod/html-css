const options = document.getElementById('options')
const principal = document.getElementById('principal')
const arrow = document.getElementById('voltar')
const configs = document.getElementById('configs')
const totProjects = document.getElementById('projetos')
const loading = document.getElementById('loading')

//responsividade
    if(window.innerWidth > 768){
        configs.style.transform = 'translateX(0)'
    }else{
        configs.style.transform = 'translateX(-140px)'
    }

    window.addEventListener('resize', ()=>{
        if(window.innerWidth > 768 && configs.style.transform == 'translateX(-140px)'){
            configs.style.transform = 'translateX(0px)'
        }else if(window.innerWidth < 768 && configs.style.transform == 'translateX(0px)'){
            principal.style.backgroundColor = '#ececec'
            arrow.style.rotate = '180deg'
            options.style.display = 'none'
            configs.style.transform = 'translateX(-140px)'
        }
    })

    window.addEventListener('click', (e) => {
        if(e.target == options){
            configs.style.transform = 'translateX(-140px)'

            principal.style.backgroundColor = '#ececec'

            arrow.style.rotate = '180deg'
            options.style.display = 'none'
        }
    })

    arrow.addEventListener('click', () => {
        if(configs.style.transform == 'translateX(-140px)'){
            // exibir configs
            configs.style.transform = 'translateX(0px)'

            principal.style.backgroundColor = '#7c7c7c'

            arrow.style.rotate = '0deg'
            options.style.display = 'block'
        }else{
            // esconder configs
            configs.style.transform = 'translateX(-140px)'

            principal.style.backgroundColor = '#ececec'

            arrow.style.rotate = '180deg'
            options.style.display = 'none'
        }
    })

//fim responsividade

// carregar os projetos
    let tot
    let dados
    let quantidadePgns 
    const userData = []
    const total = []
    let testeD = []
    let testeP = []

    function carregarProjetos(projects){
        quantidadePgns = Math.ceil(projects.length / 4)
        
        projects.forEach((e)=> {
            //console.log(e)
            fetch(`http://localhost:8081/cadastro/${e.cliente}`, {
                method: "GET",
                headers: {
                    'Content-Type':'application/json'
                }
            }).then(
                (resp) => resp.json()
            ).then(
                (data) => {
                    userData.push(data)
                    total.push(criarHtml(data, e))
                }
            ).catch((err) => {console.log(err)})
        })

        loading.style.display = 'block'

        setTimeout(() => {
            loading.style.display = 'none'
            exibirProjetos(total, quantidadePgns)
        }, 2000)
    }
    

    function criarHtml(userData, project){
    
        let projeto = document.createElement('div')
        projeto.className = 'projeto'

        let divDoProjeto = document.createElement('div')

        let paragNome = document.createElement('p')
        paragNome.className = 'nome'
        paragNome.textContent = userData.nome

        let paragTitulo = document.createElement('p')
        paragTitulo.className = 'titulo'
        paragTitulo.textContent = project.titulo
        
        let paragConteudo = document.createElement('p')
        paragConteudo.className = 'conteudo'
        paragConteudo.textContent = project.conteudo

        let btnContato = document.createElement('button')
        btnContato.textContent = 'Entrar em contato'
        btnContato.value = userData.telefone

        divDoProjeto.appendChild(paragNome)
        divDoProjeto.appendChild(paragTitulo)
        divDoProjeto.appendChild(paragConteudo)

        projeto.appendChild(divDoProjeto)
        projeto.appendChild(btnContato)

        return projeto
    }
// fim; carregar os projetos

// exibir projetos
    let contador = 1
    function exibirProjetos(projects, Pgns){
        const barraRolagem = document.getElementById('rolagem')
        barraRolagem.innerHTML = ''
        for(let c = 1; c <= Pgns; c++){
            let btn = document.createElement('button')
            btn.textContent = c 

            btn.addEventListener('click', () => {
                totProjects.innerHTML = ''
                contador = Number(btn.textContent) - 1
                let inicio = (contador * 4)
                let fim = inicio + 3

                console.log(inicio, fim)
                
                for(let n = inicio; n <= fim; n++){
                    if(projects[n]){
                        totProjects.appendChild(projects[n])
                    }else{
                        console.log('Sem mais projetos...')
                    }
                }
            })
            
            barraRolagem.appendChild(btn)
        }

        for(let c = 0; c <= 3; c++){
            totProjects.appendChild(projects[c])
        }
    }

// fim; exibir projetos

// Estrutura dos projects
    // cliente: 
    // "1"
    // conteudo: 
    // "teste com banco de dados 3"
    // createdAt: 
    // "2025-02-11T12:47:23.000Z"
    // id: 
    // 2
    // titulo: 
    // "teste"
    // updatedAt: 
    // "2025-02-11T12:47:23.000Z"

// resgatando os projetos

    fetch('http://localhost:8081/projects', {
        method: "GET",
        headers: {
            'Content-Type':'application/json'
        }
    }).then(
        (resp) => resp.json()
    ).then(
        (data) => carregarProjetos(data)
    ).catch((err) => {console.log(err)})

// fim; resgatando os projetos

// analisar autentificação

    const expira = localStorage.getItem('tokenExpiraEm')

    if(expira < Date.now()){
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiraEm");
        console.log("Token expirado! Redirecionando...");
    }

    const token = localStorage.getItem('token')
    if(!token){
        window.location.href = '../auth/singIn.html'
    }

// fim analisar autentificação

//quando os projetos estiverem aqui, ter um botão para entregar em contato com o cliente usando a api do whatsapp
