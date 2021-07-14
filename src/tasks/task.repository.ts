/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './Dto/create-task-dto';
import { GetTasksFilterDto } from './Dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>
{
  //====================Create=Task===============================
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise <Task> {
    const { title, describtion } = createTaskDto;
  
    const task = new Task();
  
           task.title=title;
           task.describtion=describtion;
           task.status=TaskStatus.OPEN;
           task.userId=user.id;
       await task.save(); 
         return task;
    }
//====================GET=Task=By=ID=============================
    async getTaskById(id:number,user:User): Promise<Task>
    {
         const Found = await this.findOne({where:{id, userId:user.id}});
        
         if(!Found)
         {
            throw new NotFoundException(`Task With ID:${id} ...Not Found`);
         }
   
         return Found;       
    }
//==================Delete=Task==================================
async deleteTask(id:number,user:User) : Promise<void>
{
    const Result = await this.delete({id,userId:user.id});

    if(Result.affected === 0) 
    {
        throw new NotFoundException(`Task With ID:${id} ...Not Found`);
    }
}
//===================Update=Task===============================
async updateTask(id:number,status:TaskStatus,user:User) : Promise<Task>
{
    const task=await this.getTaskById(id,user);
     task.status= status;
     await task.save();
   return task; 
}
//============Get All Tasks || Get Tasks With Filter===========
async getTasks(filterDto:GetTasksFilterDto,user:User): Promise<Task[]>
{
    const {status,search}= filterDto;
    const query = this.createQueryBuilder('task');     // create the query builder first to query task entity

    query.where('task.userId=:userId',{userId:user.id});

    if(status)
    {
      query.andWhere('task.status =: status',{status});
    }

    if(search)
    {
      query.andWhere(
        'task.title LIKE : search or task.describtion LIKE :search',
        { search: '%${search}%' },
      );
    }
    const tasks = query.getMany();
    return tasks;
  }
} 