package scotiapay.baas_employee.entities;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;
import javax.persistence.*;

@Entity
@Table(name = "region")
@Getter
@Setter
public class RegionEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id", nullable = false)
    private CountryEntity countryEntity;

    @OneToMany(mappedBy = "regionEntity")
    private Set<CityEntity> cities;
}