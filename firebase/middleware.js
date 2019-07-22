const jwt=require('jsonwebtoken')
const hiddendata=require('../secret')
const secret=hiddendata.secret;











  let verifyToken=(req, res, next)=> {
    let token = req.headers['x-access-token'] || req.headers['authorization']
    if(token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(500).send({ auth:false,message:"You do not have permission to execute task. Token authentication failed"})
        } else {
            req.user= decoded.user
            
        
          next();
        }
      });
     
    }else{
      return res.status(400).send( "Auth token is not provided. Please Login to continue task" );
    }
    
    
      

  }




  module.exports = {
    verifyToken,
  }




