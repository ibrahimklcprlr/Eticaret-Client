import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService,  ToastrMessageType,  ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authservice:AuthService,private toastrservice:CustomToastrService,private router:Router) {
authservice.identitiyCheck();
  }
  signOut(){
    localStorage.removeItem("accesstoken");
    this.authservice.identitiyCheck();
    this.router.navigate([""])
    this.toastrservice.message("Oturum sonlandırılmıştır","Oturum Kapatma",{
      messageType:ToastrMessageType.Warning,
      position:ToastrPosition.TopRight
    })
  }
}