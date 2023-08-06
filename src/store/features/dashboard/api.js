import { apiSlice } from "../../api/api-slice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardRadialChart: builder.query({
      query: () => ({
        url: `/hq/dashboard/all_member`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("hq-token")}`,
        },
      }),
    }),
    getCompanies: builder.query({
        query: () => {
            url
        }
    })
  }),
});

export const { useGetDashboardRadialChartQuery } = dashboardApiSlice;
