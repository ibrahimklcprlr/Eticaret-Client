import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { UserService } from './common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor{

  constructor(private toastrservice:CustomToastrService,private userService:UserService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   return next.handle(req).pipe(catchError(error=>{
    switch(error.status){
      case HttpStatusCode.Unauthorized:
      this.toastrservice.message("Bu işlem İçin Yetkiniz yok","Yetkisiz işlem",{
        messageType:ToastrMessageType.Warning,
        position:ToastrPosition.BottomRight
      })
      this.userService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data=>{})
      break;
      case HttpStatusCode.InternalServerError:
        this.toastrservice.message("Sunucuya Erişilmiyor","Sunucu Hatası",{
          messageType:ToastrMessageType.Warning,
          position:ToastrPosition.BottomRight
        })
      break;
      case HttpStatusCode.NotFound:
        this.toastrservice.message("Sayfa bulunamadı","Sayfa bulunamadı",{
          messageType:ToastrMessageType.Warning,
          position:ToastrPosition.BottomRight
        })
      break;
      case HttpStatusCode.BadRequest:
        this.toastrservice.message("Başarısız İstek Yaptınız","Başarısız istek",{
          messageType:ToastrMessageType.Warning,
          position:ToastrPosition.BottomRight
        })
      break;
      default:
        this.toastrservice.message("Beklenmedik Bir Hata ile Karşılaşıldı","Beklenmedik Hata",{
          messageType:ToastrMessageType.Warning,
          position:ToastrPosition.BottomRight
        })
      break;
    }
    return of(error);
   }))
  }
}
