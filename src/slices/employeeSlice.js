import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getEmployees = createAsyncThunk(
  'employee/getEmployees',
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        'http://localhost:5000/api/employees',
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred'
      );
    }
  }
);

export const createEmployee = createAsyncThunk(
  'employee/createEmployee',
  async (employeeData, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        'http://localhost:5000/api/employees',
        employeeData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred'
      );
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async ({ id, employeeData }, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/employees/${id}`,
        employeeData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred'
      );
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(
        `http://localhost:5000/api/employees/${id}`,
        config
      );
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred'
      );
    }
  }
);

export const searchEmployees = createAsyncThunk(
  'employee/searchEmployees',
  async (query, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/employees/search/${query}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred'
      );
    }
  }
);

const initialState = {
  employees: [],
  loading: false,
  error: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.map((employee) =>
          employee._id === action.payload._id ? action.payload : employee
        );
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(
          (employee) => employee._id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(searchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer; 