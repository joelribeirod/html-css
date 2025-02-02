const express = require("express");
const app = express()
const Project = require('./project')
const cors = require('cors')

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

// Fim Rota

app.listen(8081, () => {
    console.log("Servidor rodando na porta http://localhost:8081")
})