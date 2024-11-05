import { EmployeeDetail, EmployeeUpdate } from '../types/employeeInterfaces';

export const convertEmployeeUpdateToDetail = (employeeUpdate: EmployeeUpdate): EmployeeDetail => {
  return {
    id: employeeUpdate.id,
    name: employeeUpdate.name,
    middle_name: employeeUpdate.middle_name,
    last_name: employeeUpdate.last_name,
    position: {
      position_title: employeeUpdate.title,
      hire_date: employeeUpdate.hire_date,
      email: employeeUpdate.email,
      salary: employeeUpdate.salary,
      time_position: employeeUpdate.time_position,
      id: employeeUpdate.position_id
    },
    date_arrival: employeeUpdate.date_arrival,
    status: employeeUpdate.status,
    location_city: employeeUpdate.location_city,
    address: employeeUpdate.address,
    date_birth: employeeUpdate.date_birth,
    telephone: employeeUpdate.telephone
  };
};
