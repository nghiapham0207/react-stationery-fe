import { toast } from "react-toastify";
import { axiosJWT, endpoints } from "../utils/httpRequest";

export const addToCart = async ({ product_id, accessToken, refreshToken, dispatch }) => {
	const toastId = toast.loading("processing!");
	const jwt = axiosJWT(accessToken, refreshToken, dispatch);
	try {
		const res = await jwt.post(
			endpoints.addToCart,
			{
				productId: product_id,
				quantity: 1,
			},
			{
				headers: { Authorization: "Bearer " + accessToken },
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
			render: error.response?.data.message || "can not add to cart!",
		});
	}
};
