// Mapping function dari module ke API 
const m$user = require('../modules/user.module')

const { Router } = require('express')
const response = require('../helpers/response')
const authorize = require('../middleware/auth-middleware')

const UserController = Router()

UserController.get('/', async (req, res) => {
    const list = await m$user.listUser()
    // response helper
    response.sendResponse(res, list)
})

UserController.post('/', async (req, res) => {
    // req.body berisi data yang dikirim dari client
    const add = await m$user.createUser(req.body)

    // response helper
    response.sendResponse(res, add)
})

UserController.put('/:id', async (req, res) => {
    // req.body berisi data yang dikirim dari client
    const update = await m$user.updateUser(req.body, req.params.id)

    // response helper
    response.sendResponse(res, update)
})
UserController.delete('/:id', async (req, res) => {
    // req.body berisi data yang dikirim dari client
    const destroy = await m$user.destroyUser(req.params.id)

    // response helper
    response.sendResponse(res, destroy)
})

module.exports = UserController