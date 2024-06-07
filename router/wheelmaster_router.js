const express=require('express');

const router=express.Router();

const {GetAllWheels ,GetWheelByCompanyName,GetWheelAllType,GetWheelById,AddNewWheel,UpdateWheelById,DeleteWheelById,SearchWheelTypeByLettes,GetAllWheelsPagination}=require('./../controller/wheelmaster_controller');


// router.get("/wheels",GetAllWheels);

router.get('/wheel/company',GetWheelByCompanyName);

router.get("/wheels/:id",GetWheelById);

router.post("/wheels",AddNewWheel);

router.get('/wheeltype/:table',GetWheelAllType);

// router.put('/wheels/:id',UpdateWheelById);

router.patch('/wheels/:id',UpdateWheelById);

router.delete('/wheels/:id',DeleteWheelById);

router.get('/wheels/search/:name',SearchWheelTypeByLettes);

router.get('/wheels',GetAllWheelsPagination)
module.exports=router;