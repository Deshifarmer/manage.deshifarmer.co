import { apiSlice } from "../../api/api-slice";

export const agriOutputsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSources: builder.query({
      query: () => ({
        url: `/hq/sourcing`,
        method: "GET",
      }),
    }),
    getAllSales: builder.query({
      query: () => ({
        url: `/hq/source_selling`,
        method: "GET",
      }),
    }),
    getSalesInvoiceDetails: builder.query({
      query: (id) => ({
        url: `/hq/source_selling/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllSourcesQuery,
  useGetAllSalesQuery,
  useGetSalesInvoiceDetailsQuery,
} = agriOutputsApiSlice;
