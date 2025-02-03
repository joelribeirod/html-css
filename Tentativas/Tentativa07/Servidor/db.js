const Sequelize = require('sequelize')
const sequelize = new Sequelize('servidordat7', 'root', '#Joel2210', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(
    console.log("Conexão realizada com sucesso")
).catch(
    (err) => {
        console.log(`Erro ao conectar: ${err}`)
    }
)

module.exports ={
    Sequelize: Sequelize,
    sequelize: sequelize
}