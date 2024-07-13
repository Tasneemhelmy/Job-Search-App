import { Router } from "express";
import * as companyController from './controller/company.controller.js'
import verfiyToken from "../../middelware/verfiyToken.js";
import vaildateSchema from "../../middelware/vaildate.js";
import companySchema from "./controller/companySchema.js";
const router=Router()
router.post('/addCompany',vaildateSchema(companySchema),verfiyToken,companyController.addCompany)
router.put('/update',verfiyToken,companyController.updateCompany)
router.delete('/delete',verfiyToken,companyController.deleteCompany)
router.get('/:name',verfiyToken,companyController.getCompanyByName)
router.get('/companyJops/:id',verfiyToken,companyController.companyData)
router.get('/app/:id',verfiyToken,companyController.allAppSpecificJop)
export default router