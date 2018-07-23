import { Injectable } from '@angular/core';
import { IUser } from '../Model/user.model';
import { IChangePassword } from '../Model/changepassword.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { error } from 'util';
import { ROOT_URL } from '../Model/config';
import 'rxjs/add/operator/map';
import { ICredential } from '../Model/credential.model';
import { IEmployee } from '../Model/employee.model';
import { Http, Response } from '@angular/http';
import {AuthInterceptor} from '../auth/auth.interceptor';



@Injectable()

export class LoginService {
    readonly rootUrl = 'http://localhost:44968';
    user: Observable<IUser[]>;
    credential: Observable<ICredential[]>;
    changepassword : Observable<IChangePassword[]>;

    constructor(private _http: HttpClient , private _auth: AuthInterceptor) {

    }
    getEmployees(): any {

        
    //   var headers= "Authorization", 
    //   "Bearer " + localStorage.getItem('userToken')
      console.log(this._auth.tokenVal);
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
        console.log('call to API ...')
        return this._http.post(ROOT_URL + '/Account/Register', user)
    }

    changePasswordMtd(changepassword){
        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
        console.log('call to API ...')
        return this._http.post(ROOT_URL + '/Account/ChangePassword', changepassword)
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

}
