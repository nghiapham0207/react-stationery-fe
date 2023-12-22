import { useDispatch, useSelector } from "react-redux";
import { axiosJWT, endpoints } from "../../../utils/httpRequest";
import { selectAccessToken, selectRefreshToken } from "../../../redux/selectors";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Pagination } from "../../../components/Pagination";
import { toVND } from "../../../utils/helpers";
import { tabs } from "../OrderPage";
import { ORDER_STATUS, approvalOrder } from "../../../services/orderServices";

export default function ListPurchase({ type = 0, onOrderClick = () => {} }) {
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);

	const [page, setPage] = useState(1);

	const dispatch = useDispatch();

	const listOrderState = useQuery({
		queryKey: ["listOrder", "type " + type, "page " + page],
		queryFn: async () => {
			const jwt = axiosJWT(accessToken, refreshToken, dispatch);
			try {
				const res = await jwt.get(endpoints.listOrder, {
					params: {
						page: page - 1,
						size: 5,
						status_id: type,
					},
					headers: {
						Authorization: "Bearer " + accessToken,
					},
				});
				return res.data;
			} catch (error) {
				console.log(error);
				return Promise.reject(error);
			}
		},
		staleTime: 3 * 60 * 1000,
	});

	let listOrder = [];
	let totalPage = 0;

	if (listOrderState.isSuccess) {
		totalPage = listOrderState.data.data.totalPages;
		listOrder = listOrderState.data.data.items;
	}

	const handlePageChange = (page) => {
		setPage(page);
	};

	const handleApproval = async (order_id, status_id) => {
		await approvalOrder({ order_id, status_id, accessToken, refreshToken, dispatch });
		listOrderState.refetch();
	};

	return (
		<>
			<table className="table table-hover">
				<thead>
					<tr>
						<th className="border-top-0" scope="col">
							{listOrder?.length}
						</th>
						<th className="border-top-0" scope="col">
							Date
						</th>
						<th className="border-top-0" scope="col">
							Products
						</th>
						<th className="border-top-0" scope="col">
							Total Price
						</th>
						<th className="border-top-0" scope="col">
							Status
						</th>
						<th></th>
						{/* {type === tabs.PENDING && <th></th>} */}
					</tr>
				</thead>
				<tbody>
					{listOrder.length > 0
						? listOrder.map((order) => (
								<tr key={order.order_id}>
									<th scope="row">
										<a
											href="#"
											onClick={(e) => {
												e.preventDefault();
												onOrderClick(order);
											}}
											style={{
												width: 30,
												height: 30,
											}}
											className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle">
											<i className="fa fa-info"></i>
										</a>
									</th>
									<td>{order.date}</td>
									<td>
										<ul>
											{order.order_details.map((detail) => (
												<li key={detail.order_id + detail.product_id}>{detail.product.name}</li>
											))}
										</ul>
									</td>
									<td>{toVND(order.total_price)}</td>
									<td>
										{order.status_id === tabs.PENDING && "Pending"}
										{order.status_id === tabs.DELIVERING && "Delivering"}
										{order.status_id === tabs.DELIVERED && "Delivered"}
										{order.status_id === tabs.CANCELED && "Canceled"}
									</td>
									{order.status_id === tabs.PENDING && (
										<td>
											<div className="d-flex">
												<button
													type="button"
													onClick={() => {
														handleApproval(order.order_id, ORDER_STATUS.CANCELED);
													}}
													className="btn btn-outline-danger">
													<i className="fa-solid fa-circle-xmark"></i>
												</button>
												<button
													type="button"
													onClick={() => {
														handleApproval(order.order_id, ORDER_STATUS.DELIVERING);
													}}
													className="ms-2 btn btn-outline-primary">
													<i className="fa-solid fa-check"></i>
												</button>
											</div>
										</td>
									)}
									{order.status_id === tabs.DELIVERING && (
										<td>
											<div className="d-flex">
												<button
													type="button"
													onClick={() => {
														handleApproval(order.order_id, ORDER_STATUS.DELIVERED);
													}}
													className="btn btn-outline-primary">
													Completed
												</button>
											</div>
										</td>
									)}
								</tr>
						  ))
						: null}
				</tbody>
			</table>
			<Pagination currentPage={page} totalPage={totalPage} onPageChange={handlePageChange} />
		</>
	);
}
