export interface PaginationRequestInterface {
    orderAttributte: string;
    orderType: string;
    pageNumber: number;
    pageSize: number;
}

export interface ZeusHeaderRequestInteface {
    env: string;
    operationConfigId: number;
    requestDate: Date;
    token: string;
    username: string;
}

export interface BusinessRequest {
    businessRequest:any;
}

