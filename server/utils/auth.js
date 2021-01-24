const jwt = require('jsonwebtoken');
const secret = 'vjwjyW8BY6KmJswLO441X5QX';
const expiration = '2h';
const { OAuth2Client } = require('google-auth-library');
const clientId = '900972042486-ho4224klutu5ot121jh6nao4d2tnfp8q.apps.googleusercontent.com';
const client = new OAuth2Client(clientId);


async function verify(tok) {
  const ticket = await client.verifyIdToken({
    idToken: tok,
    audience: clientId,
  });
  const payload = ticket.getPayload();
  return payload.email;
}
verify().catch(e => undefined);

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;


    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    if (!token) {
      return req;
    }

    try {

      req.user = verify(token);

    }
    catch {
      console.log('Invalid token');
    }

    return req;
  }


};