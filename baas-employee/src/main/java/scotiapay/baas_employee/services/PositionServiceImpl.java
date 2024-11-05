package scotiapay.baas_employee.services;

import com.bank.scotiapay.openapi.model.Position;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import scotiapay.baas_employee.entities.PositionEntity;
import scotiapay.baas_employee.repository.PositionRepository;
import scotiapay.baas_employee.services.mapper.EmployeeMapper;

import javax.persistence.NoResultException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@AllArgsConstructor
public class PositionServiceImpl implements PositionService {

    private final PositionRepository positionRepository;
    private final EmployeeMapper employeeMapper;

    @Override
    public PositionEntity savePosition(Position position) {
        log.info(String.format("Entry services PositionServiceImpl in method savePosition for client id: $"));
        return positionRepository.save(employeeMapper.toPositionEntity(position));
    }

    @Override
    public PositionEntity updatePosition(UUID id, Position position) {
        log.info(String.format("Entry services PositionServiceImpl in method savePosition for client id: $"));
        Optional<PositionEntity> optionalPosition = positionRepository.findById(id);
        if (!optionalPosition.isPresent()) {
            throw new NoResultException("Position not found with id " + id);
        }

        PositionEntity existingPosition = optionalPosition.get();
        existingPosition.setTimeInPosition(LocalDate.now().minusMonths(position.getTimePosition()));
        existingPosition.setEmail(position.getEmail());
        existingPosition.setTitle(position.getPositionTitle());

        Instant instant = position.getHireDate().toInstant();
        ZoneId zoneId = ZoneId.systemDefault();

        existingPosition.setHireDate(instant.atZone(zoneId).toLocalDate());

        return positionRepository.save(existingPosition);
    }

}
