import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  address: string;
  email: string;
  phone: string;
}

const initialState: UserState = JSON.parse(localStorage.getItem("userData") || "{}");

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserData: (_state, action: PayloadAction<UserState>) => {
      localStorage.setItem("userData", JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { saveUserData } = userSlice.actions;
export default userSlice.reducer;
