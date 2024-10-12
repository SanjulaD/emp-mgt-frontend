import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './reducers';

const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});

export default store;
