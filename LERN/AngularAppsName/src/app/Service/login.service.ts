import { Injectable} from '@angular/core'; 
import {  IUser} from '../Model/user.model';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'; 

import {HttpClient, HttpHeaders}  from '@angular/common/http';
import {ROOT_URL} from '../Model/config'

import { ICredential } from '../Model/credential.model';
import{Http, Response} from '@angular/http';

import { error } from 'util';
import { observable } from '../../../node_modules/rxjs';



@Injectable()

export class LoginServiceClassToWebAPI {

    readonly BaseUrl = ""; 
    user : Observable<IUser[]>; 
    credential : Observable<ICredential[]>; 

    constructor (private _Http : HttpClient){
    }

    RegisterUser(user){
        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
        return this._Http.post(ROOT_URL +  '/Account/Register', user); 
    }
    errorHandler(error: Response){
        console.log(error);
        return Observable.throw(error);
    }

    
}














@Injectable()

export class LoginService {
    readonly rootUrl = 'http://localhost:44968';
    user: Observable<IUser[]>;
    credential: Observable<ICredential[]>;

    constructor(private _http: HttpClient) {

    }
    getEmployees(): any {

        return this._http.get("http://localhost:44968/api/Employees")
        //.map((response: Response) => <IEmployee[]>response.json())
    }

    login(userName, password) {
        var data = "username=" + userName + "&password=" + password + "&grant_type=password";
        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
        return this._http.post(this.rootUrl + '/token', data);
    }


    registerUser(user) {
        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
        return this._http.post(ROOT_URL + '/Account/Register', user)
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

}


 

