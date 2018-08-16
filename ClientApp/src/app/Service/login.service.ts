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
import { AuthInterceptor } from '../auth/auth.interceptor';
import { ICountry, IState } from '../Model/gas.model';



@Injectable()

export class LoginService {
    readonly rootUrl = 'http://localhost:44968';
    user: Observable<IUser[]>;
    credential: Observable<ICredential[]>;
    changepassword: Observable<IChangePassword[]>;

    constructor(private _http: HttpClient) {

    }
    getEmployees(): any {


        //   var headers= "Authorization", 
        //   "Bearer " + localStorage.getItem('userToken')

        // return this._http.get("http://localhost:44968/api/delear/countrylist")
        // .map((response: Response) => <IEmployee[]>response.json())

    }
 

    getCountryListMtd(): any {
        return this._http.get("http://localhost:44968/api/delear/countrylist")
        //.map((response: Response) => <ICountry[]>response.json())
        // console.log("API fetch done for country ilist"); 
    }
    getStateListMtd(_CtyID: number): any {
        return this._http.get("http://localhost:44968/api/delear/statelist/?countryID=" + _CtyID)
        //.map((response: Response) => <IState[]>response.json())
        //  console.log("API fetch done for state ilist"); 
    }
    FindDraffStatus(UN : string){
        return this._http.get("http://localhost:44968/api/delear/DraffStatus/?emailDraff=" + UN)
    }
    getcityListMtd(_StID: number): any {
        return this._http.get("http://localhost:44968/api/delear/citylist/?stateID=" + _StID)
        //     //.map((response: Response) => <ICountry[]>response.json())
        // console.log("API fetch done for state ilist"); 
    }
    getdelearListData(contryID: number, SttID: number, cttIDe: number): any {
        return this._http
            .get("http://localhost:44968/api/delear/GetDelear/?cN=" + contryID + "&sN=" + SttID + "&ciN=" + cttIDe)

    }
    FetchConsumerDetailsMtd(dealerIds: number): any {

        return this._http.get("http://localhost:44968/api/delear/GetConsumer/?dealerID="+dealerIds)
    }
    FetchConsumerCountsMtd(deid : number): any {

        return this._http.get("http://localhost:44968/api/delear/ConsumerCount/?dealerID="+deid )
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

    changePasswordMtd(changepassword) {
        var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
        console.log('call to API ...')
        return this._http.post(ROOT_URL + '/Account/ChangePassword', changepassword)
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

}
