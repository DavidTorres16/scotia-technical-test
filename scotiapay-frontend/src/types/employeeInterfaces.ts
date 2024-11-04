import { Position } from "./positionInterfaces";

export interface Employee {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    dateArrival: string;
    status: string;
    locationCity: string;
    address: string;
    dateBirth: string;
    telephone: string;
    position: Position
}  

export interface EmployeeUpdate {
    id?: number;
    firstName: string;
    middleName: string;
    lastName: string;
    dateArrival: string;
    status: string;
    locationCity: string;
    address: string;
    dateBirth: string;
    telephone: string;
    position: Position
}