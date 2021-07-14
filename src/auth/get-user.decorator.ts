import { ExecutionContext } from "@nestjs/common";
import { createParamDecorator, Req } from "@nestjs/common";
import { request } from "express";
import { User } from "./user.entity";
/* 
export const GetUser = createParamDecorator((data,req):User => {
  console.log(req);
  return req.user;
}) */

//  developed decorator takes rquest as a pramater and return user data 

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  })