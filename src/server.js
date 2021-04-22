// Chamando biblioteca pra criar servidor(express)
const express = require("express")
// Setando constante server como a biblioteca express
const server = express()
// Pegando o express.Router atraves do require e do module.exports do arquivo routes, que exporta a constante que possui como valor o express.Router(as rotas)
const routes = require("./routes.js")
// Importando path
const path = require("path")


// Usando o template engine (ejs)
server.set('view engine', 'ejs')

// Mudando a localização da pasta views
server.set('views', path.join(__dirname, 'views'))


// Habilitar arquivos estaticos(na pasta public)
server.use(express.static("public"))

// Usar o req.body
server.use(express.urlencoded({ extended: true }))

// routes exportadas pelo routes.js
server.use(routes)

// servidor na porta 3000
server.listen(3000, () => console.log('rodando'))

