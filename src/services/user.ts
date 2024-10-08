import { createApi } from "@reduxjs/toolkit/query/react";
import { LoginResponse, RegisterUser } from "interfaces/user";
import { createBaseQuery } from "utils/baseQuery";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: createBaseQuery("Accounts"),
    tagTypes: ["User"],

    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, { email: string; password: string }>({
            query: (data) => {
                const formData = new FormData();
                formData.append("email", data.email);
                formData.append("password", data.password);

                return {
                    url: "Login",
                    method: "POST",
                    body: formData,
                };
            },
        }),

        register: builder.mutation<LoginResponse, RegisterUser>({
            query: (data) => {
                const formData = new FormData();
                formData.append("Name", data.name);
                formData.append("Username", data.username);
                if (data.image) formData.append("Image", data.image);
                formData.append("Email", data.email);
                formData.append("UserName", data.username);
                formData.append("Password", data.password);
                formData.append("DateOfBirth", data.birthDate);

                return {
                    url: "Registration",
                    method: "POST",
                    body: formData,
                };
            },
        }),

        googleLogin: builder.mutation<LoginResponse, { credential: string }>({
            query: (data) => {
                const formData = new FormData();
                formData.append("credential", data.credential);

                return {
                    url: "GoogleSignIn",
                    method: "POST",
                    body: formData,
                };
            },
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useGoogleLoginMutation } = userApi;