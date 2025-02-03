const enviar = document.getElementById('enviar')
const ver = document.getElementById('desver')
const p = document.getElementById('ver')
const btn = document.getElementById("btn")
const inp = document.getElementById('isenha')
const email = document.getElementById('iemail')
const nome = document.getElementById('inome')

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

function suc(resp){
    // window.location.href = 'http://127.0.0.1:5500/htmlCss/main/mainDev.html'
    // redireciona o usuario para o link desejado
    console.log('Sucesso paizão')
}

function campoDupli(campo){
    //analisa qual campo está duplicado e lança o erro na tela do usuario
    if(campo == 'email'){
        window.alert('Esse email ja existe')
        email.style.border = '2px solid red'
    }else if(campo == 'nome'){
        window.alert('Esse nome ja existe')
        nome.style.border = '2px solid red'
    }
}
// campo com estilo de erro
email.addEventListener('click', () => {
    if(email.style.border == '2px solid red'){
        email.style.border = '2px solid black'
    }
})

nome.addEventListener('click', () => {
    if(nome.style.border == '2px solid red'){
        nome.style.border = '2px solid black'
    }
})
// fim campo com estilo de erro


function Err(){
    
}

function criarUsuario(){
    let email = String(document.getElementById('iemail').value)
    let nome = String(document.getElementById('inome').value)
    let senha = String(document.getElementById('isenha').value)

    if(!email || !nome || !senha){
        window.alert("preecha os campos antes de enviar os dados")
    }else{
        if(senha.length < 4){
            window.alert("Insira uma senha maior que 4 digitos")
        }else{
            const usuario = {
                email,
                nome,
                senha
            }

            fetch('http://localhost:8081/cadastro', {
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
                    console.log(data)
                    if(data.resposta){
                        suc()
                    }else if(data.erro){
                        campoDupli(data.erro)
                    }
                }
            ).catch(
                (err) => {
                    console.log(console.log("Erro na conexão: " + err))
                    Err(err)
                }
            )
        }
    }
    
}