import { apiSlice } from './apiSlice'
import { REPORTS_URL, UPLOAD_URL } from '../constants'

export const reportsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReports: builder.query({
            query: () => ({
                url: REPORTS_URL
            }),
            providesTags: ['Reports'],
            keepUnusedDataFor: 5,
        }),
        createReport: builder.mutation({
            query: (data) => ({
                url: `${REPORTS_URL}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Reports'],
        }),
        uploadReportImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}/reports`,
                method: 'POST',
                body: data,
            })
        }),
        getReportDetails: builder.query({
            query: (reportId) => ({
                url: `${REPORTS_URL}/${reportId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        
    })
});

export const {
    useCreateReportMutation,
    useGetReportsQuery,
    useUploadReportImageMutation,
    useGetReportDetailsQuery
} = reportsApiSlice;