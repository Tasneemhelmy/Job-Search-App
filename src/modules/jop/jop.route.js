import { Router } from "express";
import * as jopController from './controller/jop.controller.js'
import vaildateSchema from "../../middelware/vaildate.js";
import jopSchema from "./controller/jopSchema.js";
import verfiyToken from "../../middelware/verfiyToken.js";
import { customVaildation, uploads } from "../../middelware/uploadeFile.js";

const router=Router()

router.post('/addJop',vaildateSchema(jopSchema),verfiyToken,jopController.addJop)
router.put('/:id',verfiyToken,jopController.updateJop)
router.delete('/:id',verfiyToken,jopController.deleteJop)
router.get('/jopsWithCompany',verfiyToken,jopController.companyWithJops)
router.get('/:name',verfiyToken,jopController.allJopsBySpecificCompany)
router.post('/filters',verfiyToken,jopController.filterJops)
router.post('/app/:id',uploads(customVaildation.bdf).single('bdfUri'),verfiyToken,jopController.applyJop)

export default router