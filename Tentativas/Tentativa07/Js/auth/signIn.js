const ver = document.getElementById('desver')
const p = document.getElementById('ver')
const btn = document.getElementById("btn")
const inome = document.getElementById('inome')
const isenha = document.getElementById('isenha')
const enviar = document.getElementById('enviar')
const caixaNome = document.getElementById('caixaNome')
const caixaSenha = document.getElementById('caixaSenha')
const problema = document.getElementById('problema')

const paragrafro = document.createElement('p')
paragrafro.className = 'paragrafoErro'

function analisarUsuario(user, senha){
    //Estrutura do user: id, email, nome, senha, createdAt, updatedAt
    if(user.senha !== senha){
        isenha.style.border = '2px solid red'
        paragrafro.innerText = "Senha incorreta"
        problema.appendChild(paragrafro)
    }else if(user.senha === senha){
        window.location.href = "../main/mainDev.html"
    }
}



function usuarioNaoEncontrado(){
    console.log("User Not Found")

    paragrafro.innerText = "Usuario não encontrado"

    inome.style.border = '2px solid red'
    caixaNome.appendChild(paragrafro)
}

inome.addEventListener('click', ()=>{
    if(inome.style.border == '2px solid red'){
        inome.style.border = '2px solid black'
        caixaNome.removeChild(paragrafro)
    }
    
})

isenha.addEventListener('click', ()=>{
    if(isenha.style.border == '2px solid red'){
        isenha.style.border = '2px solid black'
        problema.removeChild(paragrafro)
    }
    
})

btn.addEventListener('click', () => {
    if(isenha.type === 'password'){
        ver.innerHTML = 'visibility_off'
        p.innerHTML = 'Esconder senha'
        isenha.type = 'text'
    }else if(isenha.type === 'text'){
        ver.innerHTML = 'visibility'
        p.innerHTML = 'Ver senha'
        isenha.type = 'password'
    }
})

enviar.addEventListener('click', (e)=>{
    e.preventDefault()
    let nome = String(document.getElementById('inome').value)
    let senha = String(document.getElementById('isenha').value)

    if(!nome || !senha){
        window.alert("Preencha os campos necessrios")
    }else{
        if(senha.length < 4){
            window.alert("A senha deve conter mais de 4 digitos")
        }else{
            fetch(`http://localhost:8081/cadastro/${nome}`, {
                method: "GET",
                headers: {
                    'Content-Type':'application/json'
                }
            }).then(
                (resp) => resp.json()
            ).then(
                (data) => {
                    if(data.resp){
                        usuarioNaoEncontrado()
                    }else{
                        analisarUsuario(data, senha)
                    }
                    
                }
            ).catch((err)=>{
                console.log(err)
            })
        }
    }
})

