// import { Component,OnInit } from '@angular/core';
// // import { Http,RequestOptions,Headers } from '@angular/http';
// import { HttpClient,HttpClientModule } from '@angular/common/http';
// import 'rxjs/add/operator/map';
// // import { CrudOperationService } from './app.crud.service';
// import {AccordionModule} from 'primeng/components/accordion/accordion';
// import {MenuItem} from 'primeng/components/common/api';
// import {MenubarModule} from 'primeng/primeng';
// import {DialogModule} from 'primeng/primeng';
// import {FormsModule,ReactiveFormsModule,Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
// import {Message,SelectItem} from 'primeng/components/common/api';
// import {PanelModule} from 'primeng/primeng';


// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//     public globalResponse: any;
//     public apiURL:string="http://localhost:54964/api/Items";
//   title = 'Inventory Managment System';
//   items: MenuItem[];
//    msgs: Message[] = [];
//    msgsupdate:Message[]=[];
//    msgsdelete:Message[]=[];
//    inventoryItems: Item;

//     insertform: FormGroup;
//     updateform:FormGroup;
//     deleteform:FormGroup;
    

//     submitted: boolean;

//     Category: SelectItem[];
//     ItemIds: SelectItem[];
//     description: string;

//     constructor(private fb: FormBuilder,private httpClient:HttpClient) {}
    
//    items1: MenuItem[];
//    displayAdd: boolean = false;
//    displayUpdate : boolean = false;
//    displayDelete: boolean = false;
//    displayAll: boolean = false;

//     showAddDialog() {
//         this.displayAdd = true;
//     }
//     showUpdateDialog() {
//         this.displayUpdate = true;
//         this.ItemIds = [];
//         this.ItemIds.push({label:'Select Id to update', value:''});
//             for(let item in this.inventoryItems){
//             this.ItemIds.push({label:this.inventoryItems[item].Id, value:this.inventoryItems[item].Id});
//             }  
//     }
//     fillUpdateControls() {
//         var selectedId=this.updateform.controls['id'].value;

//       let  currentItem: Item;
//          for(let item in this.inventoryItems){
//             if(this.inventoryItems[item].Id===selectedId)
//                 {
//                    currentItem  =this.inventoryItems[item];
//                 }
//             }  
//          this.updateform.controls['name'].setValue(currentItem.Name);
//          this.updateform.controls['code'].setValue(currentItem.Code);
//          this.updateform.controls['quantity'].setValue(currentItem.Quantity);
//          this.updateform.controls['unitprice'].setValue(currentItem.PerUnitPrice);
//          this.updateform.controls['description'].setValue(currentItem.Description);
//          this.updateform.controls['category'].setValue(currentItem.Category);
//     }
//     showDeleteDialog() {
//         this.displayDelete = true;
//         this.ItemIds = [];
//         this.ItemIds.push({label:'Select Id to update', value:''});
//             for(let item in this.inventoryItems){
//             this.ItemIds.push({label:this.inventoryItems[item].Id, value:this.inventoryItems[item].Id});
//             }  
//     }
//     showAllDialog() {
//         this.displayAll = true;
//          this.httpClient.get<Item>(this.apiURL)
//                         .subscribe((data) => {
//                             this.inventoryItems =  data;
//                         });
//     }
//     OnUpdate(value: string) {
//         this.submitted = true;
//         this.msgsupdate = [];
//         var id = this.updateform.controls['id'].value;
//         var name = this.updateform.controls['name'].value;
//         var code = this.updateform.controls['code'].value;
//         var quantity = this.updateform.controls['quantity'].value;
//         var unitprice = this.updateform.controls['unitprice'].value;
//         var description = this.updateform.controls['description'].value;
//         var category = this.updateform.controls['category'].value;

//         let item=new Item(id,name,code,quantity,unitprice,category,description);
//         this.httpClient.put(this.apiURL+"?id=" + id,item)
//             .subscribe((result) => {
//                 this.globalResponse = result;                 
//             },
//             error => { //This is error part
//                 console.log(error);
//                 this.msgsupdate.push({severity:'error', summary:'An error occured during update operation', detail:error});
//             },
//             () => {
//                 // 'onCompleted' callback. This is Success part
//                 if (this.globalResponse.Id == id){
//                     this.msgsupdate.push({severity:'success', summary:'Item Updated successfuly', detail:'Form Submitted'});
//                     this.httpClient.get<Item>(this.apiURL)
//                         .subscribe((data) => {
//                             this.inventoryItems =  data;
//                         })
//                 }
//             }
//             )   
//     }
//         OnDelete(value: string) {
//         this.submitted = true;
//         this.msgsdelete = [];
//         var id = this.deleteform.controls['id'].value;
//         this.httpClient.delete(this.apiURL+"?id=" + id)
//             .subscribe((result) => {
//                 this.globalResponse = result;                 
//             },
//             error => { //This is error part
//                 console.log(error);
//                 this.msgsdelete.push({severity:'error', summary:'An error occured during delete operation', detail:error});
//             },
//             () => {
//                 // 'onCompleted' callback. This is Success part
//                 if (this.globalResponse.Id == id) {
//                     this.msgsdelete.push({severity:'success', summary:'Item Deleted successfuly', detail:'Form Submitted'});
//                     this.httpClient.get<Item>(this.apiURL)
//                         .subscribe((data) => {
//                             this.inventoryItems =  data;
//                         })
//                 }
//             }
//             )   
//     }
//     OnInsert(value: string)
//     {
//         this.insertform.value;
//         var name = this.insertform.controls['name'].value;
//         var code = this.insertform.controls['code'].value;
//         var quantity = this.insertform.controls['quantity'].value;
//         var unitprice = this.insertform.controls['unitprice'].value;
//         var description = this.insertform.controls['description'].value;
//         var category = this.insertform.controls['category'].value;

//         let item=new Item(0,name,code,quantity,unitprice,category,description);
//         this.submitted = true;
//         this.msgs = [];
//         this.httpClient.post(this.apiURL,item)
//             .subscribe((result) => {
//                 this.globalResponse = result;                 
//             },
//             error => { //This is error part
//                 console.log(error);
//                 this.msgs.push({severity:'error', summary:'An error occured during insert operation', detail:error});
//             },
//             () => {
//                 // 'onCompleted' callback. This is Success part
//                 if (this.globalResponse.Name == name) {
//                     this.msgs.push({severity:'success', summary:'Item Inserted successfuly', detail:'Form Submitted'});
//                     this.httpClient.get<Item>(this.apiURL)
//                         .subscribe((data) => {
//                             this.inventoryItems =  data;
//                         })
//                 }
//             }
//             )
//     }
    
//     ngOnInit() {
//          this.httpClient.get<Item>(this.apiURL)
//                         .subscribe((data) => {
//                             this.inventoryItems =  data;
//                         });

//           this.items1 = [
//             {
//                 label: 'Dashboard',
//                 icon: 'fa fa-dashcube',
//                 routerLink:['/dashboard']
//             },
//             {
//                 label: 'Inventory Management ',
//                 icon: 'fa-edit',
//                 items: [
//                     {label: 'New Item', icon: 'fa-plus',command: (event) => { this.showAddDialog();} },
//                     {label: 'Update Item', icon: 'fa-save',command: (event) => { this.showUpdateDialog();} },
//                     {label: 'Delete Item', icon: 'fa-minus',command: (event) => { this.showDeleteDialog();} },
//                     {label: 'All Item', icon: 'fa-refresh',command: (event) => { this.showAllDialog();} }
                    
//                 ]
//             },
//             {
//                 label: 'Vendor Management',
//                 icon: 'fa-gear',
//                 routerLink: ['/vendor']
//             },
//             {
//                 label: 'Order Management',
//                 icon: 'fa fa-first-order',
//                 routerLink: ['/order']
//             },
//             {
//                 label: 'DotNet Techy Tutorial ',
//                 icon: 'fa-question',
//                 items: [
//                     {
//                         label: 'Angular-5'
//                     },
//                     {
//                         label: 'Angular-4'
//                     },
//                     {
//                         label: 'Angular-2'
//                     }
//                 ]
//             }
//         ];  
//           this.insertform = this.fb.group({
//             'name': new FormControl('', Validators.required),
//             'code': new FormControl('', Validators.required),
//             'quantity': new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)])),
//             'unitprice': new FormControl('', Validators.required),   
//             'description': new FormControl(''),
//             'category': new FormControl('', Validators.required)
//         });

//         this.updateform = this.fb.group({
//             'name': new FormControl('', Validators.required),
//             'id': new FormControl('', Validators.required),
//             'code': new FormControl('', Validators.required),
//             'quantity': new FormControl('', Validators.compose([Validators.required, Validators.minLength(1)])),
//             'unitprice': new FormControl('', Validators.required),   
//             'description': new FormControl(''),
//             'category': new FormControl('', Validators.required)
//         });
//          this.deleteform = this.fb.group({
//             'id': new FormControl('', Validators.required)
//         });

//         this.Category = [];
//         this.Category.push({label:'Select Category', value:''});
//         this.Category.push({label:'Fruits', value:'Fruits'});
//         this.Category.push({label:'Grains', value:'Grains'});  
//         this.Category.push({label:'Healthy Fats', value:'Healthy Fats'});  
//         this.Category.push({label:'Seasonings', value:'Seasonings'});  
//         this.Category.push({label:'Dairy', value:'Dairy'});  
//         this.Category.push({label:'Accompaniments', value:'Accompaniments'});   
//     }
//    index: number = 0;

//     openNext() {
//         this.index = (this.index === 2) ? 0 : this.index + 1;
//     }
    
//     openPrev() {
//         this.index = (this.index === 0) ? 2 : this.index - 1;
//     }
//     //   get diagnostic() { return JSON.stringify(this.insertform.value); }
// }


// class Item {
//     public Id: number;
//     public Name: string;
//     public Code: string;
//     public Quantity: number;
//     public PerUnitPrice: number;
//     public Category: string;
//     public Description: string;
    
//     constructor(Id: number, Name: string, Code: string,Quantity:number,PerUnitPrice:number,Category:string,Description:string) {
//         this.Id = Id;
//         this.Name = Name;
//         this.Code = Code;
//         this.Quantity = Quantity;
//         this.PerUnitPrice = PerUnitPrice;
//         this.Category=Category;
//         this.Description=Description;

//     }
// }
