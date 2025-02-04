import { configureStore } from "@reduxjs/toolkit";
import formData from "./slice/formData";
import { apiUsers } from "../Services/apiUsers";

export const store = configureStore({
  reducer: {
    form: formData,
    [apiUsers.reducerPath]: apiUsers.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["form/setAdditionalField"],
        ignoredPaths: ["form.additionalData.photos"],
      },
    }).concat(apiUsers.middleware),
});
