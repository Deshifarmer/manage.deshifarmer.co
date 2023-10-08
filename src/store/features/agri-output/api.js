import { apiSlice } from "../../api/api-slice";

export const agriOutputsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSources: builder.query({
      query: () => ({
        url: `/hq/sourcing`,
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        // },
      }),
    }),
  }),
});

export const { useGetAllSourcesQuery } = agriOutputsApiSlice;
