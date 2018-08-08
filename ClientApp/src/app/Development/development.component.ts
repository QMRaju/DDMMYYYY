import { Component, OnInit } from '@angular/core'
import { NgForm, FormGroup } from '@angular/forms';
import { BrowserModule, } from '@angular/platform-browser';
import { LoginService } from '../Service/login.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AppModule } from '../app.module';
import { HttpErrorResponse } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { ICountry, IState, ICity, Idelear, IConsumer } from '../Model/gas.model'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Message, SelectItem } from 'primeng/components/common/api';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'user-development',
    templateUrl: './development.component.html',
    styleUrls: ['./development.component.css'],
    providers: [LoginService]
})

export class DevelopmentComponent implements OnInit {
    errorMessage: any;
    country: ICountry[];
    state: IState[];
    city: ICity[];
    mydelear: Idelear[];
    myconsumer: IConsumer[];
    selectedcountry: Object = {};
    countrydefultselectedValue: number;
    PathName: string;
    vd: number; newVal: number; newValc: number;
    divShowFlag: boolean = false;
    clickedID: number;
    divConsumerSelectionFlag: boolean = false;
    divConsumerIdFlag: boolean = false;
    counsumerCount: number;
    dealerId: number;
    actionFlag: number;
    Gridall: boolean = false;
    new: boolean = false;
    rnd: boolean = false;
    UserNameByDefault: string;
    _draffConfirmationFlag: any;
    DraffStatus: number;
    insertform: FormGroup;
    msgs: Message[] = [];
    public globalResponse: any;
    public apiURL: string = "http://localhost:54964/api/Items";
    consumerProfileDetails: ConsumerProfile;

    constructor(private _loginService: LoginService, private httpClient: HttpClient, private _router: Router, private _appComponent: AppComponent) {
    }

    ngOnInit() {
        this.UserNameByDefault = "raju.kumar@iqor.com";
        this.rnd = false;
        this.new = false;
        this.Gridall = false;
        this.divShowFlag = false;
        this.countrydefultselectedValue = 40;
        this.divConsumerSelectionFlag = false;
        this.divConsumerIdFlag = false;
        this.checkDraffStatus();



        this._loginService.getCountryListMtd()
            .subscribe((countryListData) => this.country = countryListData);
    }

    OnInsert(value: string) {
        this.insertform.value;
        var title = this.insertform.controls['title'].value;
        var name = this.insertform.controls['name'].value;
        console.log(name); 
        var phone = this.insertform.controls['phone'].value;
        var alternativephone = this.insertform.controls['alterphone'].value;
        var sex = this.insertform.controls['sex'].value;
        var dob = this.insertform.controls['dob'].value;
        var email = this.insertform.controls['email'].value;
        var country = this.insertform.controls['country'].value;
        var state = this.insertform.controls['state'].value;
        var city = this.insertform.controls['city'].value;
        var address = this.insertform.controls['address'].value;
        var pin = this.insertform.controls['pin'].value;
        var hlyrsY = this.insertform.controls['hlyrsY'].value;
        var hlyrsM = this.insertform.controls['hlyrsM'].value;
        var IsPermanent = this.insertform.controls['yesparmament'].value;
        var aadharNo = this.insertform.controls['aadhar'].value;
        var occupation = this.insertform.controls['occupation'].value;
        var employmentNo = this.insertform.controls['employmentNo'].value;
        var designation = this.insertform.controls['designation'].value;
        var salary = this.insertform.controls['salary'].value;




        let item = new ConsumerProfile(0, title, name, phone, alternativephone, sex, dob, email, country, state, city,
            address, pin, hlyrsY, hlyrsM, IsPermanent, aadharNo, occupation, employmentNo, designation, salary, "Yes", UserNameByDefault);
        //this.submitted = true;
        this.msgs = [];
        this.httpClient.post(this.apiURL, item)
            .subscribe((result) => {
                this.globalResponse = result;
            },
                error => { //This is error part
                    console.log(error);
                    this.msgs.push({
                        severity: 'error', summary: 'An error occured during insert operation',
                        detail: error
                    });
                },
                () => {
                    // 'onCompleted' callback. This is Success part
                    if (this.globalResponse.Name == name) {
                        this.msgs.push({
                            severity: 'success', summary: 'Item Inserted successfuly',
                            detail: 'Form Submitted'
                        });
                        this.httpClient.get<ConsumerProfile>(this.apiURL)
                            .subscribe((data) => {
                                this.consumerProfileDetails = data;
                            })
                    }
                }
            )
    }


    checkDraffStatus() {
        this._loginService.FindDraffStatus(this.UserNameByDefault)
            .subscribe((DraffStatus) => this._draffConfirmationFlag = DraffStatus);
        console.log(this._draffConfirmationFlag);

    }
    countAction() {
        this.new = false;
        this.divConsumerIdFlag = true;
        this.Gridall = false;

        this.FetchConsumerDetails(this.dealerId);
    }
    IDaction() {
        this.divConsumerIdFlag = false;
        this.Gridall = false;
        console.log(this.Gridall);
        console.log(this.new);
        this.divConsumerIdFlag = true;
        console.log(this.divConsumerIdFlag);


    }
    Newaction() {
        this.divConsumerIdFlag = false;
        this.Gridall = false;
        this.new = true;
    }

    fetchdelearList(CN: number, ST: number, CY: number) {
        this._loginService.getdelearListData(CN, ST, CY)
            .subscribe((delearData) => this.mydelear = delearData);

    }
    updateCheckedOptions(option, event) {
        console.log('CheckedId: ' + event.target.value);
        this.divConsumerSelectionFlag = true;
        this.dealerId = event.target.value

        this.ConsumerCountOnly(this.dealerId);
    }

    ConsumerCountOnly(did: number) {
        this._loginService.FetchConsumerCountsMtd(did)
            .subscribe((consumereDataCount) => this.counsumerCount = consumereDataCount);
    }

    FetchConsumerDetails(did: number) {
        console.log("start");
        if (this.dealerId == null) {
            this.dealerId = 40801;
            console.log('null to 455215');
        }
        this._loginService.FetchConsumerDetailsMtd(this.dealerId) // need to change for consumer base
            .subscribe((consumereData) => this.myconsumer = consumereData);
    }
    public onChange2(event): void {  // event will give you full breif of action done
        this.vd = event.target.value;

        console.log(this.vd);
        this._loginService.getStateListMtd(this.vd)
            .subscribe((stateListData) => this.state = stateListData);
    }

    public onChange(event): void {  // event will give you full breif of action

        this.newVal = event.target.value;
        console.log(this.newVal);


        this._loginService.getcityListMtd(this.newVal)
            .subscribe((cityListData) => this.city = cityListData);
        this.PathName = this.vd + "/" + this.newVal + "/"
    }

    public onChangecity(event): void {  // event will give you full breif of action
        this.newValc = event.target.value;
        console.log(this.newValc);
        this.PathName = this.vd + "/" + this.newVal + "/" + this.newValc
        this.divShowFlag = true;
        this.fetchdelearList(this.vd, this.newVal, this.newValc);

    }


    OnSubmit(userName, password) {
        console.log('development TS ');

        //     this._loginService.login(userName,password).subscribe((data : any)=>{
        //     localStorage.setItem('userToken',data.access_token);
        //     console.log(localStorage.getItem('userToken'));


        //     this._router.navigate(['../home']); 

        //    },

        //    (err : HttpErrorResponse)=>{

        //    });
    }

}
class ConsumerProfile {
    public _Id: number;
    public _Title: string;
    public _Name: string;
    public _PhoneNo: number;
    public _AlternativePhoneNo: number;
    public _Sex: string;
    public _DOB: Date;
    public _Email: string;
    public _Country: string;
    public _State: string;
    public _City: string;
    public _Address: string;
    public _PINCode: number;
    public _LongStayYear: string;
    public _LongStayMonth: string;
    public _IsPermanent: number;
    public _AdharNo: number;
    public _Occupation: string;
    public _EmployementNo: string;
    public _Designation: string;
    public _SalaryRange: string;
    public _SavetoDraff: string;
    public _CreateBy: string;

    constructor(_Id: number, _Title: string, _Name: string, _PhoneNo: number, _AlternativePhoneNo: number, _Sex: string, _DOB: Date, _Email: string,
        _Country: string, _State: string, _City: string, _Address: string, _PINCode: number, _LongStayYear: string, _LongStayMonth: string, _IsPermanent: number,
        _AdharNo: number, _Occupation: string, _EmployementNo: string, _Designation: string, _SalaryRange: string, _SavetoDraff: string, _CreateBy: string) {
        this._Id = _Id;
        this._Title = _Title;
        this._Name = _Name;
        this._PhoneNo = _PhoneNo;
        this._AlternativePhoneNo = _AlternativePhoneNo;
        this._Sex = _Sex;
        this._DOB = _DOB;
        this._Email = _Email;
        this._Country = _Country;
        this._State = _State;
        this._City = _City;
        this._Address = _Address;
        this._PINCode = _PINCode;
        this._LongStayYear = _LongStayYear;
        this._LongStayMonth = _LongStayMonth;
        this._IsPermanent = _IsPermanent;
        this._AdharNo = _AdharNo;
        this._Occupation = _Occupation;
        this._EmployementNo = _EmployementNo;
        this._Designation = _Designation;
        this._SalaryRange = _SalaryRange;
        this._SavetoDraff = _SavetoDraff;
        this._CreateBy = _CreateBy;

    }
}
