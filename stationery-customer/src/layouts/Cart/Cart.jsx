import { Link } from "react-router-dom";
import { routes } from "../../routes";
import { useQuery } from "@tanstack/react-query";
import { axiosJWT, endpoints } from "../../utils/httpRequest";
import { selectAccessToken, selectRefreshToken, selectUser } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";

export default function Cart({ className = "header__cart" }) {
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
		enabled: Boolean(currentUser?.user_id),
		staleTime: 3 * 60 * 1000,
	});
	let carts = [];
	if (cartsState.isSuccess) {
		carts = cartsState.data.data;
	}
	return (
		<div className={className}>
			<ul>
				<li>
					<Link to={routes.shopingCart}>
						<i className="fa fa-shopping-bag" /> <span>{carts.length > 0 ? carts.length : 0}</span>
					</Link>
				</li>
			</ul>
			{/* <div className="header__cart__price">
				item: <span>$150.00</span>
			</div> */}
		</div>
	);
}
