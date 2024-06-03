const express=require('express');
const router=express.Router();

const {GetAllWheelTypes,AddNewWheelType,UpdateWheelTypeById,DeleteWheelTypeById,GetWheelTypeById,SearchWheelTypeByLetters,GetAllWheelTypesPagination,GetAllWheelSize}=require('./../controller/wheel_type_controller');


// router.get("/wheel_types",GetAllWheelTypes);
router.post("/wheel_type",AddNewWheelType);

router.get('/wheelsize',GetAllWheelSize);

router.get("/wheel_type/:id",GetWheelTypeById);

router.patch('/wheel_type/:id',UpdateWheelTypeById);

router.delete('/wheel_type/:id',DeleteWheelTypeById);

router.get('/wheel_type/search/:name',SearchWheelTypeByLetters);

router.get('/wheel_types',GetAllWheelTypesPagination);

module.exports=router;
