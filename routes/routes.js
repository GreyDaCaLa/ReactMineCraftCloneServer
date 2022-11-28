import express from "express";
import path from "path";

const router = express.Router();


router.get('/', (req,res)=>{
    res.send('server is up and running=====by--YA BOI')
})


router.get("*", async (req,res,next)=>{
    let location=process.env.PWD;
    try{
        res.status(404).sendFile(path.join(location,"/public/404page.html"));
    } catch (error) {
        next(error);
    }
});

export default router;