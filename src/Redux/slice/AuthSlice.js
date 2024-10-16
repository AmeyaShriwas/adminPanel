import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const ApiUrl = 'https://notesapi.ameyashriwas.in'; // Correct variable name
// console.log('process', process.env.REACT_APP_BASE_URL)

// Thunk for login
export const loginUser = createAsyncThunk(
  '/login',
  async(userData, {rejectWithValue}) => {
    console.log('process', process.env)
    
    try {
      console.log('api url', ApiUrl)
      const response = await axios.post(`${ApiUrl}/login`, userData);
      if (response.status !== 200) {
        throw new Error('Failed to login');
      }
      const data = await response.data;
      console.log('login data', response.data)
      return { message: data.message, token: data.token, user: data.user, email: data.email, number: data.number };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for signup
export const signupUser = createAsyncThunk(
  '/signup',
  async(userData, {rejectWithValue}) => {
    console.log('userdata', userData)
    try {
      const response = await axios.post(`${ApiUrl}/signup`, userData);
      console.log('response api get', response)
      if (response.status !== 201) {
        throw new Error('Failed to register');
      }
      const data = await response.data;
      return { message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyUser = createAsyncThunk(
    '/verify-otp',
    async(userData, {rejectWithValue}) => {
      console.log('userdata', userData)
      try {
        const response = await axios.post(`${ApiUrl}/verify-otp`, userData);
        console.log('response', response)
        if (response.status !== 200) {
          throw new Error('Failed to verify user');
        }
        const data = await response.data;
        return { message: response.data.message };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const forgotPassword = createAsyncThunk(
    '/forgot-password',
    async(userData, {rejectWithValue}) => {
      console.log('userdata', userData)
     
      try {
        const response = await axios.post(`${ApiUrl}/forgot-password`, {email: userData});
        console.log('response', response)
        if (response.status !== 200) {
          throw new Error('Failed to verify user');
        }
        const data = await response.data;
        return { message: response.data.message };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


  export const resetPasswordFun = createAsyncThunk(
    '/reset-password',
    async(userData, {rejectWithValue}) => {
      console.log('userdata', userData)
     
      try {
        const response = await axios.post(`${ApiUrl}/reset-password`, userData);
        console.log('response', response)
        if (response.status !== 200) {
          throw new Error('Failed to verify user');
        }
        const data = await response.data;
        return { message: response.data.message };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const initialState = {
  isAuthenticated: false,
  user: null,
  email: null,
  number: null,
  token: null,
  loading: false,
  error: null,
  message: null,  // For signup success message
};

const authSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.email= action.payload.email;
      state.number = action.payload.number
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.email = null;
      state.number = null
    },
  },
  extraReducers: (builder) => {
    // Handle login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.number  = action.payload.number
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle signup
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;  // Set signup success message
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;  // Success message for OTP verification
        // state.isAuthenticated = true; // Set isAuthenticated to true after verification
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;  // Success message for OTP verification
        // state.isAuthenticated = true; // Set isAuthenticated to true after verification
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      .addCase(resetPasswordFun.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPasswordFun.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;  // Success message for OTP verification
        // state.isAuthenticated = true; // Set isAuthenticated to true after verification
      })
      .addCase(resetPasswordFun.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
