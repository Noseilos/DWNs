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

        deleteReport: builder.mutation({
            query: (reportId) => ({
                url: `${REPORTS_URL}/${reportId}`,
                method: 'DELETE',
            })
        }),

        getReportDetails: builder.query({
            query: (reportId) => ({
                url: `${REPORTS_URL}/${reportId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        getMyReports: builder.query({
            query: () => ({
                url: `${REPORTS_URL}/myreports`,
            }),
            keepUnusedDataFor: 5,
        }),
        deleteReport: builder.mutation({
            query: (reportId) => ({
                url: `${REPORTS_URL}/${reportId}`,
                method: 'DELETE'
            })
        }),
        softDeleteReport: builder.mutation({
            query: (reportId) => ({
                url: `${REPORTS_URL}/${reportId}`,
                method: 'PATCH'
            })
        }),
        restoreReport: builder.mutation({
            query: (reportId) => ({
                url: `${REPORTS_URL}/restore/${reportId}`,
                method: 'PATCH'
            })
        }),
        
    })
});

export const {
    useCreateReportMutation,
    useGetReportsQuery,
    useUploadReportImageMutation,
    useDeleteReportMutation,
    useGetReportDetailsQuery,
    useGetMyReportsQuery,
} = reportsApiSlice;
