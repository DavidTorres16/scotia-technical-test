package scotiapay.baas_employee.services;

import com.bank.scotiapay.openapi.model.City;
import com.bank.scotiapay.openapi.model.Country;
import com.bank.scotiapay.openapi.model.Region;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import scotiapay.baas_employee.entities.CityEntity;
import scotiapay.baas_employee.entities.CountryEntity;
import scotiapay.baas_employee.entities.RegionEntity;
import scotiapay.baas_employee.repository.CountryRepository;
import scotiapay.baas_employee.repository.RegionRepository;
import scotiapay.baas_employee.services.mapper.MapperUtils;

import javax.persistence.NoResultException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class LocationServiceImpl implements LocationService {

    private final CountryRepository countryRepository;
    private final RegionRepository regionRepository;

    @Override
    public List<Country> getCountries() {
        List<CountryEntity> countryEntities = countryRepository.findAll();
        if (countryEntities.isEmpty()){
            throw new NoResultException("There are no countries in the database, consult the admin");
        }
        return MapperUtils.INSTANCE.toCountryList(countryEntities);
    }

    @Override
    public List<Region> getRegions(UUID country) {
        Optional<CountryEntity> countryEntity = countryRepository.findById(country);


        if (countryEntity.isEmpty()){
            throw new NoResultException("There are no regions in the database");
        }
        return MapperUtils.INSTANCE.regionsToRegionDTOs(new ArrayList<>(countryEntity.get().getRegionEntities()));
    }

    @Override
    public List<City> getCities(UUID country, UUID region) {

        List<CityEntity> cityEntities = new ArrayList<>(regionRepository.findById(region).get().getCities());
        if (cityEntities.isEmpty()){
            throw new NoResultException("There are no cities in the database");
        }
        return MapperUtils.INSTANCE.citiesToCityDTOs(cityEntities);
    }
}
