/* eslint-disable prettier/prettier */
import {
  Body,
  Post,
  Get,
  Controller,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './Dto/create-task-dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './Dto/get-tasks-filter.dto';  //filtering object
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  //----------------------------Constructor------------------------------
  constructor(private readonly tasksService: TasksService) {}
  //---------------------------------------------------------------------

//---------------------------Create-Task---------------------------------------------------
@Post()
@UsePipes(ValidationPipe)
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto, user);
  }
  //------------------------Get-Task-By-ID---------------------------------------------------
@Get('/:id')
  async getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.getTaskById(id, user);
    }
//----------------------Delete-Task-----------------------------------------------------

@Delete('/:id')
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    await this.tasksService.deleteTask(id, user);
  }
  //---------------------Update-Task----------------------------------------------------

@Patch('/:id/status')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.updateTask(id, status, user);
  }
  //--------------Get All Tasks || Get All Tasks With Filter------------------------------------
@Get()
  async getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }
  //===============================================================================================================================
/* @Get()
    async getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto) : Promise<Task[]>
        {
            if ( Object.keys(filterDto).length)
            {
                return await this.tasksService.getTasksWithFilters(filterDto);
            }
            else
            {
                return await this.tasksService.getAllTasks();
            }                      
        }
//------------------------------------------------------------------------------  
@Get('/:id')
    async getTaskById(@Param('id') id:string): Promise<Task>
        {
            return await this.tasksService.createTask(id);

        }
//------------------------------------------------------------------------------
@Post()
@UsePipes(ValidationPipe)
    async createTask( @Body() createdto:CreateTaskDto):Promise<Task>
        {
            return await this.tasksService.createTask(createdto);
        }
//------------------------------------------------------------------------------   
@Delete('/:id')
    async deleteTask( @Param('id') id:string):Promise<void>
        {
           await this.tasksService.deleteTask(id);

        }
//------------------------------------------------------------------------------        
@Patch('/:id/status')
    async updateTask( @Param('id') id:string,@Body('status',TaskStatusValidationPipe) status:TaskStatus):Promise<Task>
        {
           return await this.tasksService.updateTask(id,status);

        }
 */
}
