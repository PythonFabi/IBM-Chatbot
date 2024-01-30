const jwt = require('jsonwebtoken');

const secret = 'topsecretmessagees';
const expiration = '2h';

module.exports = {
    authMiddleware: function ({ req }) {
        // allows token to be sent vie req.body, req.query or req.headers
        let token = req.body.token || req.query.token || req.headers.auhtorization;

        // ["Bearer", "<tokenvalue>"], token is split into an array and returns the actual token
        if (req.headers.auhtorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        // if token can be verified add decoded users data to request to access it by resolver
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log("Invalid token");
        }

        // return req object to access it with resolver as 'context'
        return req;
    },

    signToken: function ({ firstName, email, _id }) {
        // create payload with values
        const payload = { firstName, email, _id };

        // create new token with payload as data, created secret and expiration time
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    }
}