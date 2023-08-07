import { apiSlice } from "../../api/api-slice";

export const microEntrepreneursApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMicroEntrepreneurs: builder.query({
      query: () => ({
        url: `/hq/all_me`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        },
      }),
    }),
    getSingleMicroEntrepreneur: builder.query({
      query: (id) => ({
        url: `/hq/profile/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        },
      }),
    }),
    getSingleMicroEntrepreneurOrders: builder.query({
      query: (id) => ({
        url: `/hq/me/${id}/order`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        },
      }),
    }),
    getAllUnassignedMicroEntrepreneurs: builder.query({
      query: () => ({
        url: "/hq/unassigned_me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAllMicroEntrepreneursQuery,
  useGetSingleMicroEntrepreneurQuery,
  useGetSingleMicroEntrepreneurOrdersQuery,
  useGetAllUnassignedMicroEntrepreneursQuery,
} = microEntrepreneursApiSlice;
