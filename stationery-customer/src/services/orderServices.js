import { toast } from "react-toastify";
import { axiosJWT, endpoints } from "../utils/httpRequest";

export const ORDER_STATUS = {
	ALL: 0, // to get all order
	PENDING: 1,
	REQUEST_CANCEL: 2,
	DELIVERING: 3,
	DELIVERED: 4,
	CANCELED: 5,
};

export const abortOrder = async ({ order_id, accessToken, refreshToken, dispatch }) => {
	const toastId = toast.loading("processing!");
	const jwt = axiosJWT(accessToken, refreshToken, dispatch);
	try {
		const res = await jwt.patch(
			endpoints.abortOrder + order_id,
			{
				status: ORDER_STATUS.CANCELED,
			},
			{
				headers: {
					Authorization: "Bearer " + accessToken,
				},
			},
		);
		const data = res.data;
		if (data.success) {
			toast.update(toastId, {
				render: data.message,
				type: "success",
				autoClose: 1000,
				closeButton: true,
				isLoading: false,
			});
		}
	} catch (error) {
		console.log(error);
		toast.update(toastId, {
			autoClose: 3000,
			type: "error",
			isLoading: false,
			closeButton: true,
			render: error.response?.data.message || "can not abort order!",
		});
	}
};
