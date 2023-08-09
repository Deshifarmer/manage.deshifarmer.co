import { apiSlice } from "../../api/api-slice";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransaction: builder.query({
      query: () => ({
        url: `/hq/all_transaction`,
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        // },
      }),
    }),
    getAllCashInRequest: builder.query({
      query: () => ({
        url: `/hq/distributor/all_cash_in_request`,
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        // },
      }),
    }),
    getAllCashOutRequest: builder.query({
      query: () => ({
        url: `/hq/all_cash_out_request`,
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        // },
      }),
    }),
  }),
});

export const {
  useGetAllTransactionQuery,
  useGetAllCashInRequestQuery,
  useGetAllCashOutRequestQuery,
} = paymentApiSlice;
