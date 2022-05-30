import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../../utils/helper";
import { performanceManagementConfigUrl } from "./../../../utils/helper";

export const getPerformanceConfigQuery = createApi({
  reducerPath: "getCodeConfigQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: `${performanceManagementConfigUrl}/`,
  }),
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => `GetAllCategoryTypes`,
    }),
    getOrganizationalGoals: build.query({
      query: () => `GetAllOrganizationalGoals`,
    }),
    getTeamGoals: build.query({
      query: () => `teamGoals`,
    }),
    getIndividualKpis: build.query({
      query: () => `individualKpis`,
    }),
    getRateTypeMetrics: build.query({
      query: () => `GetRateTypeMetrics`,
    }),
    getTargetSources: build.query({
      query: () => `GetTargetSources`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetIndividualKpisQuery,
  useGetOrganizationalGoalsQuery,
  useGetTeamGoalsQuery,
  useGetRateTypeMetricsQuery,
  useGetTargetSourcesQuery,
} = getPerformanceConfigQuery;
