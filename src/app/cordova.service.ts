import { Injectable,NgZone } from '@angular/core';
import { Subject, BehaviorSubject,Observable } from 'rxjs';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
function _window(): any {
 // return the global native browser window object
 return window;
}@Injectable()
export class CordovaService {
   
   private resume: BehaviorSubject<boolean>;   constructor(private zone: NgZone) {
      this.resume = new BehaviorSubject<boolean>(null);
      fromEvent(document, 'resume').subscribe(event => {
         this.zone.run(() => {
            this.onResume();
         });
      });
    }
   
   get cordova(): any {
      return _window().cordova;
   }   get onCordova(): Boolean {
    return !!_window().cordova;
    }   public onResume(): void {
      this.resume.next(true);
   }
}