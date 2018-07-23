import { Component, OnInit, Input } from '@angular/core'

import { NgForm } from '@angular/forms';
import { IUser } from '../../Model/user.model';
import { LoginService } from '../../Service/login.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AppModule } from '../../app.module';
import { AppComponent } from '../../app.component';
import { ICredential } from '../../Model/credential.model';
import { Message } from '../../../../node_modules/@angular/compiler/src/i18n/i18n_ast';
import { error } from '../../../../node_modules/protractor';


@Component({

    selector: 'user-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
    providers: [LoginService]
})

export class RegistrationComponent implements OnInit {

    user: IUser[];
    errorMessage: any;

    sucessMessage : string = ""; 
    @Input() sucessMessage1;

    constructor(private _loginService: LoginService, private _router: Router,
         private _appComponent: AppComponent) {
    }
    ngOnInit() {
    }
    Close(){

        this._router.navigate(['../app']);
    }
    Register(userForm: NgForm): void {
      //  this._loginService.registerUser(userForm.value)
         //   .subscribe((data) => {
                this._appComponent.showHideDialog = true;
                this._appComponent.showHideLogin = false;
                // message 
               
              //  this._router.navigate(['../login']); 
            //}, error => this.errorMessage = error);

    }
}
