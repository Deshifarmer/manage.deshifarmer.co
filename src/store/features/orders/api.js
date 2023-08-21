import { apiSlice } from "../../api/api-slice";

export const order_api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: `/hq/all_input_order`,
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        // },
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery } = order_api;
