import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == undefined) {
    return res.sendStatus(401);
}
try {
  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
} catch (err) {
  console.log('token verification failed:', err);
  res.status(403).send({message: 'invalid token'});
}
};

export {authenticateToken};
