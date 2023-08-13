import { apiSlice } from "../../api/api-slice";

export const farmersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFarmers: builder.query({
      query: (params) => ({
        // url: `/hq/all_farmer`,
        url: `/hq/farmer_search?per_page=${params?.itemsPerPage}&page=${params?.currentPage}`,
        method: "GET",
        // headers: {
        //   Authoziration: `Bearer ${localStorage.getItem("hq-token")}`,
        // },
      }),
    }),
    getSingleFarmer: builder.query({
      query: (id) => ({
        url: `/hq/farmer/profile/${id}`,
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        // },
      }),
    }),
  }),
});

export const { useGetAllFarmersQuery, useGetSingleFarmerQuery } =
  farmersApiSlice;
