import { apiSlice } from "../../api/api-slice";

export const trackingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdvisory: builder.query({
      query: () => ({
        url: `/hq/advisory`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllAdvisoryQuery } = trackingApi;
