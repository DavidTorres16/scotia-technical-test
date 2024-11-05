package scotiapay.baas_employee.services;

import com.bank.scotiapay.openapi.model.Employee;
import com.bank.scotiapay.openapi.model.EmployeeResponse;
import com.bank.scotiapay.openapi.model.EmployeesResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import scotiapay.baas_employee.entities.EmployeeEntity;
import scotiapay.baas_employee.entities.PositionEntity;
import scotiapay.baas_employee.repository.EmployeeRepository;
import scotiapay.baas_employee.services.mapper.EmployeeMapper;
import scotiapay.baas_employee.utils.ConstantPath;

import javax.persistence.NoResultException;
import javax.swing.text.html.Option;
import java.time.Instant;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;
    private final PositionService positionService;

    @Override
    public EmployeeResponse findEmployee(UUID id) {
        log.info(String.format("Entry services EmployeeServiceImpl in method findEmployee for client id: $"), id);
        Optional<EmployeeEntity> employeeEntity = employeeRepository.findById(id);
        if(employeeEntity.isEmpty()){
            throw new NoResultException("The employee you are trying to query does not exist");
        }
        return employeeMapper.mapToEmployeeResponse(employeeEntity.get());
    }

    @Override
    public EmployeesResponse findEmployees(int page, int cantEmployees) {
        log.info(String.format("Entry services EmployeeServiceImpl in method findEmployees for client id: $"));
        Pageable pageable = PageRequest.of(page, cantEmployees);
        List<EmployeeEntity> employeeEntities= employeeRepository.findAll(pageable).getContent();
        if(employeeEntities.isEmpty()){
            throw new NoResultException("The employees you are trying to query does not exist");
        }
        return EmployeesResponse
                .builder()
                .employee(employeeMapper.mapToEmployeeList(employeeEntities))
                .build();
    }

    @Override
    public EmployeeResponse createEmployee(Employee employee) {
        log.info(String.format("Entry services EmployeeServiceImpl in method createEmployee for client id: $"));
        EmployeeEntity newEmployeeData = employeeMapper.mapToEmployeeEntity(EmployeeResponse.builder().employee(employee).build());
        PositionEntity newPosition = positionService.savePosition(employee.getPosition());
        newEmployeeData.setPosition(newPosition);
        newEmployeeData.setStatus(ConstantPath.ACTIVE_STATUS);
        EmployeeEntity newEmployee = employeeRepository.save(newEmployeeData);
        return employeeMapper.mapToEmployeeResponse(newEmployee);
    }

    @Override
    public EmployeeResponse updateEmployee(UUID id, Employee employee){
        log.info(String.format("Entry services EmployeeServiceImpl in method updateEmployee for client id: $"));
        Optional<EmployeeEntity> employeeOptional = employeeRepository.findById(id);
        if (!employeeOptional.isPresent()) {
            throw new NoResultException("Employee not found with id " + id);
        }

        PositionEntity newPosition = positionService.updatePosition(employee.getPosition().getId(), employee.getPosition());
        EmployeeEntity employeeUpdatedData = employeeOptional.get();
        employeeUpdatedData.setPosition(newPosition);
        employeeUpdatedData.setAddress(employee.getAddress());
        employeeUpdatedData.setFirstName(employee.getName());
        employeeUpdatedData.setLastName(employee.getLastName());
        employeeUpdatedData.setMiddleName(employee.getMiddleName());
        if (employee.getLocationCity() != null){
            employeeUpdatedData.setLocationCity(UUID.fromString(employee.getLocationCity()));
        }
        employeeUpdatedData.setTelephone(employee.getTelephone());
        if(employee.getStatus() != null){
            employeeUpdatedData.setStatus(employee.getStatus());
        }

        Instant instant = employee.getDateBirth().toInstant();
        ZoneId zoneId = ZoneId.systemDefault();
        employeeUpdatedData.setDateOfBirth(instant.atZone(zoneId).toLocalDate());

        EmployeeEntity newEmployee = employeeRepository.save(employeeUpdatedData);
        return employeeMapper.mapToEmployeeResponse(newEmployee);
    }
}
