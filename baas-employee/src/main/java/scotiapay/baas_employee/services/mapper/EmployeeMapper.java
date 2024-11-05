package scotiapay.baas_employee.services.mapper;

import com.bank.scotiapay.openapi.model.Employee;
import com.bank.scotiapay.openapi.model.EmployeeList;
import com.bank.scotiapay.openapi.model.EmployeeResponse;
import com.bank.scotiapay.openapi.model.Position;
import org.springframework.stereotype.Component;
import scotiapay.baas_employee.entities.EmployeeEntity;
import scotiapay.baas_employee.entities.PositionEntity;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
            position.setId(employeeEntity.getPosition().getId());
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

    private LocalDate calculateDateFromMonths(Integer months) {
        return LocalDate.now().minusMonths(months != null ? months : 0);
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

    public EmployeeEntity mapToEmployeeEntity(EmployeeResponse employeeResponse) {
        Employee employee = employeeResponse.getEmployee();
        EmployeeEntity employeeEntity = new EmployeeEntity();

        employeeEntity.setId(employee.getId());
        employeeEntity.setFirstName(employee.getName());
        employeeEntity.setMiddleName(employee.getMiddleName());
        employeeEntity.setLastName(employee.getLastName());
        employeeEntity.setDateOfBirth(employee.getDateBirth().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate());

        if (employee.getLocationCity() != null) {
            employeeEntity.setLocationCity(UUID.fromString(employee.getLocationCity()));
        }

        employeeEntity.setAddress(employee.getAddress());
        employeeEntity.setTelephone(employee.getTelephone());

        if (employee.getPosition() != null) {
            Position position = employee.getPosition();
            PositionEntity positionEntity = new PositionEntity();

            positionEntity.setTitle(position.getPositionTitle());
            positionEntity.setHireDate(position.getHireDate().toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate());
            positionEntity.setEmail(position.getEmail());
            positionEntity.setSalary(position.getSalary());
            positionEntity.setTimeInPosition(calculateDateFromMonths(position.getTimePosition()));

            employeeEntity.setPosition(positionEntity);
        }

        return employeeEntity;
    }

    public PositionEntity toPositionEntity(Position position) {
        if (position == null) {
            return null;
        }

        PositionEntity entity = new PositionEntity();
        entity.setId(UUID.randomUUID());
        entity.setTitle(position.getPositionTitle());
        entity.setHireDate(position.getHireDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
        entity.setEmail(position.getEmail());
        entity.setSalary(position.getSalary());

        if (position.getTimePosition() != null) {
            entity.setTimeInPosition(LocalDate.now().minusMonths(position.getTimePosition()));
        }

        return entity;
    }

}