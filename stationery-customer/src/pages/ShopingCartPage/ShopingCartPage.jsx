import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SectionContainer from "../../components/SectionContainer/SectionContainer";
import { axiosGet, axiosJWT, endpoints } from "../../utils/httpRequest";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectRefreshToken, selectUser } from "../../redux/selectors";
import ShoppingCartItem from "./ShoppingCartItem/ShoppingCartItem";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { toVND } from "../../utils/helpers";

const breadcrumb = [{ label: "Home", url: "/" }, { label: "Shopping Cart" }];

export default function ShopingCartPage() {
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);
	const currentUser = useSelector(selectUser);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const cartsState = useQuery({
		queryKey: ["carts", currentUser.user_id],
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
		staleTime: 3 * 60 * 1000,
	});
	let carts = [];
	if (cartsState.isSuccess) {
		carts = cartsState.data.data;
	}

	const handleDeleteAllCart = async (e) => {
		e.preventDefault();
		const jwt = axiosJWT(accessToken, refreshToken, dispatch);
		try {
			const res = await jwt.delete(endpoints.deleteAllCart, {
				headers: {
					Authorization: "Bearer " + accessToken,
				},
			});
			return res.data;
		} catch (error) {
			return Promise.reject(error);
		}
	};
	const deleteAllCartMutation = useMutation({
		mutationFn: handleDeleteAllCart,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["carts", currentUser.user_id],
			});
		},
	});
	const handleContinueShopping = (e) => {
		e.preventDefault();
		navigate(routes.shop);
	};
	let saved = 0;
	let total = 0;
	return (
		<>
			<Breadcrumb items={breadcrumb} />
			<SectionContainer className="shoping-cart spad">
				<div className="row">
					<div className="col-lg-12">
						<div className="shoping__cart__table">
							<table>
								<thead>
									<tr>
										<th className="shoping__product">Products</th>
										<th>Price</th>
										<th>Quantity</th>
										<th>Total</th>
										<th />
									</tr>
								</thead>
								<tbody>
									{carts.length > 0
										? carts.map((cart) => {
												const prod = cart.product;
												const originPrice = prod.price;
												const finalPrice =
													originPrice -
													(prod.discount > 0 ? Math.floor((originPrice * prod.discount) / 100) : 0);
												saved +=
													prod.discount > 0 ? Math.floor((prod.discount * prod.price) / 100) : 0;
												total += finalPrice * parseInt(cart.quantity);
												return (
													<ShoppingCartItem
														key={cart.user_id + cart.product.product_id}
														cart={cart}
													/>
												);
										  })
										: null}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-12">
						<div className="shoping__cart__btns">
							{carts.length > 0 && (
								<a
									href="#"
									className="primary-btn cart-btn"
									onClick={(e) => {
										e.preventDefault();
										const yes = confirm("Do you want to remove all products?");
										if (yes) {
											deleteAllCartMutation.mutate(e);
										}
									}}>
									Delete All Cart
								</a>
							)}
							<a
								href="#"
								className="primary-btn cart-btn cart-btn-right"
								onClick={handleContinueShopping}>
								{/* <span className="icon_loading" /> */}
								CONTINUE SHOPPING
							</a>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="shoping__continue">
							<div className="shoping__discount">
								<h5>Discount Codes</h5>
								<form action="#">
									<input type="text" placeholder="Enter your coupon code" />
									<button type="button" className="site-btn">
										APPLY COUPON
									</button>
								</form>
							</div>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="shoping__checkout">
							<h5>Cart Total</h5>
							<ul>
								<li>
									Saved <span>{toVND(saved)}</span>
								</li>
								<li>
									Total <span>{toVND(total)}</span>
								</li>
							</ul>
							<Link
								to={routes.checkout}
								className={`primary-btn ${carts.length > 0 ? "" : "disabled"}`}>
								PROCEED TO CHECKOUT
							</Link>
						</div>
					</div>
				</div>
			</SectionContainer>
		</>
	);
}
