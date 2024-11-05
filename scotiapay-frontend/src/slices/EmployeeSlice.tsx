import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../types/employeeInterfaces';

interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
}

const initialState: EmployeeState = {
  employees: [
    {
        id: 1,
        firstName: 'Alexander',
        middleName: 'A.',
        lastName: 'Grajales',
        dateArrival: '2022-05-01',
        status: 'Active',
        locationCity: 'New York',
        address: '123 Main St',
        dateBirth: '1990-08-15',
        telephone: '123-456-7890',
        position: {
            id: 'hhy123123',
            title: 'Software Engineer',
            hireDate: '2021-06-01',
            email: 'john.doe@example.com',
            salary: 70000,
            timeInPosition: '2 years',
        }
    },
    {
        id: 2,
        firstName: 'Julian',
        middleName: 'A.',
        lastName: 'Andres',
        dateArrival: '2022-05-01',
        status: 'Active',
        locationCity: 'New York',
        address: '123 Main St',
        dateBirth: '1990-08-15',
        telephone: '123-456-7890',
        position: {
            id: 'hhy123123',
            title: 'Software Engineer',
            hireDate: '2021-06-01',
            email: 'john.doe@example.com',
            salary: 70000,
            timeInPosition: '2 years',
        }
    },
    {
        id: 3,
        firstName: 'David',
        middleName: 'A.',
        lastName: 'Mauricio',
        dateArrival: '2022-05-01',
        status: 'Active',
        locationCity: 'New York',
        address: '123 Main St',
        dateBirth: '1990-08-15',
        telephone: '123-456-7890',
        position: {
            id: 'hhy123123',
            title: 'Software Engineer',
            hireDate: '2021-06-01',
            email: 'john.doe@example.com',
            salary: 70000,
            timeInPosition: '2 years',
        }
    },
  ],
  selectedEmployee: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
    },
    selectEmployee: (state, action: PayloadAction<Employee | null>) => {
      state.selectedEmployee = action.payload;
    },
  },
});

export const { setEmployees, selectEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
