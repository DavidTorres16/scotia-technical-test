package scotiapay.baas_employee.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "employee")
@Getter
@Setter
public class EmployeeEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "middle_name", length = 50)
    private String middleName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(name = "location_city", nullable = false, length = 100)
    private String locationCity;

    @Column(name = "address", nullable = false, length = 200)
    private String address;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "telephone", nullable = false, length = 15)
    private String telephone;

    @Column(name = "status", nullable = false, length = 100)
    private String status;

    @ManyToOne()
    @JoinColumn(name = "position_id", nullable = false)
    private PositionEntity position;

}