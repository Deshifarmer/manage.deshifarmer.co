import { apiSlice } from "../../api/api-slice";

export const agriOutputsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSources: builder.query({
      query: (params) => ({
        url: `/hq/sourcing?per_page=${params?.itemsPerPage}&page=${params?.currentPage}`,
        method: "GET",
      }),
    }),
    getAllSales: builder.query({
      query: (params) => ({
        url: `/hq/source_selling?per_page=${params?.itemsPerPage}&page=${params?.currentPage}`,
        method: "GET",
      }),
    }),
    getSalesInvoiceDetails: builder.query({
      query: (id) => ({
        url: `/hq/source_selling/${id}`,
        method: "GET",
      }),
    }),
    getSalesCustomer: builder.query({
      query: (id) => ({
        url: `/hq/output_customer`,
        method: "GET",
      }),
    }),
    getDayWhiseSourceSelling: builder.query({
      query: (id) => ({
        url: `/hq/day_wise_source_selling`,
        method: "GET",
      }),
    }),
    getSingleDayWhiseSourceSelling: builder.query({
      query: (params) => ({
        url: `/hq/source_selling?date=${params?.id}&per_page=${params?.itemsPerPage}&page=${params?.currentPage}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllSourcesQuery,
  useGetAllSalesQuery,
  useGetSalesInvoiceDetailsQuery,
  useGetSalesCustomerQuery,
  useGetDayWhiseSourceSellingQuery,
  useGetSingleDayWhiseSourceSellingQuery,
} = agriOutputsApiSlice;
