const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD, {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql'
    }
)

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