import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerInfo: null,
  // registerInfo: {
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phoneCountryCode: "",
  //   telephone: "",
  //   idType: "",
  //   idNumber: "",
  // },
  // additionalData: {
  //   department: "",
  //   municipality: "",
  //   direction: "",
  //   monthlyEarns: "",
  // },
  additionalData: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setRegisterInfo: (state, action) => {
      state.registerInfo = action.payload;
    },
    setAdditionalField: (state, action) => {
      state.additionalData = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { setRegisterInfo, setAdditionalField, resetForm } =
  formSlice.actions;

export default formSlice.reducer;
