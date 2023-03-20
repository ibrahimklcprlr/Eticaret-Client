import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService:UserService, spinner:NgxSpinnerService) {
    super(spinner);
   }

  ngOnInit(): void {
  }
 async login(UsernameOrEmail:string,Password:string){
      this.showSpinner(SpinnerType.squarejellybox)
    await this.userService.login(UsernameOrEmail,Password,()=>this.hideSpinner(SpinnerType.squarejellybox))
  }

}
