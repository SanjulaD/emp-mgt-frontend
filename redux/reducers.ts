import { Employee } from '@graphql/types/employeeTypes';
import { createSlice } from '@reduxjs/toolkit';
import { fetchEmployees, deleteEmployee, fetchEmployeeById, createEmployee } from '@redux/thunk';

interface EmployeesState {
  employees: Employee[];
  employee: Employee | null;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  employees: [],
  employee: null,
  loading: true,
  error: null,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees(state, action) {
      state.employees = action.payload;
    },
    setEmployee(state, action) {
      state.employee = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employees';
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter((employee) => employee.id !== action.payload.id);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete employee';
      })
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employee';
      })
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create employee';
      });
  },
});

export const { setEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
