const express = require("express");
const app = express()
const Project = require('./project')

const respostaSucesso ={
    resposta: "Requisição realizada com sucesso"
}

const respostaFalha ={
    resposta: "Erro ao cadastrar o dado: "
}

app.use(express.json())

app.get('/projects', (req, res) => {
    Project.findAll().then((posts) =>{
        res.send(posts)
    }).catch((err) => {
        res.status(500).send(`Erro recuperar os dados: ${err}`)
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


app.listen(8081, () => {
    console.log("Servidor rodando na porta localhost:8081")
})