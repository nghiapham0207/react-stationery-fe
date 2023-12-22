import axios from "axios";
import jwtDecode from "jwt-decode";
import { loginSuccess, logoutSuccess } from "../redux/authSlice";
import { updateUser } from "../redux/userSlice";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_ENDPOINT,
});

/**
 * this is endpoints object which contains endpoint
 */
export const endpoints = {
	signIn: "user/sign-in",
	signUp: "user/sign-up",
	getUser: "user",
	refreshToken: "user/refresh-token",
	logout: "user/logout",
	//
	listOrder: "order/all-by-status",
	approvalOrder: "order/",
	products: "product/admin-all",
	deleteProduct: "product/",
	//
	categories: "category/all",
	brands: "brand/all",
	createProduct: "product",
	getRevenue: "order/revenue",
	updateProduct: "product/",
	//
	createCategory: "category",
	updateCategory: "category/",
	deleteCategory: "category/",
	//
	createBrand: "brand",
	brandParam: "brand/",
};

/**
 * to get new accessToken and refreshToken
 * @param {String} refreshToken
 * @returns {Object} new Object contains new accessToken and refreshToken
 */
const getNewAccessToken = async (refreshToken) => {
	if (!refreshToken) {
		throw new Error("refreshToken is not found in refreshToken function");
	}
	try {
		const res = await axiosInstance.post(endpoints.refreshToken, {
			refresh_token: refreshToken,
		});
		return res.data;
	} catch (error) {
		console.log("refreshToken", error);
	}
};

export const axiosJWT = (accessToken, refreshToken, dispatch) => {
	const instance = axios.create({
		baseURL: import.meta.env.VITE_BASE_ENDPOINT,
	});
	instance.interceptors.request.use(
		async (config) => {
			const date = new Date();
			// check refresh token exp first, then check accesToken
			const decodedRefresh = jwtDecode(refreshToken);
			if (decodedRefresh.exp < date.getTime() / 1000) {
				// set token null then show login, and then redirect path before
				dispatch(logoutSuccess());
				dispatch(updateUser(null));
			}
			const decodedToken = jwtDecode(accessToken);
			if (decodedToken.exp < date.getTime() / 1000) {
				const data = await getNewAccessToken(refreshToken);
				if (data.success) {
					dispatch(loginSuccess(data.data));
					config.headers["Authorization"] = `Bearer ${data.data.accessToken}`;
				}
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);
	return instance;
};

export const axiosGet = async (endpoints, config = {}, instance = axiosInstance) => {
	const response = await instance.get(endpoints, config);
	return response.data;
};

export const axiosPost = async (endpoints, data = {}, config = {}, instance = axiosInstance) => {
	const response = await instance.post(endpoints, data, config);
	return response.data;
};

export const axiosDelete = async (endpoints, config = {}, instance = axiosInstance) => {
	const response = await instance.delete(endpoints, config);
	return response.data;
};

export const axiosPatch = async (endpoints, data = {}, config = {}, instance = axiosInstance) => {
	const response = await instance.patch(endpoints, data, config);
	return response.data;
};
