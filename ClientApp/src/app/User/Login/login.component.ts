import { Component, OnInit } from '@angular/core'

import { NgForm } from '@angular/forms';
import { IUser } from '../../Model/user.model';
import { LoginService } from '../../Service/login.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AppModule } from '../../app.module';
import { AppComponent } from '../../app.component';
import {ICredential} from '../../Model/credential.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'user-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers:[LoginService]
})

export class LoginComponent implements OnInit{

    credential:ICredential[];
    errorMessage: any; 
    isLoginError : boolean = false;
  
    constructor(private _loginService:LoginService, private _router: Router ,private _appComponent: AppComponent) {
     }
    
    ngOnInit() {
    
    }
    OnSubmit(userName,password){
        console.log('start login');
        
        this._loginService.login(userName,password).subscribe((data : any)=>{
      //  localStorage.setItem('userToken',data.access_token);
        //console.log(localStorage.getItem('userToken'));
        this._appComponent.showHideHome=true;
        this._appComponent.showHideLogin=false; 
        this._router.navigate(['../home']); 
          
       },
       
       (err : HttpErrorResponse)=>{
         this.isLoginError = true;
       });
     }

}