const express=require('express');
const router=express.Router();

const { AddNewCompanyDetails, GetAllWheelCompany ,GetCompanyDetailsById ,UpdateAllCompanyDetails,UpdatePartialCompanyDetails ,DeleteCompanyDetails,SearchCompanyByLetters,GetCompanyPagination,GetCodeByComapanyName,GetCompanyDetails} = require("./../controller/wheel_company_master_controller");

router.post("/wheel_company",AddNewCompanyDetails);

router.get("/wheel_company",GetCompanyDetails);

router.get('/wheel_company/code/:name',GetCodeByComapanyName);

router.get("/wheel_company",GetAllWheelCompany);

router.get("/wheel_company/:id", GetCompanyDetailsById);

router.put("/wheel_company/:id",UpdateAllCompanyDetails );

router.patch("/wheel_company/:id",UpdatePartialCompanyDetails );

router.delete("/wheel_company/:id", DeleteCompanyDetails);

router.get("/wheel_company/search/:name", SearchCompanyByLetters);

router.get("/wheel_company", GetCompanyPagination);


module.exports=router;