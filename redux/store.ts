import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './reducers';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
