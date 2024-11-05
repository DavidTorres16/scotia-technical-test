import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee, EmployeeDetail } from '../types/employeeInterfaces';

interface EmployeeState {
  employees: Employee[];
  selectedEmployee: EmployeeDetail | null;
}

const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
    },
    selectEmployee: (state, action: PayloadAction<EmployeeDetail | null>) => {
      state.selectedEmployee = action.payload;
    },
  },
});

export const { setEmployees, selectEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
