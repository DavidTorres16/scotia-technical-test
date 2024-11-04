package scotiapay.baas_employee.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ConstantException {
    ERROR_DATA_BASE_PERSISTENCE_NO_CONTENT("400","Error, no data exists" ),
    ERROR_DATA_BASE_PERSISTENCE("500","Database error, contact system admin" ),
    ERROR_DATA_BASE_RESTRICTION("400", "Constraint violation when saving entity to database"),
    ERROR_DATA_BASE("500", "Error data base: "),
    ERROR_VALIDATION("400", "Error validation: ");
    private final String code;
    private final String Message;

}