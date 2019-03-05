import { Injectable } from '@angular/core';
import { CLEAN_LOCAL_STORAGE } from '../../environments/enviroments';


@Injectable()
export class LocalStorageProvider {

  saveItem(key:string,object:any){
    localStorage.setItem(key,JSON.stringify(object))
  }

  getItem(key:string){
    if( localStorage.key ){
      return JSON.parse (localStorage.getItem(key));
    } 
    return null;
  }

  cleanStorage() {
    let cleanKeys = CLEAN_LOCAL_STORAGE;
    cleanKeys.forEach( key => {
      localStorage.removeItem( key );
    });
  }

}
