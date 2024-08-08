import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CategoryApi = createApi({
    reducerPath: 'CategoryApi',
    tagTypes: ['Category'],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://northwind.vercel.app/api' }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            providesTags: ['Category'],
            query: () => `categories`,
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
        addCategory: builder.mutation({
            query: (body) => ({
                url: `/categories`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ["Category"],
        }),
        changeCategory: builder.mutation({
            query: (body) =>( {
                url: `/categories/${body.id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Category"]
        })
    }),
});

export const { useGetCategoriesQuery, useDeleteCategoryMutation, useAddCategoryMutation, useChangeCategoryMutation } = CategoryApi;
