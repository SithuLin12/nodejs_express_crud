import express  from "express";
import { create, destory, edit, index, store, upload } from "./controller/page";

const router = express.Router();


router.get('/',index);

router.get('/create',create);

router.post('/store',store);

router.get('/edit/:id',edit);

router.post('/upload/:id',upload)

router.get('/delete/:id',destory)


export default router