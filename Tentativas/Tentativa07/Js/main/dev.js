const options = document.getElementById('options')
const principal = document.getElementById('principal')
const arrow = document.getElementById('voltar')
const configs = document.getElementById('configs')
const aceitar = document.getElementById('aceitar')
const recusar = document.getElementById('recusar')
const projetos = document.getElementById('projetos')

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

// resgatar projetos

async function resgatarProjetos(){
    await fetch('https://projetot7.onrender.com/projects', {
        method: "GET",
        headers: {
            'Content-Type':'application/json'
        }
    }).then(
        (resp) => resp.json()
    ).then(
        (data) => {carregarProjeto(data)}
    ).catch((err) => {console.log(err)})
}



// fim resgatar projetos

// criação das divs com os projetos
let totProjects = []
function carregarProjeto(projects){
    //o forEach pega cada projeto indivual constroi um elemento html com os valores adicionados, e coloca dentro do array totProjects, o fetch dentro do forEach usa como parametro na url o e.cliente, pois cada projeto possui um campo chamado cliente, esse campo contem o ID do cliente que o requisitou, por isso, eu uso o fetch para resgatar os dados do cliente
    projects.forEach(async (e) => {
        let usuario
        await fetch(`https://projetot7.onrender.com/cadastro/${e.cliente}`, {
            method: "GET",
            headers: {
                'Content-Type':'application/json'
            }
        }).then(
            (resp) => resp.json()
        ).then(
            (data) => {usuario = data.nome}
        ).catch((err) => {console.log(err)})


        let project = document.createElement('div')
        project.className = 'projeto'

        let user = document.createElement('p')
        user.className = "nome"
        user.textContent = usuario

        let titulo = document.createElement('p')
        titulo.className = "titulo"
        titulo.textContent = e.titulo

        let conteudo = document.createElement('p')
        conteudo.className = 'conteudo'
        conteudo.textContent = e.conteudo

        project.appendChild(user)
        project.appendChild(titulo)
        project.appendChild(conteudo)

        totProjects.push(project)
        projetos.appendChild(totProjects[0])
    })
    
}

// fim criação das divs com os projetos

// lançando projeto indivudual

//essa função gera um numero aleatorio e guarda no array numeros
let numeros = [0]
function gerarNumero(min, max) {
    if(numeros.length >= (max-min)){
        return null
    }
    let n
    do{
        n = Math.floor(Math.random() * (max - min) + min)
    }while(numeros.includes(n))

    numeros.push(n)
    return n
}

// a função projeto serve para exibir os meus projetos que foram guardados no array totProjects, ela chama a função gerarNumero, como ela chama a função gerarNumero, ela sempre recebe um numero aleatorio, isso faz com que os projetos que forem exibidos (projetos.appendChild(totProjects[c])) sejam aleatorios e evita de seguir uma sequencia do mais recente para o mais antigo
function projeto(){
    if(numeros.length < totProjects.length){
        //remove o projeto anterior
        projetos.innerHTML = ''
        //coloca um novo projeto com a posição sendo aleatoria
        projetos.appendChild(totProjects[
            gerarNumero(0, totProjects.length)
        ])
    }else{
        numeros = []
    }
}   

// fim lançando projeto indivudual

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

recusar.addEventListener('click', projeto)

window.onload = resgatarProjetos()