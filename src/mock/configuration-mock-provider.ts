import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ConfigurationMockProvider {

    constructor(public http: HttpClient){
    }

    getAllBuildings() {
        return this.http.get('assets/json/get_building.json');
    }

    getCapacityMeeting() {               
        return this.http
                   .get( 'assets/json/get_capacity_catalog.json')
                   .map( (response:any) => {
                        if( response.zeusHeaderResponse.businessSuccess ) {
                            return response.businessResponse.data;
                        } else {
                            throw new Error(JSON.stringify(response.zeusHeaderResponse));
                        }
                        })
                        .catch( this.handleError );
    }
    
    getConfig() {
        return this.http.get( 'assets/json/get_config_app.json' );
    }

    handleError(error: any) {
        return Observable.throw(error);
    }

}