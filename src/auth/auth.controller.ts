import { Body, ValidationPipe } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from 'src/tasks/Dto/auth-credentials-dto';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('/auth')
export class AuthController {
    constructor( private authService: AuthService ) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto )
  {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) authCredentialsDto:AuthCredentialsDto ) : Promise<{accessToken:string}>
  {
    return this.authService.signIn(authCredentialsDto);
  }

/*   @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req)
  {
    console.log(req.user)
    return req.user;
  } */

  
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user:User)
  {
    //console.log(req.user)
    return user;
  }
}
