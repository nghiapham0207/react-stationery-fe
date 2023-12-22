import { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectAccessToken,
	selectRefreshToken,
	selectUser,
} from "../redux/selectors";
import { useQuery } from "@tanstack/react-query";
import { axiosJWT, endpoints } from "../utils/httpRequest";

const CartsContext = createContext();
export function CartsProvider({ children }) {
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);
	const currentUser = useSelector(selectUser);

	const dispatch = useDispatch();

	const cartsState = useQuery({
		queryKey: ["carts", currentUser?.user_id],
		queryFn: async () => {
			const jwt = axiosJWT(accessToken, refreshToken, dispatch);
			try {
				const res = await jwt.get(endpoints.carts, {
					headers: {
						Authorization: "Bearer " + accessToken,
					},
				});
				return res.data;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		enabled: Boolean(currentUser),
		staleTime: 3 * 60 * 1000,
	});
	let carts = [];
	if (cartsState.isSuccess) {
		carts = cartsState.data.data;
	}
	const refreshCarts = () => {
		cartsState.refetch();
	};
	return (
		<CartsContext.Provider
			value={{
				carts,
				accessToken,
				refreshToken,
				currentUser,
				dispatch,
				refreshCarts,
			}}>
			{children}
		</CartsContext.Provider>
	);
}

export function useCarts() {
	const context = useContext(CartsContext);
	if (context) {
		return context;
	} else {
		throw new Error("Context is not found!");
	}
}
