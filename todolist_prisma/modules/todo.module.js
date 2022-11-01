const prisma = require('../helpers/database')
const bcrypt = require('bcrypt')
const Joi = require('joi')


class _todo {

    listTodo = async () => {
        try {
            const list = await prisma.todo.findMany()

            return {
                status: true,
                code: 200,
                data: list
            }
        } catch (error) {
            console.error('listTodo todo module Error:', error)

            return {
                status: false,
                error
            }
        }
    }

    createTodo = async (body, userId) => {
        try {
            const schema = Joi.object({
                description: Joi.string().required()
            }).options({ abortEarly: false })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const add = await prisma.todo.create({
                data: {
                    description: body.description,
                    user_id: userId
                }
            })

            return {
                status: true,
                code: 201,
                data: add
            }

        } catch (error) {
            console.error('createTodo todo module Error:', error)

            return {
                status: false,
                error
            }
        }
    }

    listTodoUser = async (userId) => {
        try {
            const list = await prisma.todo.findMany({
                where: {
                    user_id: userId
                }
            })

            return {
                status: true,
                code: 200,
                data: list
            }
        } catch (error) {
            console.error('createTodo todo module Error:', error)

            return {
                status: false,
                error
            }
        }
    }

    filterlistTodoUser = async (userId) => {
        try {
            const list = await prisma.todo.findMany({
                where: {
                    user_id: userId
                }
            })

            return {
                status: true,
                code: 200,
                data: list
            }
        } catch (error) {
            console.error('createTodo todo module Error:', error)

            return {
                status: false,
                error
            }
        }
    }

    updateTodo = async (body, id) => {
        try {
            const schema = Joi.object({
                description: Joi.string().required(),
            }).options({ abortEarly: false })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const add = await prisma.todo.update({
                where: {
                    id
                },
                data: {
                    description: body.description
                }
            })

            return {
                status: true,
                code: 201,
                data: add
            }

        } catch (error) {
            console.error('createTodo todo module Error:', error)

            return {
                status: false,
                error
            }
        }
    }
    
    destroyTodo = async (id) => {
        try {
            const destroy = await prisma.todo.delete({
                where: {
                    id
                }
            })

            return {
                status: true,
                code: 200
            }
        } catch (error) {
            console.error('destroyTodo todo module Error:', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _todo()