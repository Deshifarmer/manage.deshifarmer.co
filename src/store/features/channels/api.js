import { apiSlice } from "../../api/api-slice";

export const channelsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllChannels: builder.query({
      query: () => ({
        url: `/hq/all_channel`,
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

export const { useGetAllChannelsQuery } = channelsApiSlice;
