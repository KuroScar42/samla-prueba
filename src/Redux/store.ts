import { configureStore } from "@reduxjs/toolkit";
import formData from "./slice/formData";

export const store = configureStore({
  reducer: {
    form: formData,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["form/setAdditionalField"],
        ignoredPaths: ["form.additionalData.photo"],
      },
    }),
});
