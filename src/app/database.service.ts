import { Injectable } from "@angular/core";
import * as ons from "onsenui";
declare var cordova: any;

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  operator: any;
  flyer: any;
  pfco: any;
  rp: any;
  constructor() {
    this.checkDetailsStorage();
  }

  getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  addToStorage(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
    ons.notification.toast(`${obj.sectionName} updated sucessfully!`, {
      timeout: 2000
    });

    if (obj.sectionName === "Operator Section") {
      var time = obj.expDate;
      time = time.replace("-", ",");

      console.log(time);

      cordova.plugins.notification.local.schedule({
        id: 1,
        title: "Operator ID Expired",
        text:
          "Your Operator ID has now expired, Please visit the CAA website to renew",
        trigger: { at: new Date(time) }
      });
    } else if (obj.sectionName === "Flyer Section") {
      var time = obj.expDate;
      time = time.replace("-", ",");

      cordova.plugins.notification.local.schedule({
        id: 2,
        title: "Flyer ID Expired",
        text:
          "Your Flyer ID has now expired, Please visit the CAA website to renew"
      });
    } else if (obj.sectionName === "PFCO Section") {
      var time = obj.expDate;
      time = time.replace("-", ",");

      cordova.plugins.notification.local.schedule({
        id: 3,
        title: "PFCO Expired",
        text:
          "Your PFCO has now expired. Please ensure your Operations Manual and logs are upto date and visit the CAA website to renew"
      });
    }

    console.log(obj.sectionName, obj.expDate);
  }

  checkDetailsStorage() {
    this.operator = localStorage["operator"]
      ? JSON.parse(localStorage.getItem("operator"))
      : {
          opID: "",
          name: "",
          startDate: "",
          expDate: "",
          sectionName: "Operator Section"
        };
    this.flyer = localStorage["flyer"]
      ? JSON.parse(localStorage.getItem("flyer"))
      : {
          flyID: "",
          name: "",
          startDate: "",
          expDate: "",
          sectionName: "Flyer Section"
        };
    this.pfco = localStorage["pfco"]
      ? JSON.parse(localStorage.getItem("pfco"))
      : {
          pfcoID: "",
          name: "",
          startDate: "",
          expDate: "",
          sectionName: "PFCO Section"
        };
    this.rp = localStorage["rp"]
      ? JSON.parse(localStorage.getItem("rp"))
      : {
          rpID: "",
          name: "",
          startDate: "",
          expDate: "",
          sectionName: "Remote Pilot Section"
        };
  }
}
