import { Component, OnInit } from '@angular/core'

import { NgForm } from '@angular/forms';

import { LoginService } from '../../Service/login.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AppModule } from '../../app.module';
import { AppComponent } from '../../app.component';
import { ICredential } from '../../Model/credential.model';
import { IChangePassword } from '../../Model/changepassword.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'user-changepassword',             // Manish
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.css'],
    providers: [LoginService]
})

export class ChangePasswordComponent implements OnInit {

    changepassword: IChangePassword[];
    errorMessage: any;
    changepasswordError: boolean = false;

    constructor(private _loginService: LoginService,
        private _router: Router,
        private _appComponent: AppComponent) {
    }

    ngOnInit() {

    } 
    ChangePassword(userForm: NgForm): void {
        
        this._loginService.changePasswordMtd(userForm.value)
            .subscribe((data) => {
                this._appComponent.showHideHome = true;
                this._appComponent.showHideLogin = false;
                // this._router.navigate(['../home']);
                console.log('Password change sucessfully.');


            }, error => this.errorMessage = error);

    }

}