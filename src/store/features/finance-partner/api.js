import { apiSlice } from "../../api/api-slice";

export const financepartnerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllfinancepartner: builder.query({
      query: () => ({
        url: `/hq/all_fp`,
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        // },
      }),
    }),
    // getSingleMicroEntrepreneur: builder.query({
    //   query: (id) => ({
    //     url: `/hq/profile/${id}`,
    //     method: "GET",
    //     // headers: {
    //     //   Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
    //     // },
    //   }),
    // }),
    // getSingleMicroEntrepreneurOrders: builder.query({
    //   query: (id) => ({
    //     url: `/hq/me/${id}/order`,
    //     method: "GET",
    //     // headers: {
    //     //   // Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
    //     // },
    //   }),
    // }),
    // getAllUnassignedMicroEntrepreneurs: builder.query({
    //   query: () => ({
    //     url: "/hq/unassigned_me",
    //     method: "GET",
    //     // headers: {
    //     //   Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
    //     // },
    //   }),
    // }),
    // assignMicroEntrepreneur: builder.mutation({
    //   query: (data) => ({
    //     url: `/hq/assign_me`,
    //     method: "POST",
    //     // headers: {
    //     //   Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
    //     // },
    //     data,
    //   }),
    // }),
  }),
});

export const {
 useGetAllfinancepartnerQuery,
//   useGetSingleMicroEntrepreneurQuery,
//   useGetSingleMicroEntrepreneurOrdersQuery,
//   useGetAllUnassignedMicroEntrepreneursQuery,
//   useAssignMicroEntrepreneurMutation,
} = financepartnerApiSlice;
