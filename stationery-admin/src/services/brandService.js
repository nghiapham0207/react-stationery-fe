import { axiosGet, endpoints } from "../utils/httpRequest";

export const getBrands = async () => {
	try {
		const res = await axiosGet(endpoints.brands);
		return res;
	} catch (error) {
		return Promise.reject(error);
	}
};
