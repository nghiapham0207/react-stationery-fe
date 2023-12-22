import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
	name: "filter",
	initialState: {
		keyword: "",
		categories: [],
		brands: [],
		rating: 0,
	},
	reducers: {
		resetFilter(state) {
			state.keyword = "";
			state.categories = [];
			state.brands = [];
			state.rating = 0;
		},
		/**
		 *
		 * @param {*} state
		 * @param {String} action pass 1 string
		 */
		updateKeyword(state, action) {
			state.keyword = action.payload;
		},
		/**
		 *
		 * @param {*} state
		 * @param {{ value: "", checked: false }} action
		 */
		updateCategories(state, action) {
			if (action.payload.checked) {
				state.categories.push(action.payload.value);
			} else {
				const isInclude = state.categories.includes(action.payload.value);
				if (isInclude) {
					state.categories = state.categories.filter((category) => {
						return category !== action.payload.value;
					});
				}
			}
		},
		/**
		 *
		 * @param {*} state
		 * @param {{ value: "", checked: false }} action
		 */
		updateBrands(state, action) {
			if (action.payload.checked) {
				state.brands.push(action.payload.value);
			} else {
				const isInclude = state.brands.includes(action.payload.value);
				if (isInclude) {
					state.brands = state.brands.filter((brand) => {
						return brand !== action.payload.value;
					});
				}
			}
		},
		/**
		 *
		 * @param {Object} state
		 * @param {Number} action pass 1 number
		 */
		updateRating(state, action) {
			state.rating = action.payload;
		},
	},
});

export const { updateKeyword, updateCategories, updateBrands, updateRating, resetFilter } =
	filterSlice.actions;

export default filterSlice.reducer;
