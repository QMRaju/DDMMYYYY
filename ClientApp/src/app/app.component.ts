import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showHideLogin: boolean = true;
  showHideHome: boolean = false;
  showHideDialog: boolean = false;




  constructor(private _router: Router,
  ) {
  }
  ngOnInit() {
  }
  OkSet() {
    console.log('call it.');
    this._router.navigate(['../app']);
  }

}
