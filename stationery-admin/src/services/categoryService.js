import { axiosGet, endpoints } from "../utils/httpRequest";

export const getCategories = async () => {
	try {
		const res = await axiosGet(endpoints.categories);
		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};
