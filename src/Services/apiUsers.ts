import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl = "https://api-rfbgmdbvlq-uc.a.run.app/";
const baseUrl = process.env.REACT_APP_API_URL;

export interface IUser {
  id: string;
  selfieImage: string;
  documentImageUrl: Array<string>;
  department: string;
  email: string;
  idNumber: string;
  idType: string;
  phoneCountryCode: string;
  municipality: string;
  direction: string;
  firstName: string;
  telephone: string;
  lastName: string;
  monthlyEarns: string;
}

export const apiUsers = createApi({
  reducerPath: "apiUsers",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = process.env.REACT_APP_JWT_TOKEN;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => "getAllUsers",
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "registerUser",
        method: "post",
        body: newUser,
      }),
    }),
    uploadImage: builder.mutation({
      query: ({ id, file, type }) => {
        return {
          url: `/imageUpload/${id}/${type}`,
          method: "POST",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        };
      },
    }),
    selfieUploadImage: builder.mutation({
      query: ({ id, file }) => {
        return {
          url: `/selfieUpload/${id}`,
          method: "POST",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        };
      },
    }),
    detectFace: builder.mutation({
      query: (imageFile) => {
        return {
          url: "detectFace",
          method: "POST",
          body: imageFile,
          headers: {
            "Content-type": imageFile.type,
          },
        };
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUploadImageMutation,
  useSelfieUploadImageMutation,
  useDetectFaceMutation,
} = apiUsers;
