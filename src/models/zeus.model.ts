import { ZeusHeaderRequestInteface, PaginationRequestInterface } from "../interfaces/zeus.interface";

export class ZeusHeaderRequest implements ZeusHeaderRequestInteface{
    env: string;    
    operationConfigId: number;
    requestDate: Date;
    token: string;
    username: string;

    constructor() {
        this.env = 'string';
        this. operationConfigId = 0;
        this.requestDate = new Date(),
        this.token = 'string',
        this.username = 'string';
    }

}

export class PaginationRequest implements PaginationRequestInterface {
    
    orderAttributte: string;
    orderType: string;
    pageNumber: number;
    pageSize: number;

    constructor( pageSize = 0, orderAttributte = 'string', orderType = 'ASC', pageNumber = 0 ){
        this.orderAttributte = orderAttributte;
        this.orderType = orderType;
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
    }

}

export class RequestWalmart {
    businessRequest:any = {};
    paginationRequest:any;
    zeusHeaderRequest:any;
}