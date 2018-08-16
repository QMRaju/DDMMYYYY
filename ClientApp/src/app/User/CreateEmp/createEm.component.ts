import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IEmployee } from '../../Model/employee.model';
import { EmployeeService } from '../../Service/empService';
import { AppComponent } from '../../app.component';


@Component({
    selector: 'create-Em', 
    templateUrl: './createEm.component.html',
    styleUrls: ['./createEm.component.css'],
    providers:[EmployeeService]


})


export class CreateEmComponent implements OnInit{

    employee: IEmployee[];
    errorMessage:any;
    codeVal: string;
    Code:string;

    ngOnInit(){}

    constructor(private _employeeService:EmployeeService, private _router:Router, private _appComponent:AppComponent)
    {


    }
    CreateEm(employeeForm: NgForm):void{
        this.codeVal= this.codeVal
       this._employeeService.CreateEm(employeeForm.value)
       .subscribe((data) => {
        this._router.navigate(['../home/updateEm']);
       },
       error => this.errorMessage = error); 
       

    }

}
