package scotiapay.baas_employee.services;

import com.bank.scotiapay.openapi.model.Position;
import scotiapay.baas_employee.entities.PositionEntity;

import java.util.UUID;

public interface PositionService {

    PositionEntity savePosition(Position position);
    PositionEntity updatePosition(UUID id, Position position);

}
