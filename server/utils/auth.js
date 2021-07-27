const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (!token) {
      return req;
    }

    // Splits the token string into an array and returns actual token
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // If token can be verified, adds the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    // Returns the request object so it can be passed to the resolver as context
    return req;
  },
  
  signToken: function ({ name, _id }) {
    const payload = { name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};