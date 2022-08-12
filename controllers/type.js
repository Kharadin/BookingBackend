import Type from "../models/Type.js";
import Hotel from "../models/Hotel.js";
  
import { createError } from "../utils/error.js";

export const createType =async (req, res, next)=> {

    
     
     const newType = new Type(req.body);
     
     try{
          const savedType =await newType.save()
     
          res.status(200).json(savedType)
     }catch (err){
          next (err)
          
     }
     
}



export const getType = async (req, res, next) => {
     try{
          const type = await Type.findById(req.params.id
         );
          res.status(200).json(type);
     } catch(err) {
          next(err)
     }
}
export const getTypes = async (req, res, next) => {
     try{
          const types = await Type.find();
          res.status(200).json(types);
     } catch(err) {
          next(err)
     }
}

