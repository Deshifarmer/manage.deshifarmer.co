import { apiSlice } from "../../api/api-slice";

export const farmersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFarmers: builder.query({
      query: (params) => ({
        url: `/hq/farmer_search?per_page=${params?.itemsPerPage}&page=${
          !params?.searchValue ? params?.currentPage : ""
        }&search=${params?.searchValue}`,
        method: "GET",
      }),
    }),


getFinanceRequest: builder.query({
  query: (params) => ({
    url: `/hq/finance_request?per_page=${params?.itemsPerPage}&page=${
      !params?.searchValue ? params?.currentPage : ""
    }&search=${params?.searchValue}`,
    method: "GET",
  }),
}),












    getSingleFarmer: builder.query({
      query: (id) => ({
        url: `/hq/farmer/profile/${id}`,
        method: "GET",
      }),
    }),

    getSingleFarmersource: builder.query({
      query: (id) => ({
        
        url: `/hq/farmer_source_selling/${id}`,
        method: "GET",
      }),
    }),

    getAllFarms: builder.query({
      query: (id) => ({
        url: `/hq/all_farm`,
        method: "GET",
      }),
    }),

    getAllGroups: builder.query({
      query: (id) => ({
        url: `/hq/farmer_group`,
        method: "GET",
      }),
    }),

    getSingleGroup: builder.query({
      query: (id) => ({
        url: `/hq/farmer_group/${id}`,
        method: "GET",
      }),
    }),
    getFarmerWiseFarm: builder.query({
      query: (id) => ({
        url: `/hq/farmer_farm/${id}`,
        method: "GET",
      }),
    }),
    getFarmDetails: builder.query({
      query: (id) => ({
        url: `/hq/farm/${id}`,
        method: "GET",
      }),
    }),
    getBatchDetails: builder.query({
      query: (id) => ({
        url: `/hq/batch/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllFarmersQuery,
  useGetFinanceRequestQuery,
  useGetSingleFarmersourceQuery,
  useGetSingleFarmerQuery,
  useGetAllFarmsQuery,
  useGetAllGroupsQuery,
  useGetSingleGroupQuery,
  useGetFarmerWiseFarmQuery,
  useGetFarmDetailsQuery,
  useGetBatchDetailsQuery,
} = farmersApiSlice;
