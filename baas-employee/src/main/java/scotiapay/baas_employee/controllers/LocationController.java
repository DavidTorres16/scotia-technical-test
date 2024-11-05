package scotiapay.baas_employee.controllers;

import com.bank.scotiapay.openapi.CountriesApi;
import com.bank.scotiapay.openapi.model.City;
import com.bank.scotiapay.openapi.model.Country;
import com.bank.scotiapay.openapi.model.Region;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import scotiapay.baas_employee.services.LocationService;
import scotiapay.baas_employee.utils.ConstantPath;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping(ConstantPath.BASE_PATH_V1)
@Slf4j
public class LocationController implements CountriesApi {

    private final LocationService locationService;
    @Override
    public ResponseEntity<List<Country>> getAllCountries() {
        log.info(String.format("Entry controller LocationController in method getAllCountries"));
        return ResponseEntity.ok(locationService.getCountries());
    }

    @Override
    public ResponseEntity<List<City>> getCitiesByRegionAndCountryId(UUID countryId, UUID regionId) {
        log.info(String.format("Entry controller LocationController in method getCitiesByRegionAndCountryId"));
        return ResponseEntity.ok(locationService.getCities(countryId, regionId));
    }

    @Override
    public ResponseEntity<List<Region>> getRegionsByCountryId(UUID countryId) {
        log.info(String.format("Entry controller LocationController in method getRegionsByCountryId"));

        return ResponseEntity.ok(locationService.getRegions(countryId));
    }
}
