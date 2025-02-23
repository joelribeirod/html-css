const Sequelize = require('sequelize')
const sequelize = new Sequelize('servidordat7', 'root', '12345', {
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