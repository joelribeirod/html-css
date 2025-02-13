const options = document.getElementById('options')
const principal = document.getElementById('principal')
const arrow = document.getElementById('voltar')
const configs = document.getElementById('configs')
const salvarAlteracaoBtn = document.getElementById('alterar')
const deslogarContaBtn = document.getElementById('deslogar')
const excluirContaBtn = document.getElementById('deletar')

const inputName = document.getElementById('userName')
const inputEmail = document.getElementById('userEmail')
const inputTelefone = document.getElementById('userTel')
const inputSenha = document.getElementById('userPassword')

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

// resgatar dados do usuario

function mostrarPerfil(user){
    inputName.placeholder = user.nome
    inputEmail.placeholder = user.email
    inputTelefone.placeholder = user.telefone
    inputSenha.value = user.senha
    
    const editName = document.getElementById('editarNome')

    editName.addEventListener('click', () => {
        if(inputName.hasAttribute("Disabled")){
            inputName.removeAttribute("disabled")
            inputName.focus()
            inputName.placeholder = ''
        }
    })

    window.addEventListener('click', (e) =>{
        if(inputName.focus && e.target != editName){
            inputName.placeholder = user.nome
            inputName.setAttribute("disabled", true)
        }
    })

    console.log(user)
}

// fim resgatar dados do usuario

//

salvarAlteracaoBtn.addEventListener('click', () =>{

})

deslogarContaBtn.addEventListener('click', ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiraEm");
    window.location.href = '../auth/singIn.html'
})

excluirContaBtn.addEventListener('click', () => {

})

//

// analisa se o token ainda é valido
const expira = localStorage.getItem('tokenExpiraEm')

if(expira > Date.now()){
    console.log(true)
}else {
    if (expira && Date.now() > expira) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiraEm");
    }
}

const token = localStorage.getItem('token')
if(!token){
    window.location.href = '../auth/singIn.html'
}
// fim analisa se o token ainda é valido

// resgata o usuario atual

fetch('http://localhost:8081/perfil', {
    method: "GET",
    headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
}).then(
    (resp) => resp.json()
).then(
    (data) => {
        mostrarPerfil(data)
    }
).catch(
    (err) => {
        console.log(console.log(err))
    }
)

// fim resgata o usuario atual