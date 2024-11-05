import api from './api';

const API_BASE_URL = '/api/v1/countries';

export const getCountries = () => {
    return api.get(`${API_BASE_URL}`);
};

export const getRegions = (countryId: string) => {
    return api.get(`${API_BASE_URL}/${countryId}/regions`);
};

export const getCities = (countryId: string, regionId: string) => {
    return api.get(`${API_BASE_URL}/${countryId}/regions/${regionId}/cities`);
};