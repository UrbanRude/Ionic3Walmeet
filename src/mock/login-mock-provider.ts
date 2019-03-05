import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SearchUser } from "../models/meeting.model";


@Injectable()
export class LoginMockProvider {

    constructor(public http: HttpClient){
    }

    getDomains(){  
        return this.http.get( 'assets/json/get_domains.json' );
    }

    validateUser( userDomain:string,userAccount:string,userPassword:string ) {
        return this.http.get( 'assets/json/post_validate_user.json' );
    }
    
    getUserDetail( token:string ) {
        return this.http.get( 'assets/json/get_user_detail.json' );
    }
    
    verifySupplier( user:string ) {
        return this.http.get( 'assets/json/post_check_is_suplier.json' );
    }

    searchUserByLoginUser( userSearch:SearchUser ) {
        return this.http.get( 'assets/json/get_users_search.json' )
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