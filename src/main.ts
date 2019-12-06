import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare var cordova: any;

if (environment.production) {
  enableProdMode();
}

let onDeviceReady = () => {
  platformBrowserDynamic().bootstrapModule(AppModule);
  
  
    cordova.plugins.notification.local.setDefaults({
      led: { color: '#84acce', on: 500, off: 500 },
      vibrate: true
    }); 
    
  

};
document.addEventListener('deviceready', onDeviceReady, false);




