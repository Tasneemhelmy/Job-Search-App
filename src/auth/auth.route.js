import { Router } from "express";
import * as authController from'./controller/auth.controller.js'
import userExist from "../middelware/userEXsist.js";
import vaildateSchema from "../middelware/vaildate.js";
import {signupSchema} from "./controller/userSchema.js";

const router=Router()
router.post('/signUp',vaildateSchema(signupSchema),userExist,authController.signUp)
router.post('/logIn',authController.logIn)
router.get('/confirm/:token',authController.confirmEmail)

export default router