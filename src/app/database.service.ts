import { Injectable } from '@angular/core';
import * as ons from 'onsenui';
declare var cordova: any;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
    operator: any;
    flyer: any;
    pfco: any;
    rp: any;
  constructor() { 
this.checkDetailsStorage();
  }


  getFromStorage(key){
return JSON.parse(localStorage.getItem(key))
  }

  
  addToStorage(key, obj){

localStorage.setItem(key, JSON.stringify(obj))
ons.notification.toast( `${obj.sectionName} updated sucessfully!`, {timeout: 2000});

if (obj.sectionName === 'Operator Section') {
  var time= obj.expDate;
  time = time.replace("-",",")

  console.log(time)

  cordova.plugins.notification.local.schedule({
    id: 1,
    title: 'Operator ID Expired',
    text: 'I can now make a notification by pressing a button whoah, its only here because i hate you jon',
    trigger: { at: new Date(time) }
    
});

} else if (obj.sectionName === 'Flyer Section'){
  var time= obj.expDate;
  time = time.replace("-",",")

  cordova.plugins.notification.local.schedule({
    id: 2,
    title: 'Flyer ID Expired',
    text: 'I can now make a notification by pressing a button whoah, its only here because i hate you jon',
    
});
  

 } else if (obj.sectionName === 'PFCO Section'){
  var time= obj.expDate;
  time = time.replace("-",",")

  cordova.plugins.notification.local.schedule({
    id: 3,
    title: 'PFCO Expired',
    text: 'I can now make a notification by pressing a button whoah, its only here because i hate you jon',
    
});

} 


console.log(obj.sectionName,obj.expDate)
  }

  trigNoti(){
    cordova.plugins.notification.local.schedule({
      title: 'Sync in progress',
      text: 'I can now make a notification by pressing a button whoah, its only here because i hate you jon',
      actions: [
        { id: 'yes', title: 'I hate jon aswell' },
        { id: 'no',  title: 'I hate jon more' }
    ]
      
  });
  }

  checkDetailsStorage(){
      this.operator = localStorage['operator'] 
      ? JSON.parse(localStorage.getItem('operator')) 
      : {
        opID: '',
        name:'',
        startDate:'',
        expDate:'',
        sectionName:'Operator Section'
        
      };
      this.flyer = localStorage['flyer'] 
      ? JSON.parse(localStorage.getItem('flyer')) 
      : {
        flyID: '',
        name:'',
        startDate:'',
        expDate:'',
        sectionName:'Flyer Section'
      };
      this.pfco = localStorage['pfco'] 
      ? JSON.parse(localStorage.getItem('pfco')) 
      : {
        pfcoID: '',
        name:'',
        startDate:'',
        expDate:'',
        sectionName:'PFCO Section'
      };
      this.rp = localStorage['rp'] 
      ? JSON.parse(localStorage.getItem('rp')) 
      : {
        rpID: '',
        name:'',
        startDate:'',
        expDate:'',
        sectionName:'Remote Pilot Section'
      };
  }
}
