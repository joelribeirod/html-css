const options = document.getElementById('options')
const principal = document.getElementById('principal')
const arrow = document.getElementById('voltar')
const configs = document.getElementById('configs')
const requisitar = document.getElementById('requisitar')
const descartar = document.getElementById('descartar')
const caixaSuccs = document.getElementById('succs')
const caixaErro = document.getElementById('errs')

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

    if(caixaSuccs.style.display == 'flex' && e.target !== caixaSuccs.style.display){
        caixaSuccs.style.display = 'none'
    }
    if(caixaErro.style.display == 'flex' && e.target !== caixaErro.style.display){
        caixaErro.style.display = 'none'
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

// postar projetos no backend

function suc(){
    caixaSuccs.style.display = 'flex'
}

function Err(){
    caixaErro.style.display = 'flex'
}

function criarPost(){
    let titulo = String(document.getElementById('ititulo').value)
    let conteudo = String(document.getElementById('idescricao').value)

    if(!titulo || !conteudo){
        window.alert("preecha os campos antes de enviar os dados")
    }else{    
        const project = {
            titulo,
            conteudo
        }

        fetch('http://localhost:8081/projects', {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(project)
        }).then(
            (resp) => resp.json()
        ).then(
            (data) => {
                console.log(data)
                suc()
            }
        ).catch(
            (err) => {
                console.log(console.log(err))
                Err()
            }
        )
    }
    
}

function descarte(){
    let titulo = document.getElementById('ititulo')
    let conteudo = document.getElementById('idescricao')

    titulo.value = ''
    conteudo.value = ''

}

descartar.addEventListener('click', descarte)
requisitar.addEventListener('click', criarPost)


// fim postar projetos no backend