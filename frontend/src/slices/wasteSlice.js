import { apiSlice } from './apiSlice'
import { WASTES_URL, UPLOAD_URL } from '../constants'

export const wastesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        getWastes: builder.query({
            query: () => ({
                url: WASTES_URL,
            }),
            providesTags: ['Waste'],
            keepUnusedDataFor: 5,
        }),

        createWaste: builder.mutation({
            query: (data) => ({
                url: `${WASTES_URL}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Waste'],
        }),
        
        uploadWasteImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}/wastes`,
                method: 'POST',
                body: data,
            })
        }),
        
        deleteWaste: builder.mutation({
            query: (wasteId) => ({
                url: `${WASTES_URL}/${wasteId}`,
                method: 'DELETE',
            })
        }),

        getWasteDetails: builder.query({
            query: (wasId) => ({
                url: `${WASTES_URL}/${wasId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        
        updateWaste: builder.mutation({
            query: (data) => ({
                url: `${WASTES_URL}/${data.wasteId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Waste'],
        }),

    })
});

export const {
    useCreateWasteMutation,
    useUploadWasteImageMutation,
    useGetWastesQuery,
    useDeleteWasteMutation,
    useGetWasteDetailsQuery,
    useUpdateWasteMutation,
} = wastesApiSlice;