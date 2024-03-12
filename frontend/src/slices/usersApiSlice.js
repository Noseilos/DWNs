import { USERS_URL, UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        uploadUserImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}/user`,
                method: 'POST',
                body: data,
            })
        }),
        updateUserImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}/user`, 
                method: 'PUT', 
                body: data,
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE'
            })
        }),
        softDeleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'PATCH'
            })
        }),
        restoreUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/restore/${userId}`,
                method: 'PATCH'
            })
        }),
        getUserDetails: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User']
        })
    }),
});

export const { 
    useLoginMutation, 
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useSoftDeleteUserMutation,
    useRestoreUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation,
    useUploadUserImageMutation,
    useUpdateUserImageMutation
} = usersApiSlice;