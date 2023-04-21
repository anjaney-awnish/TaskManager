const express= require('express');
const bodyParser=require('body-parser');
const app=express();
const routes=express.Router();
const taskInfo=require('./src/routes/taskInfo')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(routes);

const port = 3000

routes.get('/',(req,res)=>{
    res.status(200).send("Welcome to Task Manager")
});

routes.use('/tasks',taskInfo);


app.listen(port,(error)=>{
    if(!error){
        console.log("Server is listening on port 3000")
        
    }
    else{
        console.log(error)
    }
});



