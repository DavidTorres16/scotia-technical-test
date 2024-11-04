package scotiapay.baas_employee.services;

import com.bank.scotiapay.openapi.model.EmployeeResponse;
import com.bank.scotiapay.openapi.model.EmployeesResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import scotiapay.baas_employee.entities.EmployeeEntity;
import scotiapay.baas_employee.repository.EmployeeRepository;
import scotiapay.baas_employee.services.mapper.EmployeeMapper;

import javax.persistence.NoResultException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;
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
        List<EmployeeEntity> employeeEntities= (List<EmployeeEntity>) employeeRepository.findAll(pageable);
        if(employeeEntities.isEmpty()){
            throw new NoResultException("The employees you are trying to query does not exist");
        }
        return null;
    }
}
