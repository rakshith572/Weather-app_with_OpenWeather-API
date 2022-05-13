const expres=require('express');
const router=expres.Router();
const needle=require('needle');
const apicache = require('apicache')

const API_BASE_URL=process.env.API_BASE_URL
const API_KEY_NAME=process.env.API_KEY_NAME;
const API_KEY_VALUE=process.env.API_KEY_VALUE;


let cache = apicache.middleware
router.get('/:city',cache('1 minute'),async (req,res)=>{
    const {city}=req.params;
    const url=`${API_BASE_URL}?q=${city}&${API_KEY_NAME}=${API_KEY_VALUE}`;
    try{
        const apiRes=await needle('get',url);
        const data=apiRes.body;
        res.status(200).send(data);
    }catch(error){
        console.log(error);
        res.json({error});
    }
});


 module.exports=router;