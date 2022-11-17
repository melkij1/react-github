import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFollowers, IRepos, IUsers, UserItem } from "./index.types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com",
  }),
  endpoints: build => ({
    searchUsers: build.query<IUsers, { search: string; page: number }>({
      query: (payload: { search: string; page: number }) => {
        const { search, page } = payload;
        return {
          url: `search/users`,
          params: {
            q: search,
            per_page: 42,
            page,
          },
        };
      },
    }),
    getUser: build.query<UserItem, string>({
      query: (id: string) => {
        return {
          url: `/users/${id}`,
        };
      },
    }),
    getUserRepos: build.query<IRepos[], string>({
      query: (id: string) => {
        return {
          url: `/users/${id}/repos`,
          params: {
            per_page: 8,
            sort: "pushed",
          },
        };
      },
    }),
    getUserFollowers: build.query<IFollowers[], string>({
      query: (id: string) => {
        return {
          url: `/users/${id}/followers`,
          params: {
            per_page: 8,
          },
        };
      },
    }),
  }),
});

export const {
  useSearchUsersQuery,
  useGetUserQuery,
  useGetUserReposQuery,
  useGetUserFollowersQuery,
} = api;
