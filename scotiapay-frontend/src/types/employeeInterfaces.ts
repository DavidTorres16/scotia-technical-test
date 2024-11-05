import { Position } from "./positionInterfaces";

export interface Employee {
    id: number;
    name: string;
    middleName: string;
    last_name: string;
    date_arrival: string;
    status: string;
    locationCity: string;
    address: string;
    dateBirth: string;
    telephone: string;
    position_title: string
}  

export interface EmployeeUpdate {
    id?: string;
    name: string;
    middle_name: string;
    last_name: string;
    title: string;
    date_arrival: string;
    status: string;
    location_city: string;
    address: string;
    date_birth: string;
    telephone: string;
    hire_date: string;
    email: string;
    salary: number;
    position_id: string;
    time_position: number;
}

export interface EmployeeDetail{
    id?: string;
    name: string;
    middle_name: string;
    last_name: string;
    date_arrival: string;
    status: string;
    location_city: string;
    address: string;
    date_birth: string;
    telephone: string;
    position: Position
}