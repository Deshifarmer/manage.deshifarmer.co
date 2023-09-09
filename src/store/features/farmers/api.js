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
    getSingleFarmer: builder.query({
      query: (id) => ({
        url: `/hq/farmer/profile/${id}`,
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
  }),
});

export const {
  useGetAllFarmersQuery,
  useGetSingleFarmerQuery,
  useGetAllFarmsQuery,
  useGetAllGroupsQuery,
  useGetSingleGroupQuery,
} = farmersApiSlice;
