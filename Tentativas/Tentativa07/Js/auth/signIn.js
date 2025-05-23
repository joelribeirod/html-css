const ver = document.getElementById('desver')
const p = document.getElementById('ver')
const btn = document.getElementById("btn")
const inome = document.getElementById('inome')
const isenha = document.getElementById('isenha')
const enviar = document.getElementById('enviar')
const caixaNome = document.getElementById('caixaNome')
const caixaSenha = document.getElementById('caixaSenha')
const problema = document.getElementById('problema')

const loadingBG = document.getElementById('loadingBG')
const loading = document.getElementById('loading')

const paragrafro = document.createElement('p')
paragrafro.className = 'paragrafoErro'

function analisarUsuario(user){
    localStorage.setItem("token", user.token)

    //determina em quanto tempo o token vai expirar
    const expiraEm = Date.now() + user.duracaoDoToken * 1000;
    localStorage.setItem("tokenExpiraEm", expiraEm);

    window.location.href = "../projetosPessoais/projetosPessoais.html"
}



function usuarioNaoEncontrado(){
    console.log("User Not Found")

    paragrafro.innerText = "Usuario ou senha incorretas"

    inome.style.border = '2px solid red'
    isenha.style.border = '2px solid red'
    problema.appendChild(paragrafro)
}

inome.addEventListener('click', ()=>{
    if(inome.style.border == '2px solid red'){
        inome.style.border = '2px solid black'
        isenha.style.border = '2px solid black'
        problema.removeChild(paragrafro)
    }
    
})

isenha.addEventListener('click', ()=>{
    if(isenha.style.border == '2px solid red'){
        isenha.style.border = '2px solid black'
        inome.style.border = '2px solid black'
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
    //tentar implementar: em vez de enviar apenas o nome, enviar um objeto json nos parametros, e dentro do backend, analisar se o nome e a senha estão corretos, pois, se o usuario apenas acertar o nome, mas n a senha, ainda sim todos os dados acabam sendo enviados para o front para a analise da senha, o que eu imagino que seja uma baita falha de segurança
    //ou, em vez de fazer a verificação de nome errado ou senha errado, apenas retornar que algum dos dados imformados estão errados

    //feito
    
    if(!nome || !senha){
        window.alert("Preencha os campos necessrios")
    }else{
        const user = {
            nome,senha
        }
        if(senha.length < 4){
            window.alert("A senha deve conter mais de 4 digitos")
        }else{
            loadingBG.style.display = 'flex'

            let promise = fetch(`https://projetot7.onrender.com/verificar`, {
                method: "POST",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(user)
            }).then(
                (resp) => resp.json()
            ).catch((err)=>{
                console.log(err)
            })

            Promise.resolve(promise).then((data) => {
                if(data.resp){
                    usuarioNaoEncontrado()
                }else{
                    analisarUsuario(data)
                }     
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                loadingBG.style.display = 'none'
            })

        }
    }
})

// analisa se existe algum token

    const expira = localStorage.getItem('tokenExpiraEm')

    if (expira < Date.now()) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiraEm");
    }

    const token = localStorage.getItem('token')

    if(token){
        window.location.href = '../explorar/explorar.html'
    }

// fim analisa se existe algum token