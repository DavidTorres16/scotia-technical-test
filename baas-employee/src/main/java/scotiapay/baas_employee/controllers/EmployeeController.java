package scotiapay.baas_employee.controllers;

import com.bank.scotiapay.openapi.EmployeeApi;
import com.bank.scotiapay.openapi.EmployeesApi;
import com.bank.scotiapay.openapi.model.EmployeeResponse;
import com.bank.scotiapay.openapi.model.EmployeesResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.NativeWebRequest;
import scotiapay.baas_employee.services.EmployeeService;
import scotiapay.baas_employee.utils.ConstantPath;

import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping(ConstantPath.BASE_PATH_V1)
@Slf4j
public class EmployeeController implements EmployeeApi, EmployeesApi {

    private final EmployeeService employeeService;

    @Override
    public Optional<NativeWebRequest> getRequest() {
        return EmployeeApi.super.getRequest();
    }

    @Override
    public ResponseEntity<EmployeeResponse> getEmployee(UUID id) {
        log.info(String.format("Entry controller EmployeeController in method getEmployee for client id: $"), id);
        employeeService.findEmployee(id);
        return ResponseEntity.ok(employeeService.findEmployee(id));
    }

    @Override
    public ResponseEntity<EmployeesResponse> listEmployee(Integer page, Integer numberEmployees) {
        log.info(String.format("Entry controller EmployeeController in method listEmployee"));
        return ResponseEntity.ok(employeeService.findEmployees(page, numberEmployees ));
    }
}
