import axios from "axios";
import jwtDecode from "jwt-decode";
import { loginSuccess, logoutSuccess } from "../redux/authSlice";
import { updateUser } from "../redux/userSlice";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_ENDPOINT,
});

/**
 * this is endpoint object which contains endpoint
 */
export const endpoints = {
	brands: "brand/all",
	products: "product/all",
	productDiscount: "product/sale-off",
	latestProducts: "product/latest",
	product: "product/",
	signIn: "user/sign-in",
	signUp: "user/sign-up",
	logout: "user/logout",
	getUser: "user",
	userParam: "user/",
	editProfile: "user",
	addToCart: "cart",
	refreshToken: "user/refresh-token",
	forgotPassword: "user/forgot-password",
	resetPassword: "user/reset-password",
	categories: "category/all",
	carts: "cart/all",
	updateCart: "cart",
	deleteCart: "cart/",
	deleteAllCart: "cart/all",
	placeOrder: "order",
	listPurchase: "order/all",
	topRatedProducts: "product/top-rated",
	relatedProducts: "product/related",
	abortOrder: "order/",
	provinceAll: "address/province/all",
	districtByProvince: "address/district",
	wardByDistrict: "address/ward",
	updateDeliveryAddress: "address/order",
	getConversation: "conversation/receiver/",
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
/**
 *
 * @param {String} accessToken
 * @param {String} refreshToken
 * @param {import("@reduxjs/toolkit").Dispatch} dispatch
 * @returns
 */
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
				console.log("heree");
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

/**
 *
 * @param {String} endpoint
 * @param {import("axios").AxiosRequestConfig} config
 * @param {import("axios").AxiosInstance} instance
 * @returns
 */
export const axiosGet = async (endpoint, config = {}, instance = axiosInstance) => {
	const response = await instance.get(endpoint, config);
	return response.data;
};
/**
 * thay vì tạo ra các hàm axiosGet,... mục đích cũng chỉ lấy về response.data
 * thì dùng interceptors.response để trả về response.data luôn
 * vẫn tạo 2 instance riêng cho jwt hoặc k có jwt
 */

/**
 *
 * @param {String} endpoint
 * @param {Object} data
 * @param {import("axios").AxiosRequestConfig} config
 * @param {import("axios").AxiosInstance} instance
 * @returns
 */
export const axiosPost = async (endpoint, data = {}, config = {}, instance = axiosInstance) => {
	const response = await instance.post(endpoint, data, config);
	return response.data;
};

/**
 *
 * @param {String} endpoint
 * @param {import("axios").AxiosRequestConfig} config
 * @param {import("axios").AxiosInstance} instance
 * @returns
 */
export const axiosDelete = async (endpoint, config = {}, instance = axiosInstance) => {
	const response = await instance.delete(endpoint, config);
	return response.data;
};

/**
 *
 * @param {String} endpoint
 * @param {Object} data
 * @param {import("axios").AxiosRequestConfig} config
 * @param {import("axios").AxiosInstance} instance
 * @returns
 */
export const axiosPatch = async (endpoint, data = {}, config = {}, instance = axiosInstance) => {
	const response = await instance.patch(endpoint, data, config);
	return response.data;
};
