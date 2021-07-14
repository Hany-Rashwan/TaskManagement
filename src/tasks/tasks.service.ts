/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './Dto/create-task-dto';
import { GetTasksFilterDto } from './Dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
//import { TaskRepository } from './task.repository';


@Injectable()
export class TasksService {
  //--------------------------------------------------
  constructor( 
            @InjectRepository(TaskRepository)
            private taskRepository: TaskRepository 
  ) {}
//------------------------------------------------

  //-----------------Get Task By ID--------------------------------
  async getTaskById(id: number, user: User): Promise<Task> {
     return await this.taskRepository.getTaskById(id,user);
  }
//---------------Create Task-------------------------------------
  async createTask(createTaskDto:CreateTaskDto, user:User):Promise<Task>
  {  
       return this.taskRepository.createTask(createTaskDto,user);
  }
//--------------Delete Task---------------------------------------
async deleteTask(id:number,user:User) : Promise<void>
{
   return await this.taskRepository.deleteTask(id,user);
}
//---------------Update Task--------------------------------------
async updateTask(id:number,status:TaskStatus,user:User) : Promise<Task>
{
   return await this.taskRepository.updateTask(id,status,user);
}
//-----------------------------------------------------------------
async getTasks(filterDto:GetTasksFilterDto,user:User): Promise<Task[]>
{
 return this.taskRepository.getTasks(filterDto,user);
}







     /*   getAllTasks() 
    {
        return this.tasks;
    }

//-------------------------------------------------------------------------------------------------------------    
    getTaskById(id:string): Task
    {
         const Found = this.tasks.find( task => task.id === id);
        
         if(!Found)
         {
            throw new NotFoundException('Task With ID "${id}" Not Found');
         }

         return Found;       
    }
//--------------------------------------------------------------------------------------------------------------    
    createTask(createdto) : Task
     {
         const {title,describtion} = createdto;

         const task:Task=
         {
             id:v4(),
             title:title,
             describtion:describtion,
             status:TaskStatus.OPEN
         };   
          this.tasks.push(task); 
          return task;
     }
//---------------------------------------------------------------------------------------------------------------
     deleteTask(id:string) : void
     {
         const Found = this.getTaskById(id);
         this.tasks=this.tasks.filter( task => task.id != Found.id);
     }
//-----------------------------------------------------------------------------------------------------------------
     updateTask(id:string,status:TaskStatus) : Task
     {
        const task=this.getTaskById(id);
        task.status= status;
        return task;
     }
//-----------------------------------------------------------------------------------------------------------------
     getTasksWithFilters(filterDto:GetTasksFilterDto): Task[]
     {
        const {status,search}= filterDto;
        let tasks = this.getAllTasks();

        if(status)
        {
            tasks= tasks.filter( task => task.status === status )
        }

        if(search)
        {
            tasks= tasks.filter(tasks => tasks.title.includes(search) || tasks.describtion.includes(search));
        }

        return tasks;
     } */
}
