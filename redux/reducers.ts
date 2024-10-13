import { Employee } from '@graphql/types/employeeTypes';
import { createSlice } from '@reduxjs/toolkit';
import { fetchEmployees, deleteEmployee, fetchEmployeeById, createEmployee, updateEmployee } from '@redux/thunk';

interface EmployeesState {
  employees: Employee[];
  employee: Employee | null;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  loadingEmployees: boolean;
  loadingEmployeeById: boolean;
  loadingDelete: boolean;
  error: string | null;
}

const initialState: EmployeesState = {
  employees: [],
  employee: null,
  loadingCreate: false,
  loadingUpdate: false,
  loadingEmployees: false,
  loadingEmployeeById: false,
  loadingDelete: false,
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
        state.loadingEmployees = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loadingEmployees = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loadingEmployees = false;
        state.error = action.error.message || 'Failed to fetch employees';
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loadingDelete = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loadingDelete = false;
        state.employees = state.employees.filter((employee) => employee.id !== action.payload.id);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loadingDelete = false;
        state.error = action.error.message || 'Failed to delete employee';
      })
      .addCase(fetchEmployeeById.pending, (state) => {
        state.loadingEmployeeById = true;
        state.error = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.loadingEmployeeById = false;
        state.employee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loadingEmployeeById = false;
        state.error = action.error.message || 'Failed to fetch employee';
      })
      .addCase(createEmployee.pending, (state) => {
        state.loadingCreate = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loadingCreate = false;
        state.employees.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loadingCreate = false;
        state.error = action.error.message || 'Failed to create employee';
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loadingUpdate = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loadingUpdate = false;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.error = action.error.message || 'Failed to update employee';
      });
  },
});

export const { setEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
