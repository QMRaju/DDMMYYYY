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
    iD: number;
    Name: string;
    stateID: string;
}


export interface Idelear {
    recordId: number;
    countryName: string;
    stateName: string;
    cityName: string;
    delarName: string;
    enabled: number;
    createDate: Date;
}

export interface IConsumer {
    consumerID: number;
    consumerName: string;
    email: string;
    mobileNumber: number;
    location: string;
    enabled: string;
    lastOrder: Date;
}
export class MyTitle {
    id: number;
    Title: string;

   
}