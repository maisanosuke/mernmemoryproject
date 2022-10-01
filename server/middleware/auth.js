import jwt from "jsonwebtoken";

//middleware to decode token and save userId if the client sent us valid token using jwt
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]//.replaceAll("^\"|\"$", "");//removing double quotes("") from token

  //token exits and if len<500 means its not token coming from google sign in but cutom token we created when user log in
  if (token) {
    if (token.length < 500) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decodedData) => {
        if (error) {
          console.log(error);
          return next(error);
        } else {
          req.userId = decodedData.id;
        }
      });
    }
    else {//token exists and len>500 means its token coming from google sign in so no need to verify against 'secret'
        const decodedData = jwt.decode(token);
        req.userId = decodedData.sub; //sub is for google id 
    }    
  }
  next();

};

export default auth;
