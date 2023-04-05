import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { Token } from 'src/app/contracts/Token/token';
import { TokenResponse } from 'src/app/contracts/Token/TokenResponse';
import { CreateUser } from 'src/app/contracts/Users/creat_users';
import { User } from 'src/app/entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclientService:HttpClientService,
    private spinner:NgxSpinnerService,
    private toastservice:CustomToastrService
    ) { }

 async create(user:User):Promise<CreateUser>{
  this.spinner.show(SpinnerType.squarejellybox)
  const creatuser:Observable<CreateUser|User> =this.httpclientService.post<CreateUser|User>({
      controller:"Users",
    },user)
    return await firstValueFrom(creatuser) as CreateUser
    
  }
  async login(UsernameOrEmail:string,Password:string,CallBackFunction?:()=>void):Promise<void>{
 const result:Observable<any|TokenResponse> = this.httpclientService.post<any|TokenResponse>({
    controller:"Auth",
    action:"Login"

  },{UsernameOrEmail,Password})
  const tokenResponse:TokenResponse=await firstValueFrom(result)as TokenResponse;
  
if(tokenResponse){
  localStorage.setItem("accesstoken",tokenResponse.token.accessToken)
  localStorage.setItem("refreshToken",tokenResponse.token.refreshToken)
  this.toastservice.message("Kullanıcı Girişi Başarılı Bir Şekilde Gerçekleşti","Giriş Başarılı",{
    messageType:ToastrMessageType.Success,
    position:ToastrPosition.TopRight
  })
}
CallBackFunction();
  }

async refreshTokenLogin(refreshToken:string,CallBackFunction?: ()=>{}){
  const response:Observable<any|TokenResponse>=this.httpclientService.post({
    action:"RefreshTokenLogin",
    controller:"auth"
  },{refreshToken:refreshToken});
  const tokenResponse:TokenResponse=await firstValueFrom(response) as TokenResponse
  if(response){
    localStorage.setItem("accesstoken",tokenResponse.token.accessToken)
    localStorage.setItem("refreshToken",tokenResponse.token.refreshToken)
   
  }
}


  
}
