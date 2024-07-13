import { Router } from "express";
import * as userController from './controller/user.controller.js'
import verfiyToken from "../../middelware/verfiyToken.js";
import userExist from "../../middelware/userEXsist.js";
import vaildateSchema from "../../middelware/vaildate.js";
import { updatePassword } from "../../auth/controller/userSchema.js";
const router=Router()
router.put('/change',verfiyToken,userController.updateAcc)
router.delete('/delete',verfiyToken,userController.deleteAcc)
router.get('/get',verfiyToken,userController.getAcc)
router.get('/accounts/:email',verfiyToken,userController.allAcountBYRecoveryEmail)
router.get('/:id',verfiyToken,userController.getAnthorAcc)
router.patch('/changePass',vaildateSchema(updatePassword),verfiyToken,userController.changePass)
router.post('/forgetPass',userController.forgetPass)

export default router  