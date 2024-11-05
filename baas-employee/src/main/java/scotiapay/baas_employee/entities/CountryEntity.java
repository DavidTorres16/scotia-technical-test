package scotiapay.baas_employee.entities;

import lombok.Getter;
import lombok.Setter;


import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "country")
@Getter
@Setter
public class CountryEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false, unique = true, length = 100)
    private String name;

    @OneToMany(mappedBy = "countryEntity", fetch = FetchType.LAZY)
    private Set<RegionEntity> regionEntities;


}