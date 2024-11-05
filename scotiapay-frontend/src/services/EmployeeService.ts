import api from './api';

const API_BASE_URL = '/api/v1/employee';

export const createEmployee = (employeeData: any) => {
  return api.post(API_BASE_URL, employeeData);
};

export const getEmployees = () => {
  return api.get(`${API_BASE_URL}s`);
};

export const getEmployeeById = (employeeId: number) => {
  return api.get(`${API_BASE_URL}/${employeeId}`);
};

export const updateEmployee = (employeeId: number, updatedData: any) => {
  return api.put(`${API_BASE_URL}/${employeeId}`, updatedData);
};