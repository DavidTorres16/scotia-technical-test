package scotiapay.baas_employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import scotiapay.baas_employee.entities.CountryEntity;
import scotiapay.baas_employee.entities.RegionEntity;

import java.util.List;
import java.util.UUID;

@Repository
public interface RegionRepository extends JpaRepository<RegionEntity, UUID> {

}