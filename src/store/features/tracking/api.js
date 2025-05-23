import { apiSlice } from "../../api/api-slice";

export const trackingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdvisory: builder.query({
      query: () => ({
        url: `/hq/advisory`,
        method: "GET",
      }),
    }),
    getAllAttendance: builder.query({
      query: () => ({
        url: `/hq/attendance`,
        method: "GET",
      }),
    }),
    getAllBatch: builder.query({
      query: () => ({
        url: `/hq/batch`,
        method: "GET",
      }),
    }),
    getSignleBatch: builder.query({
      query: (id) => ({
        url: `/hq/batch/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllAdvisoryQuery,
  useGetAllAttendanceQuery,
  useGetAllBatchQuery,
  useGetSignleBatchQuery,
} = trackingApi;
