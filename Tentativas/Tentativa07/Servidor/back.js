require("dotenv").config()
//dotenv não está sendo usado
const express = require("express");
const app = express()
const Project = require('./project')
const cors = require('cors');
const Login = require("./login");
const jwt = require("jsonwebtoken")
const chaveSecreta = "minha_aplicacao"

const respostaSucesso ={
    resposta: "Requisição realizada com sucesso"
}

const respostaFalha ={
    resposta: "Erro na requisição: "
}

// Se precisar permitir apenas um domínio específico
// app.use(cors({ origin: 'http://127.0.0.1:5500' }));

app.use(cors())
app.use(express.json())

// gerar token

function gerarToken(user){
    return jwt.sign(
        {userId: user.id},
        chaveSecreta,
        {expiresIn: "1h"}
    )
}

// fim gerar token

// Rota projects

app.get('/projects', (req, res) => {
    Project.findAll().then((posts) =>{
        res.send(posts)
    }).catch((err) => {
        res.status(500).send(respostaFalha + err)
    })
})

app.post('/projects', (req, res) => {
    Project.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(
        res.send(respostaSucesso)
    ).catch((err) => {
        res.send(respostaFalha + err)
    })
})

app.delete('/projects/:id', (req, res) => {
    Project.destroy({where: {'id': req.params.id}}).then(
        () => {res.send(respostaSucesso)}
    ).catch((err) => {
        res.status(500).send(respostaFalha + err)
    })
})

app.patch('/projects/:id', (req, res) => {
    Project.update(
        {   
            titulo: req.body.titulo,
            conteudo: req.body.conteudo  
        },
        {where: {'id': req.params.id}}
    ).then( 
       () => {res.send(respostaSucesso)}
    ).catch((err) => {
        res.status(500).send(respostaFalha + err)
    })
})

// Fim Rota projects

// Rota Login
//verificar se o usuario existe no banco (seria o GET na vdd, mas o get n permite envio de dados através do body)
app.post('/verificar', (req, res) => {
    Login.findOne({
        where: {'nome': req.body.nome, 'senha': req.body.senha}
    }).then((user) =>{
        if(user){
            const token = gerarToken(user)
            res.json({auth: true, token})
        }else{
            res.send({resp: "Usuario ou senha incorreta"})
        } 
    }).catch((err) => {
        res.status(500).send(respostaFalha + err)
    })
})



app.post('/cadastro', async (req, res) => {
    try {
        //Tenta registrar o usuario
        await Login.create({
            //os campos do req.body.<campo> tem que serem iguais aos que foram enviados pelo frontend
            email: req.body.email,
            nome:req.body.nome,
            senha:req.body.senha,
            telefone: req.body.celular
        })
        res.send(respostaSucesso)
    } catch (err) {
        //analisa se o erro ao registrar foi por ja existir um campo igual ao que o usuario digitou
        if (err.name === 'SequelizeUniqueConstraintError') {
            //se o erro for de dado duplicado, ele pega qual foi o campo duplicado e envia para o singUp
            const erro = {
                erro: err.errors[0].path
            }
            res.status(400).send(erro);
        } else {
            //se o erro não for identificado, ele envia um erro qualquer na requisição
            res.status(500).send(respostaFalha + err); 
        }
    }
})

// app.delete()

// app.patch()


// Fim Rota Login 

app.listen(8081, () => {
    console.log("Servidor rodando na porta http://localhost:8081")
})