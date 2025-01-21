import { Router } from "express";


const router = Router();


router.post("/api/save",(req,res) =>{
    res.send("post req");
});

export default router;

