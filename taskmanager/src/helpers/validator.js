class validator{
    static validateNewTaskData(new_taskData,tasksData){
        if(new_taskData.hasOwnProperty("id")&&
        new_taskData.hasOwnProperty("summary")&&
        new_taskData.hasOwnProperty("priority")&&
        new_taskData.hasOwnProperty("status")&&
        new_taskData.hasOwnProperty("creation_date")&&this.validateUniqueId(new_taskData,tasksData)){
            return{
                "status":true,
                "message":"Task has been added"
            };
        }
            if(!this.validateUniqueId(new_taskData,tasksData)){
                return{
                    "status":false,
                    "message":"id has to be unique"
                };
            }

            return{
                "status":false,
                "message":"task details are incomplete,please provide all properties"
            };

        }

        static validateUniqueId(new_taskData,tasksData){
            let existing_taskFound=tasksData.tasks.some(val=>val.id==new_taskData.id);
            if (existing_taskFound) return false;
            else return true;
        }
    }

module.exports=validator
