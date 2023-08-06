import { apiSlice } from "../../api/api-slice";

export const distributorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDistributors: builder.query({
      query: (id) => ({
        url: `/hq/all_distributor`,
        method: "GET",
        headers: {
          Authirization: `Bearer ${localStorage.getItem("hq-token")}`,
        },
      }),
    }),
    getSingleDistributorDetails: builder.query({
      query: (id) => ({
        url: `/hq/profile/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        },
      }),
    }),
    getSingleDistributorOrders: builder.query({
      query: (id) => ({
        url: `/hq/distributor/${id}/order`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAllDistributorsQuery,
  useGetSingleDistributorDetailsQuery,
  useGetSingleDistributorOrdersQuery,
} = distributorApiSlice;
