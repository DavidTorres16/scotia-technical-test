package scotiapay.baas_employee.services;

import com.bank.scotiapay.openapi.model.City;
import com.bank.scotiapay.openapi.model.Country;
import com.bank.scotiapay.openapi.model.Region;

import java.util.List;
import java.util.UUID;

public interface LocationService {
    List<Country> getCountries();
    List<Region> getRegions(UUID country);
    List<City> getCities(UUID country, UUID region);
}
