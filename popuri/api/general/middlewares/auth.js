const jwt = require('jsonwebtoken')
const GenResponse = require('../models/genresponse');
const Error = require('../models/error');
const User = require('../models/user');


module.exports = {
    authMiddleware: async (req, res, next) => {
        // read the token from header or url 
        const token = req.headers['x-auth-token']
        // console.log("TOKEN: " + token)
        // token does not exist
        if (!token) {
            return res.send(new GenResponse(new Error(403, 'auth failed'), null));
        }

        // create a promise that decodes the token
        const p = new Promise((resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if (err) reject(err)
                User.findById(decoded.userId).then(function (user) {
                    if (user)
                        resolve(decoded) 
                    else
                        reject(err)
                })
            })
        }
        )

        // if it has failed to verify, it will return an error message
        const onError = (error) => {
            res.send(new GenResponse(new Error(403, 'auth failed'), null));
        }

        // process the promise
        p.then((decoded) => {
            req.decoded = decoded
            // console.log(decoded);
            next()
        }).catch(onError)
    }
}