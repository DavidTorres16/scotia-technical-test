export interface Employee {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    positionTitle: string;
    dateArrival: string;
    status: string;
    locationCity: string;
    address: string;
    dateBirth: string;
    telephone: string;
    hireDate: string;
    email: string;
    salary: number;
    timeInPosition: string;
}  

export interface EmployeeUpdate {
    id?: number;
    firstName: string;
    lastName: string;
    positionTitle: string;
    dateArrival: string;
    status: string;
}