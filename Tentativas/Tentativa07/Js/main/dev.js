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

// resgatar projetos

async function resgatarProjetos(){
    await fetch('http://localhost:8081/projects', {
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
        await fetch(`http://localhost:8081/cadastro/${e.cliente}`, {
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

        let user = document.createElement('h1')
        user.className = "usuario"
        user.textContent = usuario

        let titulo = document.createElement('h1')
        titulo.className = "titulo"
        titulo.textContent = e.titulo

        let conteudo = document.createElement('p')
        conteudo.className = 'texto'
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
let numeros = []
function gerarNumero(min, max) {
    if(numeros.length >= (max-min)){
        console.log("todos os numeros utilizados")
        return null
    }
    let n
    do{
        n = Math.floor(Math.random() * (max - min) + min)
    }while(numeros.includes(n))

    numeros.push(n)
    return n
}

let c = 0

// a função projeto serve para exibir os meus projetos que foram guardados no array totProjects, ela chama a função gerarNumero, como ela chama a função gerarNumero, ela sempre recebe um numero aleatorio, isso faz com que os projetos que forem exibidos (projetos.appendChild(totProjects[c])) sejam aleatorios e evita de seguir uma sequencia do mais recente para o mais antigo
function projeto(){
    if(numeros.length < totProjects.length){
        c = gerarNumero(0, totProjects.length)
        projetos.innerHTML = ''
        projetos.appendChild(totProjects[c])
        console.log(c,numeros)
    }else{
        numeros = []
    }
}   

// fim lançando projeto indivudual

// analisar autentificação

const expira = localStorage.getItem('tokenExpiraEm')

if(expira > Date.now()){
    console.log(true)
}else {
    if (expira && Date.now() > expira) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiraEm");
        console.log("Token expirado! Redirecionando...");
    }

}

const token = localStorage.getItem('token')
if(!token){
    window.location.href = '../auth/singIn.html'
}

// fim analisar autentificação

recusar.addEventListener('click', projeto)

window.onload = resgatarProjetos()