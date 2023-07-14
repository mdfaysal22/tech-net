import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'; 
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000"
    }),
    tagTypes: ["comments"],
    endpoints: (builder) => ({
        getProducts : builder.query({
            query : () => '/products'
        }),
        singleProduct : builder.query({
            query : (id) => `/product/${id}`
        }),
        getsComment : builder.query({
            query : (id) => `/comment/${id}`,
            providesTags: ["comments"]
        }),
        commentPost : builder.mutation({
            query : ({id, data }) => ({
                url: `/comment/${id}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['comments'] // refreshes the comments list after posting a new one
        })
    })
});

export const {useGetProductsQuery, useSingleProductQuery, useCommentPostMutation, useGetsCommentQuery} = api;