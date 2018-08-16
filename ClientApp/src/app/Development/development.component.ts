import { Component, OnInit } from '@angular/core'
import { NgForm, FormGroup } from '@angular/forms';
import { BrowserModule, } from '@angular/platform-browser';
import { LoginService } from '../Service/login.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AppModule } from '../app.module';
import { HttpErrorResponse } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { ICountry, IState, ICity, Idelear, IConsumer, MyTitle } from '../Model/gas.model'
import { FormsModule,FormControlName, FormBuilder, ReactiveFormsModule } from '@angular/forms';
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
 //   UserNameByDefault: string;
    _draffConfirmationFlag: any;
    DraffStatus: number;
    insertform: FormGroup;
    msgs: Message[] = [];
    public globalResponse: any;
    public apiURL: string = "http://localhost:44968/api/delear/SaveConsumerProfile";
    consumerProfileDetails: ConsumerProfile;

    name: string;
    phone : number; 
    alterphonr: number;
    dob : Date;
    email : string
    address : string;
    pincode : number;
    aadhar: number;
    eno : string;
    private date; 

    public titlelist: MyTitle[] = [
        { "id": 1, "Title": "Mr." },
        { "id": 2, "Title": "Miss" },
        { "id": 3, "Title": "Sriman" }, 
        { "id": 4, "Title": "Srimati" }
      ];
      public sexList : Sex[] = [
        { "id": 1, "Sex": "Male." },
        { "id": 2, "Sex": "Female" },
        
      ];
      public Howlongyearlist : HowLongYear[] = [
        { "id": 1, "Year": "1 year" },
        { "id": 2, "Year": "2 years" },
        { "id": 3, "Year": "3 years" },
        { "id": 4, "Year": "4 years" },
        { "id": 5, "Year": "5 years" },
        { "id": 6, "Year": "6 years" },
        { "id": 7, "Year": "7 years" },
        { "id": 8, "Year": "8 years" },
        { "id": 9, "Year": "9 years" },
        { "id": 10, "Year": "10 years" },
        { "id": 11, "Year": "11 years" },
        { "id": 12, "Year": "12 years" }

      ];
      public howlongmonthlist : HowLongMonth[] = [
        { "id": 1, "Month": "1 year" },
        { "id": 2, "Month": "2 months" },
        { "id": 3, "Month": "3 months" },
        { "id": 4, "Month": "4 months" },
        { "id": 5, "Month": "5 months" },
        { "id": 6, "Month": "6 months" },
        { "id": 7, "Month": "7 months" },
        { "id": 8, "Month": "8 months" },
        { "id": 9, "Month": "9 months" },
        { "id": 10, "Month": "10 months" },
        { "id": 11, "Month": "11 months" },
        { "id": 12, "Month": "12 months" }

      ];
      public Occupationlist: Occupation[] = [
        { "id": 1, "Occupation": "Self." },
        { "id": 2, "Occupation": "Goverment Services" },
        { "id": 3, "Occupation": "Business" }, 
        { "id": 4, "Occupation": "Private" }
      ];
      public DesignationList: Designation[] = [
        { "id": 1, "Designation": "AVP" },
        { "id": 2, "Designation": "Doctor" },
        { "id": 3, "Designation": "Accountant" }, 
        { "id": 4, "Designation": "Software Engineer" }
      ];
      public SalaryLiat: Salary[] = [
        { "id": 1, "SalaryRange": "< 2 LPA" },
        { "id": 2, "SalaryRange": "< 5 LPA" },
        { "id": 3, "SalaryRange": "< 10 LPA" }, 
        { "id": 4, "SalaryRange": "> 10 LPA" }
      ];

    constructor(private _loginService: LoginService, private httpClient: HttpClient, private _router: Router, private _appComponent: AppComponent) {
    }

    ngOnInit() {
       // this.UserNameByDefault = "raju.kumar@iqor.com";
        this.rnd = false;
        this.new = false;
        this.Gridall = false;
        this.divShowFlag = false;
        this.countrydefultselectedValue = 40;
        this.divConsumerSelectionFlag = false;
        this.divConsumerIdFlag = false;
      //  this.checkDraffStatus();



        this._loginService.getCountryListMtd()
            .subscribe((countryListData) => this.country = countryListData);
    }

    Test(){ 
         this.date = new Date()
 
        let item = new ConsumerProfile(0, "Mr.", this.name, this.phone, this.alterphonr, "Male", this.dob, this.email, "India", "Noida", "Ghaziabad",
        this.address, this.pincode ,  "2 years", "2 months", 1, this.aadhar, "Private", this.eno, "Software Engineer",  "< 2 LPA", "Yes", 
        this.date ,  "Raju", 1);
        //this.submitted = true;
        this.msgs = [];
        console.log("Variable papulatetion compleate " + item.Name);
        console.log(item); 
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
   // OnInsert(value: string) {

    OnInsert(devForm:NgForm) {

       
    }


    // checkDraffStatus() {
    //     this._loginService.FindDraffStatus(this.UserNameByDefault)
    //         .subscribe((DraffStatus) => this._draffConfirmationFlag = DraffStatus);
    //     console.log(this._draffConfirmationFlag);

    // }
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
    public Id: number;
    public Title: string;
    public Name: string;
    public PhoneNo: number;
    public AlternativePhoneNo: number;
    public Sex: string;
    public DOB: Date;
    public Email: string;
    public Country: string;
    public State: string;
    public City: string;
    public Address: string;
    public PINCode: number;
    public LongStayYear: string;
    public LongStayMonth: string;
    public IsPermanent: number;
    public AdharNo: number;
    public Occupation: string;
    public EmployementNo: string;
    public Designation: string;
    public SalaryRange: string;
    public SavetoDraff: string;
    public CreateDate : Date;
    public CreateBy: string;
    public Enabled :number

    constructor(_Id: number, _Title: string, _Name: string, _PhoneNo: number, _AlternativePhoneNo: number, _Sex: string, _DOB: Date, _Email: string,
        _Country: string, _State: string, _City: string, _Address: string, _PINCode: number, _LongStayYear: string, _LongStayMonth: string, _IsPermanent: number,
        _AdharNo: number, _Occupation: string, _EmployementNo: string, _Designation: string, _SalaryRange: string, _SavetoDraff: string, 
       _CreateDate: Date,  _CreateBy: string, Enabled : number) {
        this.Id = _Id;
        this.Title = _Title;
        this.Name = _Name;
        this.PhoneNo = _PhoneNo;
        this.AlternativePhoneNo = _AlternativePhoneNo;
        this.Sex = _Sex;
        this.DOB = _DOB;
        this.Email = _Email;
        this.Country = _Country;
        this.State = _State;
        this.City = _City;
        this.Address = _Address;
        this.PINCode = _PINCode;
        this.LongStayYear = _LongStayYear;
        this.LongStayMonth = _LongStayMonth;
        this.IsPermanent = _IsPermanent;
        this.AdharNo = _AdharNo;
        this.Occupation = _Occupation;
        this.EmployementNo = _EmployementNo;
        this.Designation = _Designation;
        this.SalaryRange = _SalaryRange;
        this.SavetoDraff = _SavetoDraff;
        this.CreateBy = _CreateBy;

    }
}

export class Sex {
    id: number;
    Sex: string;

   
}
 
export class HowLongYear{
    id:number; 
    Year: string;
}
export class HowLongMonth{
    id:number; 
    Month: string;
}
export class Occupation{
    id:number; 
    Occupation: string;
}

export class Designation{
    id:number; 
    Designation: string;
}
export class Salary{
    id:number; 
    SalaryRange: string;
}
