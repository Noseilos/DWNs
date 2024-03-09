import { apiSlice } from './apiSlice'
import { REPORTS_URL } from '../constants'

export const reportsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createReport: builder.mutation({
            query: (report) => ({
                url: `${REPORTS_URL}`,
                method: 'POST',
                body: report,
            }),
            invalidatesTags: ['Reports'],
        }),
        
    })
});

export const {
    useCreateReportMutation
} = reportsApiSlice;