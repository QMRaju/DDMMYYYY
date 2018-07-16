import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../Service/empService';
import {IEmployee} from '../../Model/employee.model';
import { Subscription } from 'rxjs/Subscription';
import {LoginService } from '../../Service/login.service';

import { NgForm } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { AppModule } from '../../app.module';
import { AppComponent } from '../../app.component';

import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { trigger } from '@angular/core/src/animation/dsl';





@Component({
selector: 'update-Em',
templateUrl:'./updateEm.component.html',
styleUrls: ['./updateEm.component.css'],
providers:[EmployeeService,LoginService]


})

export class UpdateEmComponent implements OnInit{
  employees: IEmployee[];
  editEmp:boolean=false;
  errorMessage: any; 
  updateForm;
  emList:boolean=true;
 
  Code:string="";
  Name:string="";
  Gender:string="";
  AnnualSalary:number=0;
  DateOfBirth:string="";
  

    constructor(private _employeeService: EmployeeService,private _loginService: LoginService,private _fb: FormBuilder,private _avRoute: ActivatedRoute, private _router:Router)
    {
        this.updateForm = this._fb.group({ 
             code:'',
             name: ['', [Validators.required]], 
             gender: ['', [Validators.required]], 
             annualSalary: ['', [Validators.required]], 
            dateOfBirth: ['', [Validators.required]] 
         })
           
    }
    // get code() { return this.updateForm.get('code'); } 
    // get name() { return this.updateForm.get('name'); } 
    // get gender() { return this.updateForm.get('gender'); } 
    // get annualSalary() { return this.updateForm.get('annualSalary'); } 
    // get dateOfBirth() { return this.updateForm.get('dateOfBirth'); } 
   
   
    ngOnInit(){
    
        this._loginService.getEmployees()
        .subscribe((employeeData) => this.employees= employeeData);
   }

   ResetEmployeeData()
   {

    this._loginService.getEmployees()
        .subscribe((employeeData) => this.employees= employeeData);
   }
   UpdateEm(updateEmpForm: NgForm):void
   {
          this._employeeService.UpdateEm(updateEmpForm.value)
          .subscribe((data) => {
            this.ResetEmployeeData();
            this.editEmp=false; 
            this.emList =true;
            this._router.navigate(['../home/updateEm']);
          },
          error => this.errorMessage = error);

   }
 UpdateEmForm=function(employee)  
 {  
   this.editEmp=true; 
   this.emList =false;
   if(employee!=null)  
   { 
    this.Code=employee.code;  
    this.Name=employee.name;  
    this.Gender=employee.gender;
    this.AnnualSalary=employee.annualSalary;  
    this.DateOfBirth=employee.dateOfBirth;  
    
   }  
   else{  
     
   }  
 }  
 
 //Delete Employee
 DeleteEmRecord(code)
 {
  this._employeeService.DeleteEm(code)
  .subscribe(response =>{
    this.ResetEmployeeData();
    this._router.navigate(['../home/updateEm']);
  });
   
 }
}

