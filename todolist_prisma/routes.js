const AuthController = require("./controllers/AuthController")
const TodoController = require("./controllers/TodoController")
const UserController = require("./controllers/UserController")

const _routes = [
    ['users', UserController],
    ['auth', AuthController],
    ['todos', TodoController],
]

const routes = (app) =>{
    _routes.forEach(route => {
        const [url, controller] = route

        //http://localhost:8000/api
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes