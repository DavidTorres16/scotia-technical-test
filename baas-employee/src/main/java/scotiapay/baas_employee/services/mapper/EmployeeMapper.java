package scotiapay.baas_employee.services.mapper;

import com.bank.scotiapay.openapi.model.Employee;
import com.bank.scotiapay.openapi.model.EmployeeList;
import com.bank.scotiapay.openapi.model.EmployeeResponse;
import com.bank.scotiapay.openapi.model.Position;
import org.springframework.stereotype.Component;
import scotiapay.baas_employee.entities.EmployeeEntity;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

@Component
public class EmployeeMapper {

    public EmployeeResponse mapToEmployeeResponse(EmployeeEntity employeeEntity) {

        EmployeeResponse response = new EmployeeResponse();
        Employee employee = new Employee();
        employee.setId(employeeEntity.getId());
        employee.setName(employeeEntity.getFirstName());
        employee.setMiddleName(employeeEntity.getMiddleName());
        employee.setLastName(employeeEntity.getLastName());
        employee.setDateBirth(Date.valueOf(employeeEntity.getDateOfBirth()));
        employee.setLocationCity(employeeEntity.getLocationCity().toString());
        employee.setAddress(employeeEntity.getAddress());
        employee.setTelephone(employeeEntity.getTelephone());
        if (employeeEntity.getPosition() != null) {
            Position position = new Position();
            position.setPositionTitle(employeeEntity.getPosition().getTitle());
            position.setHireDate(Date.valueOf(employeeEntity.getPosition().getHireDate()));
            position.setEmail(employeeEntity.getPosition().getEmail());
            position.setSalary(employeeEntity.getPosition().getSalary());
            Integer months = calculateMonthsSince(employeeEntity.getPosition().getTimeInPosition());
            position.setTimePosition(months);
            employee.setPosition(position);
        }
        response.setEmployee(employee);
        return response;
    }

    public static int calculateMonthsSince(LocalDate startDate) {
        LocalDate currentDate = LocalDate.now();
        Period period = Period.between(startDate, currentDate);
        return (int) period.toTotalMonths();
    }

    public List<EmployeeList> mapToEmployeeList(List<EmployeeEntity> employeeEntities) {
        List<EmployeeList> employeeLists  = new ArrayList<>();
        for (EmployeeEntity employeeEntity: employeeEntities) {
            employeeLists.add(EmployeeList
                    .builder()
                    .id(employeeEntity.getId())
                    .dateArrival(employeeEntity.getPosition().getTimeInPosition().toString())
                    .lastName(employeeEntity.getLastName())
                    .name(employeeEntity.getFirstName())
                    .status(employeeEntity.getStatus())
                    .positionTitle(employeeEntity.getPosition().getTitle())
                    .build());
        }
        return employeeLists;
    }


}