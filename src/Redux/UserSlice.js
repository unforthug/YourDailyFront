import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk(
  "user/register",
  async ({ formValue, toast, navigate }, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.post(
        "https://yourdailybackend.onrender.com/user/signup",
        formValue
      );
      toast.success("Registred Successfully");
      navigate("/user/signin");
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ formValue, toast, navigate }, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.post(
        "https://yourdailybackend.onrender.com/user/signin",
        formValue
      );
      localStorage.setItem("userInfos", JSON.stringify(data));
      navigate("/news");
      return data;
    } catch (error) {
      rejectWithValue(error?.response?.data);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (payload, { rejectWithValue }) => {
    try {
      await localStorage.removeItem("userInfos");
      window.location.reload();
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ editUser, id, navigate, toast }, { rejectWithValue, getState }) => {
    const auth = getState()?.auth;
    const { userLoggedIn } = auth;
    const config = {
      headers: { Authorization: `Bearer ${userLoggedIn?.token}` },
    };
    try {
      const { data } = await axios.put(
        `https://yourdailybackend.onrender.com/user/profile/${id}`,
        editUser,
        config
      );
      navigate("/");
      toast.success("Logout and login again to see the update");

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userStored = localStorage.getItem("userInfos")
  ? JSON.parse(localStorage.getItem("userInfos"))
  : null;

const userSlice = createSlice({
  name: "user",
  initialState: { userLoggedIn: userStored },
  extraReducers: {
    [register.pending]: (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serErr = undefined;
    },
    [register.fulfilled]: (state, action) => {
      state.userRegistred = action?.payload;
      state.appErr = undefined;
      state.serErr = undefined;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serErr = action?.error?.message;
    },

    //////////////////////////////////////////

    [login.pending]: (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serErr = undefined;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.userLogged = action?.payload;
      window.location.reload();
      state.appErr = undefined;
      state.serErr = undefined;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serErr = action?.error?.message;
    },
    ////////////////////////////////////////////////////

    [logout.pending]: (state, action) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.loading = false;
      state.userLogged = null;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [logout.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },

    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.updatedUser = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    },
  },
});

export default userSlice.reducer;
export const { AuthHandler } = userSlice.actions;
