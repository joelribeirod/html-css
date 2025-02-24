const enviar = document.getElementById('enviar')
const ver = document.getElementById('desver')
const p = document.getElementById('ver')
const btn = document.getElementById("btn")
const inp = document.getElementById('isenha')
const email = document.getElementById('iemail')
const nome = document.getElementById('inome')
const caixaEmail = document.getElementById('caixaEmail')
const caixaNome = document.getElementById('caixaNome')
const caixaSucesso = document.getElementById('sucesso')

btn.addEventListener('click', () => {
    if(inp.type === 'password'){
        ver.innerHTML = 'visibility_off'
        p.innerHTML = 'Esconder senha'
        inp.type = 'text'
    }else if(inp.type === 'text'){
        ver.innerHTML = 'visibility'
        p.innerHTML = 'Ver senha'
        inp.type = 'password'
    }
})

enviar.addEventListener('click', (e) => {
    //Desliga o carrregamento automatico da tela e chama a funcão para criar o usuario
    e.preventDefault()
    criarUsuario()
})

function suc(){
    // mostra que teve sucesso ao cadastrar o usuario e redireciona o usuario para o link desejado(fazer o login)
    setTimeout(() => {
        caixaSucesso.style.display = 'block'
        window.location.href = '../auth/singIn.html'
    }, 5000)
}
const paragrafro = document.createElement('p')
function campoDupli(campo){
    
    paragrafro.className = 'paragrafoErro'
    paragrafro.innerText = `O ${campo} ja existe`
    //analisa qual campo está duplicado e lança o erro na tela do usuario
    if(campo == 'email'){ 
        email.style.border = '2px solid red'
        if(paragrafro){
            caixaEmail.appendChild(paragrafro)
        }
    }else if(campo == 'nome'){
        nome.style.border = '2px solid red'
        if(paragrafro){
            caixaNome.appendChild(paragrafro)
        }
    }
}
// campo com estilo de erro
email.addEventListener('click', () => {
    if(email.style.border == '2px solid red'){
        email.style.border = '2px solid black'
        caixaEmail.removeChild(paragrafro)
    }
    
})

nome.addEventListener('click', () => {
    if(nome.style.border == '2px solid red'){
        nome.style.border = '2px solid black'
        caixaNome.removeChild(paragrafro)
    }
})
// fim campo com estilo de erro


function criarUsuario(){
    let email = String(document.getElementById('iemail').value)
    let nome = String(document.getElementById('inome').value)
    let senha = String(document.getElementById('isenha').value)
    let celular = String(document.getElementById('itelefone').value)

    if(!email || !nome || !senha || !celular){
        window.alert("preecha os campos antes de enviar os dados")
    }else{
        if(senha.length < 4){
            window.alert("Insira uma senha maior que 4 digitos")
        }else{
            const usuario = {
                email,
                nome,
                senha,
                celular
            }

            fetch('https://projetot7.onrender.com/cadastro', {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(usuario)
            }).then(
                (resp) => resp.json()
            ).then(
                (data) => {
                    //aviso, mesmo que o dado não seja registrado na tabela pelo mesmo ja existir(dado duplicado), a requisição será considera como um sucesso e por isso cai nos then's
                    if(data.erro){
                        campoDupli(data.erro)
                        
                    }else if(data.sucesso){
                        suc()
                    }
                }
            ).catch(
                (err) => {
                    console.log(console.log("Erro na conexão: " + err))
                }
            )
        }
    }
    
}


// analisa se existe algum token

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

if(token){
    window.location.href = '../explorar/explorar.html'
}

// fim analisa se existe algum token