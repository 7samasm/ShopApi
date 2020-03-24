import { RequestHandler } from "express-serve-static-core";
import jwt  from 'jsonwebtoken'

export class Err extends Error {
  statusCode : number = 0
  data : any[] = []
  constructor(msg : string){
    super(msg)
  }
}

const isAuth : RequestHandler = (req, res , next) => {
  const authHeader = req.get('x-Auth');
  if (!authHeader) {
    const error = new Err('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'someSecret') as {[k : string] : any};
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken.hasOwnProperty('userId')) {
    const error = new Err('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  (req as any).userId = decodedToken.userId;
  next();
};

export default isAuth
