import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders ,HttpResponse} from '@angular/common/http';
import { error } from 'util';
import {ROOT_URL} from '../Model/config';
import 'rxjs/add/operator/map';
import {IEmployee} from '../Model/employee.model';
import { Http, Response } from '@angular/http';

@Injectable()

export class EmployeeService{

    readonly RootURLEM='http://localhost:44968/api/'
    employee: Observable<IEmployee[]>;
    code:string='';


    constructor( private _http:HttpClient)
    {}

    CreateEm(employee)
        {
           return this._http.post('http://localhost:44968/api/Employees/Create',employee); 
        }
    
        UpdateEm(employee)
        {
           return this._http.put('http://localhost:44968/api/Employees/Update',employee); 
        }


        DeleteEm(code:string)
        {
           return this._http.delete('http://localhost:44968/api/Employees/Delete/?codeParam='+code); 
        }
        

}