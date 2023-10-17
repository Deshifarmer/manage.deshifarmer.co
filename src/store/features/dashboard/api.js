import { apiSlice } from "../../api/api-slice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardRadialChart: builder.query({
      query: () => ({
        url: `/hq/dashboard/all_member`,
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        // },
      }),
      providesTags: ["radialChart"],
    }),
    getLocationWiseFarmer: builder.query({
      query: () => ({
        url: `/hq/dashboard/location_wise_farmer?location=district`,
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        // },
      }),
      providesTags: ["radialChart"],
    }),
    getCompanies: builder.query({
      query: () => ({
        url: `/all_company`,
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        // },
      }),
    }),
    getMaleFemale: builder.query({
      query: () => ({
        url: `/hq/dashboard/male_female?location=district`,
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        // },
      }),
    }),
    getMapDetails: builder.query({
      query: () => ({
        url: `/hq/dashboard/map?location=district`,
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        // },
      }),
    }),
    getDailySalesChartData: builder.query({
      query: () => ({
        url: `/hq/dashboard/ssstat`,
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        // },
      }),
    }),
    getMonthlySalesChartData: builder.query({
      query: () => ({
        url: `/hq/dashboard/ssstatm`,
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        // },
      }),
    }),
  }),
});

export const {
  useGetDashboardRadialChartQuery,
  useGetCompaniesQuery,
  useGetLocationWiseFarmerQuery,
  useGetMaleFemaleQuery,
  useGetMapDetailsQuery,
  useGetDailySalesChartDataQuery,
  useGetMonthlySalesChartDataQuery,
} = dashboardApiSlice;
