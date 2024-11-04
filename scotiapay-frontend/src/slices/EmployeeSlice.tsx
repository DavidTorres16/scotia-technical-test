import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../types';

// Initial state for the slice
interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
}

const initialState: EmployeeState = {
  employees: [
    {
        id: 1,
        firstName: 'John',
        middleName: 'A.',
        lastName: 'Doe',
        positionTitle: 'Software Engineer',
        dateArrival: '2022-05-01',
        status: 'Active',
        locationCity: 'New York',
        address: '123 Main St',
        dateBirth: '1990-08-15',
        telephone: '123-456-7890',
        hireDate: '2021-06-01',
        email: 'john.doe@example.com',
        salary: 70000,
        timeInPosition: '2 years',
    },
    {
        id: 2,
        firstName: 'John',
        middleName: 'A.',
        lastName: 'Andres',
        positionTitle: 'Software Engineer',
        dateArrival: '2022-05-01',
        status: 'Active',
        locationCity: 'New York',
        address: '123 Main St',
        dateBirth: '1990-08-15',
        telephone: '123-456-7890',
        hireDate: '2021-06-01',
        email: 'john.doe@example.com',
        salary: 70000,
        timeInPosition: '2 years',
    },
    {
        id: 3,
        firstName: 'Juan',
        middleName: 'A.',
        lastName: 'David',
        positionTitle: 'Software Engineer',
        dateArrival: '2022-05-01',
        status: 'Active',
        locationCity: 'New York',
        address: '123 Main St',
        dateBirth: '1990-08-15',
        telephone: '123-456-7890',
        hireDate: '2021-06-01',
        email: 'john.doe@example.com',
        salary: 70000,
        timeInPosition: '2 years',
    },
  ],
  selectedEmployee: null,
};

// Slice para manejar el estado de empleados
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
