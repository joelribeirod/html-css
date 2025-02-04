// Estrutura da tabela pessoas
const db = require('./db')
const Login = db.sequelize.define('pessoas', {
    email: {
        type: db.Sequelize.STRING,
        unique: true
    },
    nome: {
        type: db.Sequelize.STRING,
        unique: true
    },
    senha: {
        type: db.Sequelize.STRING
    }
})

//Derruba a tabela atual e cria outra igual
//Login.sync({force: true})

module.exports = Login