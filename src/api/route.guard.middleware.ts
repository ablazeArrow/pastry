import { Request, Response, NextFunction } from "express";
// import { ConsoleReporter } from "jasmine";
import { Jwt, JwtPayload, Secret, verify } from "jsonwebtoken";
import { SECRET as secret } from "../configs/config";

const routeGuard =async (req: Request, res: Response, next: NextFunction) => {    
  try {
    if(req.headers.authorization === undefined) throw new Error(`please login or register to continue`);
    verify(req.headers.authorization.split(' ')[1], secret as Secret)
    next();
    return
  }catch (error) {
    res.status(401).json(`please login or register to continue`);
    return;    
  }
}
      
   

export default routeGuard;
