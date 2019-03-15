import { AdministratorId } from "./administrador.interface";

export interface BuildingTableVO {
    id: number;
    name: string;
    administratorId: AdministratorId;
    creatorUser?: any;
    token?: any;
    selected?:boolean;
}
  
