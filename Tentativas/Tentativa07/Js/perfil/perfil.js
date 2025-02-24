//constante relacionadas a responsividade
const options = document.getElementById('options')
const principal = document.getElementById('principal')
const arrow = document.getElementById('voltar')
const configs = document.getElementById('configs')

//constantes relacionadas aos botões de confirmação
const salvarAlteracaoBtn = document.getElementById('alterar')
const deslogarContaBtn = document.getElementById('deslogar')
const excluirContaBtn = document.getElementById('deletar')

//constantes relacionadas aos inputs do perfil
const inputName = document.getElementById('userName')
const inputEmail = document.getElementById('userEmail')
const inputTel = document.getElementById('userTel')
const inputSenha = document.getElementById('userPassword')

//constantes relacionadas aos botões de edição na lateral dos inputs
const editNameBtn = document.getElementById('editarNome')
const editEmailBtn = document.getElementById('editEmail')
const editTelBtn = document.getElementById('editTel')
const editSenhaBtn = document.getElementById('editSenha')

//constantes relacionadas a edição de senha (1 div, 2 inputs, 2 erros, 1 botão)
const confirmSenha = document.getElementById('confirmSenha')
const analisarSenhaAnt = document.getElementById('senhaAntiga')
const senhaNova = document.getElementById('senhaNova')
const erroS = document.getElementById('erro')
const erroTamanho = document.getElementById('erroTam')
const enviarSenha = document.getElementById('enviar')

//meu deus é muita constante kk

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

// tratar erros/sucessos
const erroNomeRepetido = document.getElementById('erroNomeRepetido')
const erroEmailRepetido = document.getElementById('erroEmailRepetido')

function tratarResp(resp){
    if(resp.sucesso){
        window.alert('sucesso na atualização dos dados')
        window.location.reload()
    }else if(resp.erro){
        if(resp.erro == 'nome'){
            erroNomeRepetido.style.display = 'block'
        }else if(resp.erro == 'email'){
            erroEmailRepetido.style.display = 'block'
        }
    }
}
// fim; tratar erros/sucessos

// resgatar dados do usuario

function mostrarPerfil(user){
    console.log(user)
    //Pega os valores que vieram do banco de dados e coloca nos inputs
    inputName.placeholder = user.nome
    inputEmail.placeholder = user.email
    inputTel.placeholder = user.telefone
    inputSenha.value = user.senha
    
    //abre a edição do input nome
    editNameBtn.addEventListener('click', () => {
        if(inputName.hasAttribute("Disabled")){
            inputName.removeAttribute("disabled")
            inputName.focus()
            inputName.placeholder = ''
        }
        if(erroNomeRepetido.style.display == 'block'){
            erroNomeRepetido.style.display = 'none'
        }
    })

    //abre a edição do input email
    editEmailBtn.addEventListener('click', () => {
        if(inputEmail.hasAttribute("Disabled")){
            inputEmail.removeAttribute("disabled")
            inputEmail.focus()
            inputEmail.placeholder = ''
        }
        if(erroEmailRepetido.style.display = 'block'){
            erroEmailRepetido.style.display = 'none'
        }
    })

    //abre a edição do input telefone
    editTelBtn.addEventListener('click', () => {
        if(inputTel.hasAttribute("Disabled")){
            inputTel.removeAttribute("disabled")
            inputTel.focus()
            inputTel.placeholder = ''
        }
    })

    //abre a edição do input senha
    editSenhaBtn.addEventListener('click', ()=>{
        if(confirmSenha.style.display == 'none'){
            confirmSenha.style.display = 'flex'
        }
    })

    //fecha a edição do input nome
    window.addEventListener('click', (e) =>{
        if(!inputName.hasAttribute("disabled") && e.target != editNameBtn && e.target != inputName){
            inputName.placeholder = user.nome
            inputName.setAttribute("disabled", true)
        }
    })
    
    //fecha a edição do input email
    window.addEventListener('click', (e) =>{
        if(!inputEmail.hasAttribute("disabled") && e.target != editEmailBtn && e.target != inputEmail){
            inputEmail.placeholder = user.email
            inputEmail.setAttribute("disabled", true)
        }
    })
    
    //fecha a edição do input telefone
    window.addEventListener('click', (e) =>{
        if(!inputTel.hasAttribute("disabled") && e.target != editTelBtn && e.target != inputTel){
            inputTel.placeholder = user.telefone
            inputTel.setAttribute("disabled", true)
        }
    })

    //fecha a edição do input senha
    window.addEventListener('click', (e) =>{
        if(confirmSenha.style.display == 'flex' && e.target === confirmSenha && e.target != editSenhaBtn){
            confirmSenha.style.display = 'none'
        }
    })

    //Se havia um erro de senha, quando clicado na edição da senha antiga o erro some
    analisarSenhaAnt.addEventListener('click', () => {
        if(erroS.style.display == 'block'){
            erroS.style.display = 'none'
        }
    })

    //Se havia um erro de senha pequena(menos que 4 digitos), quando clicado na edição da nova senha o erro some
    senhaNova.addEventListener('click', () => {
        if(erroTamanho.style.display == 'block'){
            erroTamanho.style.display = 'none'
        }
    })
    
    //analisa se a senha antiga digitada é a mesma que foi recebida pelo banco de dados, depois analisa se a nova senha é menos que 4 digitos, se passar pelas 2 confirmações, então o novo valor digitado é armazenado no input
    enviarSenha.addEventListener('click', (e) => {
        e.preventDefault()
        if(analisarSenhaAnt.value != user.senha){
            erroS.style.display = 'block'
        }else{
            if(senhaNova.value.length < 4){
                erroTamanho.style.display = 'block'
                
            }else{
                inputSenha.value = senhaNova.value
                confirmSenha.style.display = 'none'
            }
        }
    })

    // constantes relacionadas a verificação para deletar a conta
        const deletarConta = document.getElementById('deletarConta')
        const erroSenha = document.getElementById('erroSenha')
        const delBtn = document.getElementById('del')
        const inputDel = document.getElementById('inputDel')

    //se tiver algum erro quando clicar no input, o erro some
        inputDel.addEventListener('click', () => {
            if(erroSenha.style.display == 'block'){
                erroSenha.style.display = 'none'
            }
        })

    //fecha a verificação de deletar conta
        deletarConta.addEventListener('click', (e) => {
            if(deletarConta.style.display == 'flex' && e.target === deletarConta){
                deletarConta.style.display = 'none'
            }
        })

    //abre a verificação para deletar a conta
        excluirContaBtn.addEventListener('click', (e) => {
            if(deletarConta.style.display == 'none'){
                deletarConta.style.display = 'flex'
            }
        })

    // botões de alterar dados, deslogar conta e excluir conta
        //deletar conta
    delBtn.addEventListener('click', (e) => {
        e.preventDefault()
        if(inputDel.value == user.senha){
            // Criar o fetch para deletar a conta, e remover o token
            fetch('https://projetot7.onrender.com/cadastro', {
                method: "DELETE",
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(
                (resp) => resp.json()
            ).then(
                localStorage.removeItem("token"),
                localStorage.removeItem("tokenExpiraEm"),
                window.location.href = '../auth/singIn.html'
            ).catch(
                (err) => {
                    console.log(console.log(err))
                }
            ) 
        }else{
            erroSenha.style.display = 'block'
        }
    })

        //alterar dados
    salvarAlteracaoBtn.addEventListener('click', () =>{
        const emailInvalido = document.getElementById('emailInvalido')
        const novoNome = document.getElementById('userName')
        const novoEmail = document.getElementById('userEmail')
        const novoTel = document.getElementById('userTel')
        const novaSenha = document.getElementById('userPassword')

        //regex para analisar o formato do email
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        editEmailBtn.addEventListener('click', () => {
            if(emailInvalido.style.display == 'block' ){
                emailInvalido.style.display = 'none'
            }
        })

        //analisa se o formato do email está correto
        if(novoEmail.value && !regex.test(novoEmail.value)){
            // para a execução da função
            emailInvalido.style.display = 'block'
            return null
        }

        const valoresAlterados = []

        // analisa e guarda os valores alterados
            if(novoNome.value && novoNome.value !== user.nome){
                valoresAlterados.push({nome: novoNome.value})
            }

            if(novoEmail.value && novoEmail.value !== user.email){
                valoresAlterados.push({email: novoEmail.value})
            }

            if(novoTel.value){
                valoresAlterados.push({telefone: novoTel.value})
            }

            if(novaSenha.value != user.senha){
                valoresAlterados.push({senha: novaSenha.value})
            }
        // fim; analisa e guarda os valores alterados

        // formata os valores para um unico objeto; [{w},{x},{y},{z}] => {w , x , y , z}
            let dadosFormatados = valoresAlterados.reduce((acc, item) => {
                return {...acc, ...item}
            }, {})

        //Envia os dados formatados para o banco substituir os valores antigos pelos atuais
        if(Object.keys(dadosFormatados).length === 0){
            window.alert('Nenhum dado foi alterado')
        }else{
            fetch('https://projetot7.onrender.com/cadastro', {
            method: "PATCH",
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dadosFormatados)
            }).then(
                (resp)=> resp.json()
            ).then((data)=>{
                tratarResp(data)
            }
            ).catch((err)=>{
                console.log(err)
            })
        }
    })

    //deslogar a conta
        deslogarContaBtn.addEventListener('click', ()=>{
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpiraEm");
            window.location.href = '../auth/singIn.html'
        })

    // fim botões de alterar dados, deslogar conta e excluir conta

}

// fim resgatar dados do usuario

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

// resgata o usuario atual

fetch('https://projetot7.onrender.com/perfil', {
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