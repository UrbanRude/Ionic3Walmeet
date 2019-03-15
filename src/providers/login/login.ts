import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_DOMAINS, VALIDATE_USER, GET_USER_DETAIL, VERIFY_SUPPLIER, SEARCH_USER_BY_LOGIN_USER } from '../../environments/endpoints';
import { SearchUser } from '../../models/meeting.model';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient) {
  }

  getDomains(){  
    return this.http.post( GET_DOMAINS ,{ request:'test' } );
  }

  validateUser( userDomain:string,userAccount:string,userPassword:string ) {
    return this.http.post( VALIDATE_USER, {
      "headerRequest":
        {
          "service":83,
          "domain":100,
          "business":1,
          "channel":1,
          "client":1,
          "requestClient":123,
          "requestDate": new Date()
        },
        "businessRequest":
          {
            "userDomain": userDomain,
            "userAccount": userAccount,
            "userPassword": userPassword
          }
        });
  }

  getUserDetail( token:string ) {
    return this.http.post( GET_USER_DETAIL,{businessRequest:{tokenString:token}} );
  }

  verifySupplier( user:string ) {
    return this.http.post( VERIFY_SUPPLIER ,{
      "businessRequest": user,
      "paginationRequest": {
        "orderAttributte": "string",
        "orderType": "ASC",
        "pageNumber": 0,
        "pageSize": 0
      },
      "zeusHeaderRequest": {
        "env": "string",
        "operationConfigId": 0,
        "requestDate": "2019-01-17T23:56:04.601Z",
        "token": "string",
        "username": "string"
      }
    });
  }

  searchUserByLoginUser( userSearch:SearchUser ) {
    let requestWalmart:any = {};
    requestWalmart.businessRequest = userSearch;
    return this.http.post( SEARCH_USER_BY_LOGIN_USER, requestWalmart )
                    .map( (response:any) =>  {
                      if(response.SearchUserResponse.headerResponse.responseCode.toLocaleLowerCase() === 'ok'){
                        if( Array.isArray( response.SearchUserResponse.businessResponse ) ) {
                          response.SearchUserResponse.businessResponse.forEach(element => {
                            element.LoginNameWithDomain = `${userSearch.userDomain}\\${element.LoginName}`;
                          });
                          return response.SearchUserResponse.businessResponse;
                        } else {
                          let users:any[] = [];
                          let user = response.SearchUserResponse.businessResponse.DomaintItemsResult;
                          user.LoginNameWithDomain = `${userSearch.userDomain}\\${user.LoginName}`
                          users.push( user );
                          return users;
                        } 
                      } else {
                        return [];
                      }
                      
                    });
  }

}
