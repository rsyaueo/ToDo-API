// module berisi fungsi-fungsi yang berkaitan dengan query ke database
const prisma = require('../helpers/database')
const bcrypt = require('bcrypt')
const Joi = require('joi')

class _user {
    listUser = async () => {
        try {
            const list = await prisma.user.findMany()

            return {
                status: true,
                code: 200,
                data: list
            }

        } catch (error) {
            console.error('listUser user module Error:', error)

            return {
                status: false,
                error
            }
        }
    }

    createUser = async (body) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required()
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
            const password = bcrypt.hashSync(body.password, 10)
            const add = await prisma.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password
                }
            })

            return {
                status: true,
                code: 201,
                data: add
            }

        } catch (error) {
            console.error('createUser user module Error:', error);
            return {
                status: false,
                error
            }
        }
    }

    updateUser = async (body, id) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required()
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

            const password = bcrypt.hashSync(body.password, 10)
            const update = await prisma.user.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    name: body.name,
                    email: body.email,
                    password
                }
            })

            return {
                status: true,
                code: 200,
                data: update
            }

        } catch (error) {
            console.error('updateUser user module Error:', error);
            return {
                status: false,
                error
            }
        }
    }

    destroyUser = async (id) => {
        try {
            const destroy = await prisma.user.delete({
                where: {
                    id: parseInt(id)
                }
            })

            return {
                status: true,
                code: 200
            }
        } catch (error) {
            console.error('destroyUser user module Error:', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _user()