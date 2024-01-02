import express from 'express';
import auth from './routes/auth.js' 
import list from './routes/list.js'
import bodyparser from 'body-parser'

import cors from 'cors'
const server=express();

server.use(cors());
server.use(bodyparser.json());
// server.use(express.json());

server.use('/api/v1', auth);
server.use('/api/v2', list);
server.listen(4000,()=>{
    console.log("Listening at 4000");
})