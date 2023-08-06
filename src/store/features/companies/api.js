import { apiSlice } from "../../api/api-slice";

export const companiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleCompanyDetails: builder.query({
      query: (id) => ({
        url: `/hq/profile/${id}`,
        method: "GET",
        headers: {
          Authirization: `Bearer ${localStorage.getItem("hq-token")}`,
        },
      }),
    }),
  }),
});

export const { useGetSingleCompanyDetailsQuery } = companiesApiSlice;
