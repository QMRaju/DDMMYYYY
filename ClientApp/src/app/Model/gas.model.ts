export interface ICountry {

    id: number;
    countryName: string;
    countryCode: string;
 

}
export interface IState {

    id: number;
    Name: string;
    countryID: string;
}
 
export interface ICity {
    iD : number; 
    Name : string;
    stateID : string; 
 }

 
export interface Idelear {
    recordId: number;
    countryName: string;
    stateName : string;
    cityName : string;
    delarName: string;
    enabled: number;
    createDate : Date;
 }

 export interface IConsumer {
    consumerID : number;
    consumerName: string;
    email: string;
    mobileNumber : number;
    location: string; 
    enabled : string ; 
    lastOrder: Date;
 }
 export interface IApply{
    _Title : string;
    _Name : string;
    _PhoneNo : number; 
    _AlternativePhoneNo: number;
    _Sex :  string;
    _DOB : Date;
    _Email : string;
    _Country : string;
    _State : string;
    _City : string;
    _Address : string;
    _PINCode : number;
    _LongStayYear : string;
    _LongStayMonth : string;
    _IsPermanent : number;
    _AdharNo : number;
    _Occupation: string;
    _EmployementNo : string;
    _Designation : string;
    _SalaryRange : string;
    _SavetoDraff : string;
    _CreateBy : string;
    
 }