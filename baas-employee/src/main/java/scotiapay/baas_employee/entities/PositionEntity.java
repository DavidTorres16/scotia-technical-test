package scotiapay.baas_employee.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Duration;
import java.math.BigDecimal;
import java.time.Period;
import java.util.UUID;

@Entity
@Table(name = "position_employee")
@Getter
@Setter
public class PositionEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "hire_date", nullable = false)
    private LocalDate hireDate;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "salary", nullable = false, precision = 15, scale = 2)
    private BigDecimal salary;

    @Column(name = "time_in_position", nullable = false)
    private LocalDate timeInPosition;


}