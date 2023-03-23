import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateUser } from 'src/app/contracts/Users/creat_users';
import { User } from 'src/app/entities/user';
import { MessageType } from 'src/app/services/admin/alertify.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor(private formbuilder:UntypedFormBuilder, private userService:UserService,
    private toastService:CustomToastrService,spinner:NgxSpinnerService) {
      super(spinner)
     }

  frm:UntypedFormGroup;
  ngOnInit(): void {
    this.frm=this.formbuilder.group({
      nameSurname:["",[Validators.required,Validators.maxLength(50),Validators.minLength(3)]],
      username:["",[Validators.required,Validators.maxLength(250)]],
      email:["",[Validators.required,Validators.email]],
      password:["",Validators.required],
      passwordConfirm:["",Validators.required],
    },{
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("passwordConfirm").value;
        return sifre === sifreTekrar ? null : { notSame: true };
      }
    })
  }
  get component(){
    return this.frm.controls;
  }
  submitted:boolean=false;
  async onSubmit(user:User){
    this.submitted=true;
    if(this.frm.invalid)
      return;
   const result:CreateUser=await this.userService.create(user)
   this.hideSpinner(SpinnerType.squarejellybox)
   if(result.success)
    this.toastService.message(result.message,"İşlem Başarılı", {
      position:ToastrPosition.TopLeft,
      messageType:ToastrMessageType.Success
    })
    else
    this.toastService.message(result.message,"Hata", {
      position:ToastrPosition.TopLeft,
      messageType:ToastrMessageType.Error
    })
  }
  }


  
