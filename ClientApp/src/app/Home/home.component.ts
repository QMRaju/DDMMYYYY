
import { Component, OnInit } from '@angular/core'

import { IEmployee } from '../Model/employee.model';
import {LoginService } from '../Service/login.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
    selector: 'user-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [LoginService]
})

export class HomeComponent implements OnInit{

    employees: IEmployee[];

    constructor(private _loginService: LoginService) {

    }

    ngOnInit() {
        this._loginService.getEmployees()
             .subscribe((employeeData) => this.employees = employeeData);
    }         


}