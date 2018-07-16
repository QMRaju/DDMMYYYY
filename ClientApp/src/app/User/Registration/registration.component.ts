import { Component, OnInit } from '@angular/core'

import { NgForm } from '@angular/forms';
import { IUser } from '../../Model/user.model';
import { LoginService } from '../../Service/login.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AppModule } from '../../app.module';
import { AppComponent } from '../../app.component';
import { ICredential } from '../../Model/credential.model';


@Component({

    selector: 'user-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
    providers: [LoginService]
})

export class RegistrationComponent implements OnInit {

    user: IUser[];
    errorMessage: any;

    constructor(private _loginService: LoginService, private _router: Router, private _appComponent: AppComponent) {
    }
    ngOnInit() {
    }
    Register(userForm: NgForm): void {

        this._loginService.registerUser(userForm.value)
            .subscribe((data) => {
                this._appComponent.showHideHome = true;
                this._appComponent.showHideLogin = false;
                this._router.navigate(['../home']);


            }, error => this.errorMessage = error);

    }
}
