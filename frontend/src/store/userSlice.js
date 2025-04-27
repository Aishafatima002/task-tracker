import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.userInfo = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

export default userSlice.reducer;
