import jwt from "jsonwebtoken"
const auth= async (req,res,next)=>{

      
  try {const token=req.headers.authorization.replace("Bearer ","");  
      // Verify the token
      const decoded = jwt.verify(token, "thisismysecret");
      // Attach the decoded user data to the request object
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Authentication failed' });
    }
}

export default auth;