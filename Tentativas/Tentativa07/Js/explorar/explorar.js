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
    
    
    function carregarProjetos(projects){
        const total = []
        let quantidadePgns = Math.ceil(projects.length / 4)
        
        loading.style.display = 'block'

        let promises = projects.map((e) => 
            //console.log(e)
            fetch(`https://projetot7.onrender.com/cadastro/${e.cliente}`, {
                method: "GET",
                headers: {
                    'Content-Type':'application/json'
                }
            }).then(
                (resp) => resp.json()
            ).then(
                (data) => {
                    return criarHtml(data, e)
                }
            ).catch((err) => {console.log(err)})
        )

        Promise.all(promises).then((res) => {
            total.push(...res)
            exibirProjetos(total, quantidadePgns)
        }).catch(
            (err) => console.log(`Erro: ${err}`)
        ).finally(
            () => {
            loading.style.display = 'none'
        })
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
    
    // função que gera a separação da quantidade de projetos em 'paginas'
    function exibirProjetos(projects, Pgns){

        // pega a barra de rolagem
        const barraRolagem = document.getElementById('rolagem')

        // analisa se precisa ter mais de uma pagina
        if(Pgns > 1){

            // cria um for que gera uma quantidade de botões igual a quantidade de paginas
            for(let c = 1; c <= Pgns; c++){
                let btn = document.createElement('button')
                btn.textContent = c 
                // cada botão quando clicado 'muda' a pagina, avançando ou voltando 4 projetos

                btn.addEventListener('click', () => {
                    totProjects.innerHTML = ''

                    // eles fazem isso pegando a posição da pagina(1, 2, 3, etc), subtraem 1 para poderem se igual a um array
                    contador = Number(btn.textContent) - 1

                    // cria um 'inicio' multiplicando o contador por 4 (pagina atual multiplicado por quantidade de projetos em cada pagina), e um fim, que soma o inicio + 3 (Ex: 12 => 15), isso faz com que, dentro do array, se movam 4 posições, 4 projetos.
                    let inicio = (contador * 4)
                    let fim = inicio + 3

                    // cria um for que move os projetos da pagina atual conforme a pagina atual, se é a pagina 1, será do 0 ao 3, se é a 2, será do 4 ao 7
                    for(let n = inicio; n <= fim; n++){
                        if(projects[n]){
                            totProjects.appendChild(projects[n])
                        }else{
                            console.log('Sem mais projetos...')
                        }
                    }
                })

                // coloca os botões na barra de rolagem
                    barraRolagem.appendChild(btn)
            }
        }
        
        for(let c = 0; c <= 3; c++){
            if(projects[c]){
                totProjects.appendChild(projects[c])
            }else{
                console.log('Sem mais projetos...')
            }
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

    fetch('https://projetot7.onrender.com/projects', {
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
