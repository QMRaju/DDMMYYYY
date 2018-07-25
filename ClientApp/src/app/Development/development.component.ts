import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms';
import { BrowserModule,  } from '@angular/platform-browser';
import { LoginService } from '../Service/login.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AppModule } from '../app.module';
import { HttpErrorResponse } from '@angular/common/http';
import { AppComponent } from '../app.component';
import{ICountry} from '../Model/gas.model'
  
@Component({
    selector: 'user-development',
    templateUrl: './development.component.html',
    styleUrls: ['./development.component.css'],
    providers:[LoginService]
})

export class DevelopmentComponent implements OnInit{
    errorMessage: any; 
    country : ICountry[]; 
    

    constructor(private _loginService:LoginService, private _router: Router ,private _appComponent:AppComponent ) {
     }
    
    ngOnInit() {

        this._loginService.getCountryListMtd()
        .subscribe((countryListData) => this.country = countryListData);
  
    }
    OnSubmit(userName,password){
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