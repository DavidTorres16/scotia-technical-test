import axios from 'axios';

const API_BASE_URL = '/api/v1/employee';

export const createEmployee = (employeeData: any) => {
  return axios.post(API_BASE_URL, employeeData);
};

export const getEmployees = () => {
  return axios.get(`${API_BASE_URL}s`);
};

export const getEmployeeById = (employeeId: number) => {
  return axios.get(`${API_BASE_URL}/${employeeId}`);
};

export const updateEmployee = (employeeId: number, updatedData: any) => {
  return axios.put(`${API_BASE_URL}/${employeeId}`, updatedData);
};