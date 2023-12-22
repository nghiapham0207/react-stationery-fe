import { logoutSuccess } from "../redux/authSlice";
import { updateUser } from "../redux/userSlice";
import { axiosJWT, endpoints } from "../utils/httpRequest";

export const signUp = () => {};

const permission = {
	CUSTOMER: 1,
	ADMIN: 2,
};

export const getUser = async (accessToken, refreshToken, dispatch) => {
	if (refreshToken) {
		const jwt = axiosJWT(accessToken, refreshToken, dispatch);
		try {
			const res = await jwt.get(endpoints.getUser, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			if (res.data.data.permission_id === permission.ADMIN) {
				dispatch(updateUser(res.data.data));
				return {
					success: true,
					data: res.data,
				};
			} else {
				return {
					success: false,
					data: null,
				};
			}
		} catch (error) {
			console.log(error);
			return {
				success: false,
				data: error.response.data,
			};
		}
	}
};

export const logout = async (accessToken, refreshToken, dispatch) => {
	const jwt = axiosJWT(accessToken, refreshToken, dispatch);
	try {
		const res = await jwt.patch(
			endpoints.logout,
			{
				refresh_token: refreshToken,
			},
			{
				headers: {
					Authorization: "Bearer " + accessToken,
				},
			},
		);
		if (res.data.success) {
			dispatch(logoutSuccess());
			dispatch(updateUser(null));
		}
	} catch (error) {
		console.log(error);
	}
};
