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
    

    projects.forEach((e) => {
        let project = document.createElement('div')
        project.className = 'projeto'

        let titulo = document.createElement('h1')
        titulo.className = "titulo"
        titulo.textContent = e.titulo

        let conteudo = document.createElement('p')
        conteudo.className = 'texto'
        conteudo.textContent = e.conteudo

        project.appendChild(titulo)
        project.appendChild(conteudo)

        totProjects.push(project)
    });
    projetos.appendChild(totProjects[0])
}

// fim criação das divs com os projetos

// lançando projeto indivudual
let c = 1
function projeto(){
    if(totProjects.length > c){
        const elemento = totProjects
        projetos.innerHTML = ''
        projetos.appendChild(elemento[c])
        c += 1
    }else{
        console.log("Sem mais projetos")
    }}
    

// fim lançando projeto indivudual

recusar.addEventListener('click', projeto)

window.onload = resgatarProjetos()