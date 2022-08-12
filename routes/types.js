import express from "express"
import { createType, getType, getTypes} from "../controllers/type.js";

import { createError } from "../utils/error.js";
import { verifyAdmin} from "../utils/verifyToken.js";

const router = express.Router();


//CREATE
router.post("/", verifyAdmin, createType)

//UPDATE
 
//DELETE
 
//GET
router.get("/find/:id", getType)
//GETALL
router.get("/", getTypes)

export default router;
