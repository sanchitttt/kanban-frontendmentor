const { TOKEN_SECRET, jwt:jwtt } = require('../config/config');
const jwt = require('jsonwebtoken');


class TokenService {
    generateAuthToken(id) {
        const payload = { userId: id }
        const token = jwt.sign(payload, TOKEN_SECRET, { "expiresIn": (new Date(Date.now() + jwtt.expirationMilliseconds)).getTime() });
        return token;
    }
}


module.exports = TokenService;