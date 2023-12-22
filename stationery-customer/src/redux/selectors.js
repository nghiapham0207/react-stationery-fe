import { createSelector } from "@reduxjs/toolkit";

export const selectAccessToken = (state) => state.auth.accessToken;

export const selectRefreshToken = (state) => state.auth.refreshToken;

export const selectUser = (state) => state.user.currentUser;

export const selectKeyword = (state) => state.filter.keyword;

export const selectCategories = (state) => state.filter.categories;

export const selectBrands = (state) => state.filter.brands;

export const selectRating = (state) => state.filter.rating;

export const selectFilter = createSelector(
	selectKeyword,
	selectCategories,
	selectBrands,
	selectRating,
	(keyword, categories, brands, rating) => {
		return {
			keyword,
			categories,
			brands,
			rating,
		};
	},
);
