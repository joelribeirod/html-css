const db = require('./db')
const Project = db.sequelize.define('projects', {
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    },
    cliente: {
        type: db.Sequelize.STRING
    }
})


module.exports = Project