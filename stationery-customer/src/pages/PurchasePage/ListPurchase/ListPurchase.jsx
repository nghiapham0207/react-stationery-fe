import { useDispatch, useSelector } from "react-redux";
import { axiosJWT, endpoints } from "../../../utils/httpRequest";
import { selectAccessToken, selectRefreshToken } from "../../../redux/selectors";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Pagination } from "../../../components/Pagination";
import { toVND } from "../../../utils/helpers";
import { tabs } from "../PurchasePage";
import { abortOrder } from "../../../services/orderServices";

export default function ListPurchase({ type = 0 }) {
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);

	const [page, setPage] = useState(1);

	const dispatch = useDispatch();

	const listPurchaseState = useQuery({
		queryKey: ["listPurchase", "type " + type, "page " + page],
		queryFn: async () => {
			const jwt = axiosJWT(accessToken, refreshToken, dispatch);
			try {
				const res = await jwt.get(endpoints.listPurchase, {
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
				return Promise.reject(error);
			}
		},
		staleTime: 3 * 60 * 1000,
	});

	let listPurchase = [];
	let totalPage = 0;

	if (listPurchaseState.isSuccess) {
		totalPage = listPurchaseState.data.data.totalPages;
		listPurchase = listPurchaseState.data.data.items;
	}

	const handlePageChange = (page) => {
		setPage(page);
	};

	const handleAbort = async (order_id) => {
		await abortOrder({ order_id, accessToken, refreshToken, dispatch });
		listPurchaseState.refetch();
	};

	return (
		<>
			<table className="table table-hover">
				<thead>
					<tr>
						<th className="border-top-0" scope="col">
							#
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
						{type === tabs.PENDING && <th className="border-top-0" scope="col"></th>}
					</tr>
				</thead>
				<tbody>
					{listPurchase.length > 0
						? listPurchase.map((purchase) => (
								<tr key={purchase.order_id}>
									<th scope="row">
										<a
											href="#"
											style={{
												width: 30,
												height: 30,
											}}
											className="d-inline-flex align-items-center justify-content-center bg-light rounded-circle">
											<i className="fa fa-info"></i>
										</a>
									</th>
									<td>{purchase.date}</td>
									<td>
										<ul>
											{purchase.order_details.map((detail) => (
												<li key={detail.order_id + detail.product_id}>{detail.product.name}</li>
											))}
										</ul>
									</td>
									<td>{toVND(purchase.total_price)}</td>
									<td>
										{purchase.status_id === tabs.PENDING && "Pending"}
										{purchase.status_id === tabs.DELIVERING && "Delivering"}
										{purchase.status_id === tabs.DELIVERED && "Delivered"}
										{purchase.status_id === tabs.CANCELED && "Canceled"}
									</td>
									{type === tabs.PENDING && (
										<td>
											<button
												type="button"
												onClick={() => {
													handleAbort(purchase.order_id);
												}}
												className="btn btn-outline-primary">
												Cancel
											</button>
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
