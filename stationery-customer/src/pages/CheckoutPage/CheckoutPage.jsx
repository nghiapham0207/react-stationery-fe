import { toast } from "react-toastify";
import Breadcrumb from "../../components/Breadcrumb";
import SectionContainer from "../../components/SectionContainer";
import { useCarts } from "../../contexts/cartsProvider";
import { toVND } from "../../utils/helpers";
import { axiosJWT, endpoints } from "../../utils/httpRequest";
import ShoppingCartItem from "../ShopingCartPage/ShoppingCartItem/ShoppingCartItem";
import { Navigate, useNavigate } from "react-router-dom";
import { routes } from "../../routes";

import { useEffect, useRef } from "react";
import UpdateAddress from "../../components/UpdateAddress/UpdateAddress";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";

const breadcrumb = [{ label: "Home", url: "/" }, { label: "Check out" }];

export default function CheckoutPage() {
	const { carts, accessToken, refreshToken, dispatch, refreshCarts } = useCarts();

	const refButtonChange = useRef();

	const currentUser = useSelector(selectUser);
	const { first_name, last_name, phone } = currentUser;
	let { address } = currentUser;
	if (!address) {
		address = {
			ward: {
				district: {
					province: {},
				},
			},
		};
	}
	const { ward } = address;
	const { district } = ward;
	const { province } = district;

	const navigate = useNavigate();

	let saved = 0;
	let total = 0;
	const handlePlaceOrder = async (e) => {
		e.preventDefault();
		if (!currentUser.address) {
			refButtonChange.current.focus();
			toast.error("You have not address yet! Update please!", {
				autoClose: 5000,
				closeButton: true,
			});
			return;
		}

		const jwt = axiosJWT(accessToken, refreshToken, dispatch);
		const toastId = toast.loading("processing!");
		try {
			const res = await jwt.post(
				endpoints.placeOrder,
				{
					total_price: total,
				},
				{
					headers: {
						Authorization: "Bearer " + accessToken,
					},
				},
			);
			if (res.data.success) {
				navigate(routes.shop);
				setTimeout(() => {
					refreshCarts();
				}, 1000);
				toast.update(toastId, {
					autoClose: 1200,
					type: "success",
					isLoading: false,
					closeButton: true,
					render: "Ordered successfully!",
				});
			}
		} catch (error) {
			console.log(error);
			toast.update(toastId, {
				autoClose: 1200,
				type: "error",
				isLoading: false,
				closeButton: true,
				render: error.response?.data.message || "can not order!",
			});
		}
	};
	useEffect(() => {
		setTimeout(() => {
			if (carts.length <= 0) {
				// return <Navigate to={routes.home} />;
				// navigate(routes.home);
			}
		}, 1000);
	}, []);
	return (
		<>
			{carts.length > 0 ? (
				<>
					<Breadcrumb items={breadcrumb} />
					<SectionContainer className="checkout spad">
						<>
							{/* Modal */}
							<div
								className="modal fade"
								id="updateAddress"
								tabIndex={-1}
								aria-labelledby="updateAddressLabel"
								aria-hidden="true">
								<div className="modal-dialog modal-dialog-scrollable">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title" id="updateAddressLabel">
												Update Address And Info
											</h5>
											<button
												type="button"
												className="close"
												data-dismiss="modal"
												aria-label="Close">
												<span aria-hidden="true">×</span>
											</button>
										</div>
										<div className="modal-body">
											<UpdateAddress />
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-secondary" data-dismiss="modal">
												Close
											</button>
										</div>
									</div>
								</div>
							</div>
						</>

						<div className="row">
							<div className="col-lg-12">
								<div className="shoping__cart__table">
									<table>
										<thead>
											<tr>
												<th className="shoping__product">Products Ordered</th>
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
															(prod.discount > 0
																? Math.floor((originPrice * prod.discount) / 100)
																: 0);
														saved +=
															prod.discount > 0
																? Math.floor((prod.discount * prod.price) / 100)
																: 0;
														total += finalPrice * cart.quantity;
														return (
															<ShoppingCartItem
																key={cart.user_id + cart.product.product_id}
																cart={cart}
																isEditable={false}
															/>
														);
												  })
												: null}
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className="checkout__form">
							<h4>Billing Details</h4>
							<form onSubmit={handlePlaceOrder}>
								<div className="row">
									<div className="col-lg-8 col-md-6">
										<div className="bg-light rounded p-4">
											<div className="d-flex align-items-center">
												<i
													className="fa fa-map-marker"
													style={{
														fontSize: "20px",
														color: "red",
													}}></i>
												<h5
													className="ml-2"
													style={{
														fontSize: "20px",
														color: "red",
													}}>
													Delivery Address
												</h5>
											</div>
											<div className="mt-3 d-flex align-items-center justify-content-between">
												<div className="d-flex flex-column">
													<div className="font-weight-bold">
														{(last_name || "no lastname") +
															" " +
															(first_name || "no firstname") +
															" " +
															("(+84) " + (phone?.substring(1) || "no number phone"))}
													</div>
													<div>
														{(address.specific_address || "no address") +
															", " +
															(ward.ward_name || "no ward") +
															", " +
															(district.district_name || "no district") +
															", " +
															(province.province_name || "no province")}
													</div>
												</div>
												{/* Button trigger modal */}
												<button
													ref={refButtonChange}
													type="button"
													className="ml-4 btn btn-outline-primary"
													data-toggle="modal"
													data-target="#updateAddress">
													Change
												</button>
											</div>
										</div>
									</div>
									{/*  */}
									<div className="col-lg-4 col-md-6">
										<div className="checkout__order rounded">
											<h4 className="border-0 mb-0">Your Order</h4>
											<div className="checkout__order__subtotal">
												Saved <span>{toVND(saved)}</span>
											</div>
											<div className="checkout__order__total">
												Total <span>{toVND(total)}</span>
											</div>
											<button type="submit" className="site-btn rounded">
												PLACE ORDER
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</SectionContainer>
				</>
			) : null}
		</>
	);
}
