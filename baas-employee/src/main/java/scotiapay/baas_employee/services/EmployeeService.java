package scotiapay.baas_employee.services;

import com.bank.scotiapay.openapi.model.Employee;
import com.bank.scotiapay.openapi.model.EmployeeResponse;
import com.bank.scotiapay.openapi.model.EmployeesResponse;

import java.util.UUID;


public interface EmployeeService {

    EmployeeResponse findEmployee(UUID id);
    EmployeesResponse findEmployees(int page, int cantEmployees);
    EmployeeResponse createEmployee(Employee employee);
    EmployeeResponse updateEmployee(UUID id, Employee employee);

}
