import { BrowserModule, } from '@angular/platform-browser';
import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './User/Registration/registration.component';
import { LoginComponent } from './User/Login/login.component';
import { ChangePasswordComponent} from './User/ChangePassword/changepassword.component';
import {DevelopmentComponent} from './Development/development.component';

import { LoginService } from './Service/login.service';
import { HomeComponent } from './Home/home.component';
import { CreateEmComponent } from './User/CreateEmp/createEm.component'
import { UpdateEmComponent } from './User/UpdateEmp/updateEm.component';






const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: 'development', component: DevelopmentComponent },

  // { path: 'app', component: AppComponent },
  //{ path: 'home', component: HomeComponent },
  { path: 'createEm', component: CreateEmComponent },
  {
    path: 'home', component: HomeComponent,
    children: [
      {
        path: 'createEm',
        component: CreateEmComponent,

      },
      {
        path: 'updateEm',
        component: UpdateEmComponent,

      }
    ]

  }
];
 
@NgModule({
  declarations: [
 
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ChangePasswordComponent,
    DevelopmentComponent,
    HomeComponent,
    CreateEmComponent,
    UpdateEmComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {

}
