const { STRING } = require('sequelize')
const db = require('./db')
const Project = db.sequelize.define('projects', {
    titulo: {
        type: db.Sequelize.STRING
    },

    conteudo: {
        type: STRING
    }
})


module.exports = Project