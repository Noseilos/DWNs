import { apiSlice } from './apiSlice'
import { LOCATIONS_URL, UPLOAD_URL } from '../constants'

export const locationsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        getLocations: builder.query({
            query: () => ({
                url: LOCATIONS_URL,
            }),
            providesTags: ['Location'],
            keepUnusedDataFor: 5,
        }),

        createLocation: builder.mutation({
            query: (data) => ({
                url: `${LOCATIONS_URL}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Location'],
        }),
        
        uploadLocationImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}/locations`,
                method: 'POST',
                body: data,
            })
        }),
        
        deleteLocation: builder.mutation({
            query: (locationId) => ({
                url: `${LOCATIONS_URL}/${locationId}`,
                method: 'DELETE',
            })
        }),

        getLocationDetails: builder.query({
            query: (locId) => ({
                url: `${LOCATIONS_URL}/${locId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        
        updateLocation: builder.mutation({
            query: (data) => ({
                url: `${LOCATIONS_URL}/${data.locationId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Location'],
        }),

    })
});

export const {
    useCreateLocationMutation,
    useUploadLocationImageMutation,
    useGetLocationsQuery,
    useDeleteLocationMutation,
    useGetLocationDetailsQuery,
    useUpdateLocationMutation,
} = locationsApiSlice;