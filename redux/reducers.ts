import { Employee } from '@graphql/types/employeeTypes';
import { createSlice } from '@reduxjs/toolkit';

interface EmployeesState {
  employees: Employee[];
}

const initialState: EmployeesState = {
  employees: [],
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees(state, action) {
      state.employees = action.payload;
    },
  },
});

export const { setEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
