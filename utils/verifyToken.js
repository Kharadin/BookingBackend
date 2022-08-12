import  jwt  from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) =>{
     const token = req.cookies.access_token;
     if(!token) {
          return next(createError(401, "You are not authenticated"))
     }
     jwt.verify(token, process.env.JWT, (err, user)=>{
          if(err) return next(createError(403, "Token not valid"));
          //if token is verified,
          // we are going to set
          // a new request property
          // .user - or can be anything...
          req.user = user;
          next() 
     })
}

export const  verifyUser = (req, res, next)=>{
     verifyToken(req, res, next, ()=>{
          //there's no next, otherwise its gonna go the users again- the routes in users file.
          //UPDATE. the above cancelled.next is required.
        if (req.user.id  === req.params.id || req.user.isAdmin) {
          next()
          //it means we are the owner
        } else {
          
          return next(createError(403, "You are not authorised"));
        }
     })
}

export const  verifyAdmin = (req, res, next)=>{
     verifyToken(req, res, next, ()=> {
        // next should be here ok.
        if (
          req.user.isAdmin) {
          next()
          //it means we are an admin
        } else {
          
          return next(createError(403, "You are not admin"));
        }
     })
}