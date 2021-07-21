/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { Task } from "src/tasks/task.entity";
// DB configuration object
export const typeOrmConfig : TypeOrmModuleOptions =  
{
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'asd',
    database: 'TaskmanagementDB',
    entities: [Task,User],
    synchronize: true
};