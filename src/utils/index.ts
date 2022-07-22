import jwt from "jsonwebtoken"


export const generateToken = (object : Object , options?: jwt.SignOptions | undefined) => {
   
    return jwt.sign(object, "dammy",{ expiresIn: '24h' })
  }
// export const generateToken = (object : Object , options?: jwt.SignOptions | undefined) => {
//     const key : any = process.env.JWT_PRIVATE_KEY.replace(/\\n/gm, '\n');
//     const privateKey = Buffer.from( key , "base64").toString("ascii");
//     console.log({privateKey})
//     return jwt.sign(object, privateKey, {...(options && options),algorithm  : "RS256", expiresIn : "48h"})
//   }

export const verifyJwt = <T> (token : string) : T  | null=> {
  try{
      const key :any = "dammy"
      const decoded = jwt.verify(token,key) as T;
      return decoded
  }catch(error){
    return null
  }
}
