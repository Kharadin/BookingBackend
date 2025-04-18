import User from "../models/User.js"


export const updateUser = async (req, res, next) => {
     try{
          const updatedUser = await User.findByIdAndUpdate(req.params.id,
          {$set: req.body},
          {new: true}
          )
          // $set is mongo method...
          //findByIdAndUpdate - returns the previous document, not the updated one...by default. .. without option {new: true}

          res.status(200).json(updatedUser) 
     }catch(err) {
         next(err)
     }
}


export const getUser = async (req, res, next) => {
     try{
          const user = await User.findById(req.params.id
         );
          res.status(200).json(user);
     } catch(err) {
          next(err)
     }
}
export const getUsers = async (req, res, next) => {
     try{
          const users = await User.find();
          res.status(200).json(users);
     } catch(err) {
          next(err)
     }
}


export const deleteUser = async (req, res, next) => {
     try{
          const updatedUser = await User.findByIdAndDelete(req.params.id 
               );
               res.status(200).json("User deleted") 
     }catch(err) {
          next(err);
     }
}
