package scotiapay.baas_employee.services.mapper;

import com.bank.scotiapay.openapi.model.City;
import com.bank.scotiapay.openapi.model.Country;
import com.bank.scotiapay.openapi.model.EmployeeList;
import com.bank.scotiapay.openapi.model.Region;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import scotiapay.baas_employee.entities.CityEntity;
import scotiapay.baas_employee.entities.CountryEntity;
import scotiapay.baas_employee.entities.EmployeeEntity;
import scotiapay.baas_employee.entities.RegionEntity;

import java.util.List;

@Mapper
public interface MapperUtils {
    MapperUtils INSTANCE = Mappers.getMapper(MapperUtils.class);


    List<Country> toCountryList(List<CountryEntity> countryEntities);

    List<Region> regionsToRegionDTOs(List<RegionEntity> regions);

    List<City> citiesToCityDTOs(List<CityEntity> regions);

}