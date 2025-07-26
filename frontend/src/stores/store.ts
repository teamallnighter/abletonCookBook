import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';

import usersSlice from "./users/usersSlice";
import badgesSlice from "./badges/badgesSlice";
import categoriesSlice from "./categories/categoriesSlice";
import challengesSlice from "./challenges/challengesSlice";
import collectionsSlice from "./collections/collectionsSlice";
import comments_reviewsSlice from "./comments_reviews/comments_reviewsSlice";
import recipesSlice from "./recipes/recipesSlice";
import tagsSlice from "./tags/tagsSlice";
import rolesSlice from "./roles/rolesSlice";
import permissionsSlice from "./permissions/permissionsSlice";

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,

users: usersSlice,
badges: badgesSlice,
categories: categoriesSlice,
challenges: challengesSlice,
collections: collectionsSlice,
comments_reviews: comments_reviewsSlice,
recipes: recipesSlice,
tags: tagsSlice,
roles: rolesSlice,
permissions: permissionsSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
