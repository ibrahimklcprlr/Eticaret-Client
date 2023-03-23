import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService:UserService, spinner:NgxSpinnerService,private authservice:AuthService,
    private activatedroute:ActivatedRoute,private router:Router) {
    super(spinner);
   }

  ngOnInit(): void {
  }
 async login(UsernameOrEmail:string,Password:string){
      this.showSpinner(SpinnerType.squarejellybox)
    await this.userService.login(UsernameOrEmail,Password,()=>{
     this.authservice.identitiyCheck();
     this.activatedroute.queryParams.subscribe(params=>{
      const returnurl:string=params["returnUrl"];
      if(returnurl)
    this.router.navigate([returnurl])
     })
      this.hideSpinner(SpinnerType.squarejellybox);
    })
  }

}
