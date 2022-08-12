import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();


// router.get("/checkauthentication", verifyToken, (req, res, next)=>{
//      //after token is verified, 'next' is going to bring back the logic here, and run the function:
//      res.send("hello user, you are logged in")
// })
// router.get("/checkuser/:id", verifyUser, (req, res, next)=>{

//      res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{

//      res.send("hello admin, you are logged in and you can delete any account")
// })

//CREATE
//deleted. we already have in auth or smth

//UPDATE
router.put("/:id", verifyUser, updateUser)
//DELETE
router.delete("/:id", verifyUser, deleteUser)
//GET
router.get("/:id", verifyUser, getUser)
//GETALL
router.get("/", verifyAdmin, getUsers)

export default router;




