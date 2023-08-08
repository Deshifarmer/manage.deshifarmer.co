import { apiSlice } from "../../api/api-slice";

export const agriInputApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategory: builder.query({
      query: () => ({
        url: `/all_category`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        },
      }),
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: `/hq/all_product`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        },
      }),
    }),
  }),
});

export const { useGetAllCategoryQuery, useGetAllProductsQuery } =
  agriInputApiSlice;
