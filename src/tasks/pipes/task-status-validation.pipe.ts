/* eslint-disable prettier/prettier */
import { BadRequestException, PipeTransform} from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';
 // custom validation class level validation (trnsforming input (letters to capital)
export class TaskStatusValidationPipe implements PipeTransform {
   
    readonly allowedStatuses =  [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE];
   
    transform(value:string)   // metadata:ArgumentMetadata
    {
       // console.log('value', value);
        //console.log('metadata', metadata);
        value=value.toUpperCase();

        if(!this.isStatusValid(value))
        {
            throw new BadRequestException(`"${value}" is Invalid Status`);
        }
        return value;
    }

    private isStatusValid(status:any): boolean
    {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1 ;  // conditional statments retruns true or false
    }
} 