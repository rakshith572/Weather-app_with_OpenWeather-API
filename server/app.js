require('dotenv').config();
const express=require('express');
const cors=require('cors');
const rateLimit = require('express-rate-limit')
const app=express();
app.use(express.json());

const port=5000;

app.use(express.static('../client'));

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 100,
})
app.use(limiter);
app.set('trust proxy', 1)

app.use('/api',require('./routes/index.js'));

app.listen(port,()=>{console.log(`server litening at ${port}`)});
