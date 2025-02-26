//constante relacionadas a responsividade
const options = document.getElementById('options')
const principal = document.getElementById('principal')
const arrow = document.getElementById('voltar')
const configs = document.getElementById('configs')

const alerta = document.getElementById('alerta')
const divProjetos = document.getElementById('projetos')

const confirmDelBG = document.getElementById('confirmDelBG')
const cancelBtn = document.getElementById('cancelDelBtn')
const confirmBtn = document.getElementById('confirmDelBtn')

const atualizarDadoBG = document.getElementById('atualizarDadoBG')
const cancelarEdit = document.getElementById('cancelarEdit')
const salvarEdit = document.getElementById('salvarEdit')

const novoTitulo = document.getElementById('novoTitulo')
const novoConteudo = document.getElementById('novoConteudo')

const loadingBG = document.getElementById('loadingBG')
const loading = document.getElementById('loading')

//responsividade
    if(window.innerWidth > 768){
        configs.style.transform = 'translateX(0)'
    }else{
        configs.style.transform = 'translateX(-160px)'
    }

    window.addEventListener('resize', ()=>{
        if(window.innerWidth > 768 && configs.style.transform == 'translateX(-160px)'){
            configs.style.transform = 'translateX(0px)'
        }else if(window.innerWidth < 768 && configs.style.transform == 'translateX(0px)'){
            principal.style.backgroundColor = '#ececec'
            arrow.style.rotate = '180deg'
            options.style.display = 'none'
            configs.style.transform = 'translateX(-160px)'
        }
    })

    window.addEventListener('click', (e) => {
        if(e.target == options){
            configs.style.transform = 'translateX(-160px)'

            principal.style.backgroundColor = '#ececec'

            arrow.style.rotate = '180deg'
            options.style.display = 'none'
        }
    })

    arrow.addEventListener('click', () => {
        if(configs.style.transform == 'translateX(-160px)'){
            // exibir configs
            configs.style.transform = 'translateX(0px)'

            principal.style.backgroundColor = '#7c7c7c'

            arrow.style.rotate = '0deg'
            options.style.display = 'block'
        }else{
            // esconder configs
            configs.style.transform = 'translateX(-160px)'

            principal.style.backgroundColor = '#ececec'

            arrow.style.rotate = '180deg'
            options.style.display = 'none'
        }
    })
//fim responsividade

// fazendo requisições de projetos
    // requisição para deletar um projeto
function deletarProjeto(id){
    loadingBG.style.display = 'flex'
    let promise = fetch(`https://projetot7.onrender.com/projects/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type':'application/json'
        }
    }).then(
        (resp) => resp.json()
    ).catch(
        (err) => {
            console.log(err)
        }
    ) 

    Promise.resolve(promise).then(()=>{
        window.location.reload()
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        loadingBG.style.display = 'none'
    })
}

    // requisição para atualizar um projeto
function atualizarProjeto(id, tituloAnt, conteudoAnt ){
    // pega os valores digitados pelo usuario
        let tituloAtualizado = document.getElementById('novoTitulo').value
        let conteudoAtualizado = document.getElementById('novoConteudo').value
    // analise se eles não são valores nulos
        if(!tituloAtualizado || !conteudoAtualizado){
            window.alert('Não é permitido enviar dados vazios')
            return null
        }
    // analisa se ambos os valores não foram modificados
        if(tituloAtualizado == tituloAnt && conteudoAtualizado == conteudoAnt){
            window.alert('Dados não foram alterados para serem enviados')
            return null
        }
    // cria o objeto com os novos valores e que será enviado para o servidor 
        const projetoAtualizado = {
            novoTitulo: tituloAtualizado,
            novoConteudo: conteudoAtualizado
        }
    // retorna o promise que envia os dados para o servidor, se der certo, o segundo then retorna true, se não, o catch retorna false
        loadingBG.style.display = 'flex'
        let promise = fetch(`https://projetot7.onrender.com/projects/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(projetoAtualizado)
        }).then(
            (resp) => resp.json()
        ).catch((err) => {
            console.log(err)
        })

        Promise.resolve(promise).then((data) => {
            console.log(data)
            window.location.reload()
        }).catch((err) => {
            console.log(err)
            window.alert("Algo deu errado")
        }).finally(() => {
            loadingBG.style.display = 'none'
        })
}

// fim; fazendo requisições de projetos

// carregarProjetos
        //recebe todos os projetos do usuario atual
    function carregarProjetos(projetosIndividuais){
        //analisa a quantidade de paginas que haverá
            let quantidadePgns = Math.ceil(projetosIndividuais.length / 4)
        
        // analisa se existe algum projeto cadastrado pelo usuario atual
            if(projetosIndividuais == ''){
                alerta.style.display = 'block'
                return null
            }
        // constante que receberá todos os projetos ja em HTML
            const totProjects = []

            // cria o HTML e as funções que cada projeto retá
        projetosIndividuais.forEach((projeto) => {
            let divMain = document.createElement('div')
            divMain.className = 'projeto'

            let subDiv = document.createElement('div')
            subDiv.className = 'subDiv'

            let paragTitulo = document.createElement('p')
            paragTitulo.className = 'titulo'
            paragTitulo.textContent = projeto.titulo
            
            let paragConteudo = document.createElement('p')
            paragConteudo.className = 'conteudo'
            paragConteudo.textContent = projeto.conteudo 

            let divBtns = document.createElement('div')
            divBtns.className = 'divBtns'

            let btnEditar = document.createElement('span')
            btnEditar.textContent = 'edit'
            btnEditar.className = 'material-symbols-outlined'

            let btnRemover = document.createElement('span')
            btnRemover.textContent = 'delete'
            btnRemover.className = 'material-symbols-outlined'

            //função que chama a requisição de delete e remove o eventListener (isso tem que ser feito pois, se o eventListener n for removido, sempre que o botão de confirmar delete ou recusar delete for clicado, o codigo vai criando funções e com isso elas vão se acumulando, e para evitar varios ids sendo enviados ao deletarProjeto() eu removo os eventListener a cada interação)
                function chamarDelete(){
                    deletarProjeto(projeto.id)
                    confirmBtn.removeEventListener('click', chamarDelete)
                }

            // Função que remove o reload automatico do botão 'salvar', chama a função que fará requisição de patch, e para isso envio o id, titulo e conteudo do projeto que esta sendo modificado, se houve sucesso, o return é true, se não, o return é false
                function chamarPatch(e){
                    // remove o reload automatico ao clicar no botão
                        e.preventDefault()

                    // recebe a promise da função atualizar projeto, o valor recebido será ou true ou false
                        atualizarProjeto(projeto.id, projeto.titulo, projeto.conteudo)        
                }

            // quando clicado no icone de delete, ele abre a div de confirmação do delete, se o usuário clicar em confimar, a função chamarDelete() redireciona para outra função e remove o eventListener
                btnRemover.addEventListener('click', () => {
                    confirmDelBG.style.display = 'flex'
            
                    confirmBtn.addEventListener('click', chamarDelete)
                })

            // quando o usuario clica em cancelar, o eventListener tbm é removido para evitar acumulações e a div de confimar delete é fechada
                cancelBtn.addEventListener('click', () => {
                    confirmDelBG.style.display = 'none'
                    confirmBtn.removeEventListener('click', chamarDelete)
                })
            //  quando clicado no icone de edit, ele abre a div de atualização dos dados, onde o input titulo recebe o titulo do projeto atual, e o conteudo recebe o conteudo da pagina atual, e é colocado o eventListener no botão de salvar, quando clicado ele chama a funcção chamarPatch
                btnEditar.addEventListener('click', () => {
                    atualizarDadoBG.style.display = 'flex'

                    novoTitulo.value = projeto.titulo
                    novoConteudo.value = projeto.conteudo

                    salvarEdit.addEventListener('click', chamarPatch)
                })
            // Se o usuário clicar em cancelar, o reload automatico do botão é removido, a pagina de edição fecha, e o eventListener é removido para evitar acumulações
                cancelarEdit.addEventListener('click', (e) => {
                    e.preventDefault()
                    atualizarDadoBG.style.display = 'none'
                    salvarEdit.removeEventListener('click', chamarPatch)
                })

            subDiv.appendChild(paragTitulo)
            subDiv.appendChild(paragConteudo)

            divBtns.appendChild(btnRemover)
            divBtns.appendChild(btnEditar)

            divMain.appendChild(subDiv)
            divMain.appendChild(divBtns)

            totProjects.push(divMain)
        });
            //chama a função que vai exibir os projetos e a quantidade de paginas
        exibirProjetos(totProjects, quantidadePgns)
    }

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
                    divProjetos.innerHTML = ''
                    // eles fazem isso pegando a posição da pagina(1, 2, 3, etc), subtraem 1 para poderem se igual a um array
                    contador = Number(btn.textContent) - 1

                    // cria um 'inicio' multiplicando o contador por 4 (pagina atual multiplicado por quantidade de projetos em cada pagina), e um fim, que soma o inicio + 3 (Ex: 12 => 15), isso faz com que, dentro do array, se movam 4 posições, 4 projetos.
                    let inicio = (contador * 4)
                    let fim = inicio + 3
                    
                    // cria um for que move os projetos da pagina atual conforme a pagina atual, se é a pagina 1, será do 0 ao 3, se é a 2, será do 4 ao 7
                    for(let n = inicio; n <= fim; n++){
                        if(projects[n]){
                            divProjetos.appendChild(projects[n])
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
                divProjetos.appendChild(projects[c])
            }else{
                console.log('Sem mais projetos...')
            }
        }
    }

    // fim; exibir projetos

// fim; carregarProjetos

// analisa se o token ainda é valido
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
// fim analisa se o token ainda é valido

// resgatar projetos pessoais

fetch('https://projetot7.onrender.com/projetos', {
    method: "GET",
    headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
}).then(
    (resp) => resp.json()
).then(
    (data) => {
        carregarProjetos(data)
    }
).catch(
    (err) => {
        console.log(err)
    }
)

// fim; resgatar projetos pessoais