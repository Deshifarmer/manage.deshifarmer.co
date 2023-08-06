import { apiSlice } from "../../api/api-slice";

export const farmersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFarmers: builder.query({
      query: () => ({
        url: `/hq/all_farmer`,
        method: "GET",
        headers: {
          Authoziration: `Bearer ${localStorage.getItem("hq-token")}`,
        },
      }),
    }),
  }),
});

export const { useGetAllFarmersQuery } = farmersApiSlice;
