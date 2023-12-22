import { axiosGet, endpoints } from "../utils/httpRequest";

export const getProducts = async () => {
	try {
		const res = await axiosGet(endpoints.products);
		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};
