import { apiSlice } from './apiSlice'
import { REPORTS_URL } from '../constants'

export const reportsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createReport: builder.mutation({
            query: (report) => ({
                url: REPORTS_URL,
                method: 'POST',
                body: { ...report },
            })
        }),
        // getReportDetails: builder.query({
        //     query: (reportId) => ({
        //         url: `${REPORTS_URL}/${reportId}`,
        //     }),
        //     keepUnusedDataFor: 5,
        // }),
        // payReport: builder.mutation({
        //     query: ({reportId, details}) => ({
        //         url: `${ORDERS_URL}/${reportId}/pay`,
        //         method: 'PUT',
        //         body: details,
        //     })
        // }),
        // getPayPalClientId: builder.query({
        //     query: () => ({
        //         url: PAYPAL_URL,
        //     }),
        //     keepUnusedDataFor: 5,
        // }),
        // getMyReports: builder.query({
        //     query: () => ({
        //         url: `${ORDERS_URL}/myreports`
        //     }),
        //     keepUnusedDataFor: 5,
        // }),
        // getReports: builder.query({
        //     query: () => ({
        //         url: ORDERS_URL,
        //     }),
        //     keepUnusedDataFor: 5,
        // }),
        // deliverReport: builder.mutation({
        //     query: (reportId) => ({
        //         url: `${ORDERS_URL}/${reportId}/delivered`,
        //         method: 'PUT'
        //     })
        // })
    })
});

export const {
    useCreateReportMutation
} = reportsApiSlice;