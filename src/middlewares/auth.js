const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/sendError');

exports.authentication = (req, res, next) => {
  let token = req.headers[`authorization`];
  if(!token){
    return sendError(res, 'Token is required in headers');
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY , (error, decodedToken) => {
    if(error){
      const msg = error.message == 'jwt expired' ? 'Session expired' : 'token is invalid';
      return sendError(res, msg);
    }

  req.adminId = decodedToken.adminId;
  next();
  });
}