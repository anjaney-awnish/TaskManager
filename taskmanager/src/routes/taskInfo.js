const express= require('express');
const bodyParser=require('body-parser');
const app=express();
const taskRoutes=express.Router();
const tasksData= require('../tasks.json');
const fs=require('fs')
const path=require('path')
const validator=require('../helpers/validator.js')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(taskRoutes);



taskRoutes.get('/',(req,res)=>{
    let tasks=tasksData.tasks;
    res.status(200).send(tasks);
}
);


taskRoutes.get('/:tasksId',(req,res)=>{
    let tasks=tasksData.tasks;
    let tasksId=req.params.tasksId;
    let result= tasks.filter(val=>val.id==tasksId);

    res.status(200).send(result);
}
);


taskRoutes.post('/',(req,res)=>{
    let write_path=path.join(__dirname,'..','tasks.json')
    const new_taskData=req.body;


    if(validator.validateNewTaskData(new_taskData,tasksData).status){
    let current_tasks=JSON.parse(JSON.stringify(tasksData))
   // console.log(new_task)
    current_tasks.tasks.push(new_taskData)
    //console.log(current_tasks)

    fs.writeFileSync(write_path, JSON.stringify(current_tasks), { encoding: 'utf8' , flag: 'w'});
    console.log(write_path)
    res.status(200).json(validator.validateNewTaskData(new_taskData,tasksData))
    }

    else{
        res.status(400)
        res.json(validator.validateNewTaskData(new_taskData,tasksData))
    }
}
);


taskRoutes.put('/:tasksId',(req,res)=>{

    
    let write_path=path.join(__dirname,'..','tasks.json')

    let tasksId=req.params.tasksId;
    let tasks=tasksData.tasks;
    updatedTask=req.body;

    let current_tasks=JSON.parse(JSON.stringify(tasksData))
    let updateIndex=current_tasks.tasks.findIndex(val=>val.id==tasksId)

    if(updateIndex!=-1){
        current_tasks.tasks[updateIndex]=updatedTask
        fs.writeFileSync(write_path, JSON.stringify(current_tasks), { encoding: 'utf8' , flag: 'w'});
        res.status(200).json({ success: true, message: 'Task updated' });
    }
    else{
        res.status(404).json({ success: true, message: 'Task not found! please enter correct ID' });
    }

    
})




taskRoutes.delete('/:tasksId',(req,res)=>{
    let write_path=path.join(__dirname,'..','tasks.json')
    let tasksId=req.params.tasksId;
    let tasks=tasksData.tasks;

    let current_tasks=JSON.parse(JSON.stringify(tasksData))
    let deleteIndex=current_tasks.tasks.findIndex(val=>val.id==tasksId)

    if(deleteIndex!=-1){
        current_tasks.tasks.splice(deleteIndex,1);
        fs.writeFileSync(write_path, JSON.stringify(current_tasks), { encoding: 'utf8' , flag: 'w'});
        res.status(200).json({ success: true, message: 'Task deleted' });
    }
    else{
        res.status(404).json({ success: true, message: 'Task not found! please enter correct ID' });
    }

    
})





module.exports=taskRoutes


