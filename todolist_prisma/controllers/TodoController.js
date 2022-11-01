const m$todo = require('../modules/todo.module')

const { Router } = require('express')
const response = require('../helpers/response')
const authorize = require('../middleware/auth-middleware')

const TodoController = Router()

TodoController.get('/', authorize, async (req, res) => {
    const list = await m$todo.listTodo()
    // response helper
    response.sendResponse(res, list)
})

TodoController.post('/', authorize, async (req, res) => {
    // req.body berisi data yang dikirim dari client
    const userId = req.user.id
    const add = await m$todo.createTodo(req.body, userId)

    // response helper
    response.sendResponse(res, add)
})

TodoController.get('/user', authorize, async (req, res) => {
    const userId = req.user.id
    const listTodoUser = await m$todo.listTodoUser(userId)
    // response helper
    response.sendResponse(res, listTodoUser)
})

TodoController.get('/filter/user/:id', authorize, async (req, res) => {
    const userId = parseInt(req.params.id)
    const listTodoUser = await m$todo.listTodoUser(userId)
    // response helper
    response.sendResponse(res, listTodoUser)
})

TodoController.put('/:id', authorize, async (req, res) => {
    // req.body berisi data yang dikirim dari client
    const id = parseInt(req.params.id)
    const update = await m$todo.updateTodo(req.body, id)

    // response helper
    response.sendResponse(res, update)
})

TodoController.delete('/:id', authorize, async (req, res) => {
    // req.body berisi data yang dikirim dari client
    const id = parseInt(req.params.id)
    const destroy = await m$todo.destroyTodo(id)

    // response helper
    response.sendResponse(res, destroy)
})

module.exports = TodoController