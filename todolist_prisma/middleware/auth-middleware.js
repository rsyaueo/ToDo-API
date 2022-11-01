const jwt = require('jsonwebtoken')
const prisma = require('../helpers/database')

// module.exports = () => {
//     return (req, res, next) => {

//         const token = req.headers['authorization']
//         if (!token) {
//             return res.status(401).send("Access denied")
//         }
//         const tokenBody = token.slice(7);
//         jwt.verify(tokenBody, 'jwt-secret-code', (error, decoded) => {
//             if (error) {
//                 console.error('JWT Error', error);
//                 return {
//                     status: false,
//                     code: 401,
//                     error: 'unathorized'
//                 }
//             }

//             req.user = prisma.user.findFirst({
//                 where: {
//                     id: decoded.id
//                 }
//             })

//             console.log(req.user);
//             next()
//         })

//     }
// }

auth = async (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).send("Access denied")
    }
    const tokenBody = token.slice(7);
    const decoded = jwt.verify(tokenBody, 'jwt-secret-code')
    req.user = await prisma.user.findFirst({
        where: {
            id: decoded.id
        }
    })

    next()
}

module.exports = auth
