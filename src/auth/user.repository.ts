/* eslint-disable prettier/prettier */
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { config } from "node:process";
import { AuthCredentialsDto } from "src/tasks/Dto/auth-credentials-dto";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>
{
    async signUp(authCredentialsDto:AuthCredentialsDto): Promise<void>
    {
        const {username,password} = authCredentialsDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password,user.salt);

        try
        {
         await user.save();
        }
        catch(error)
        {
            if (error.code ==='23505')     // 23505 error code for duplicated entries   "duplicated username"
            {
                throw new ConflictException ('Username already exists');
            }
            else
            {
                throw new InternalServerErrorException();
            }
        }    
    }

    
   async validateUserPassword(authCredentialsDto:AuthCredentialsDto): Promise<string>   // for sing-in
   {
       const {username,password}= authCredentialsDto;
       const user = await this.findOne({username});

        if(user && await user.validatePassword(password))
       {
           return user.username;
       }
       else
       {
         return null;
       } 
   }

   private async hashPassword(password:string, salt:string): Promise<string>   // for hasing the password to DB
   {
       return await bcrypt.hash(password,salt);
   }
}