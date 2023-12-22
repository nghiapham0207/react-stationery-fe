import { useRef, useState } from "react";
import { Pagination } from "../../components/Pagination";
import { axiosJWT, endpoints } from "../../utils/httpRequest";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectRefreshToken } from "../../redux/selectors";
import { useQuery } from "@tanstack/react-query";
import { toVND } from "../../utils/helpers";
import { tabs } from "../OrderPage/OrderPage";
import { toast } from "react-toastify";

const RevenueMode = {
	THIS_DATE: 1,
	THIS_MONTH: 2,
	SELECT_DATE: 3,
};

export default function RevenuePage() {
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);
	const dispatch = useDispatch();

	const [mode, setMode] = useState(RevenueMode.THIS_DATE);
	const [page, setPage] = useState(1);

	const fromDateRef = useRef();
	const toDateRef = useRef();

	const revenueState = useQuery({
		queryKey: ["revenue", mode, page],
		queryFn: async () => {
			const jwt = axiosJWT(accessToken, refreshToken, dispatch);
			const params = {
				page: page - 1,
				size: 10,
			};
			params.revenue_mode = mode;
			if (mode === RevenueMode.SELECT_DATE) {
				params.fromDate = fromDateRef.current.value;
				params.toDate = toDateRef.current.value;
			}
			try {
				const res = await jwt.get(endpoints.getRevenue, {
					headers: {
						Authorization: "Bearer " + accessToken,
					},
					params: params,
				});
				return res.data;
			} catch (error) {
				console.log(error);
				return Promise.reject(error);
			}
		},
		enabled: mode !== RevenueMode.SELECT_DATE,
	});

	let listOrder = [];
	let revenue = 0;
	let totalPage = 0;
	if (revenueState.isSuccess) {
		revenue = revenueState.data.data.revenue;
		listOrder = revenueState.data.data.items;
		totalPage = revenueState.data.data.totalPages;
	}

	const handleChangeMode = (mode) => {
		setMode(mode);
	};
	const handlePageChange = (page) => {
		setPage(page);
	};
	const handleSelectDate = (e) => {
		e.preventDefault();
		const from = new Date(fromDateRef.current.value);
		const to = new Date(toDateRef.current.value);
		if (to.getTime() < from.getTime()) {
			toast.error("toDate must be greater than fromDate!");
			toDateRef.current.value = "";
			toDateRef.current.focus();
			return;
		}
		revenueState.refetch();
	};
	return (
		<>
			<div className="bg-light rounded h-100 p-4">
				<div className="d-flex justify-content-between align-items-center">
					<div className="d-flex flex-column">
						<h5 className="mb-0">Select Options</h5>
						<div className="d-flex mt-2">
							<div className="form-check me-3">
								<input
									className="form-check-input"
									type="radio"
									name="revenue-mode"
									defaultChecked
									onClick={() => {
										handleChangeMode(RevenueMode.THIS_DATE);
									}}
									id="this-date"
								/>
								<label className="form-check-label" htmlFor="this-date">
									this date
								</label>
							</div>
							<div className="form-check me-3">
								<input
									className="form-check-input"
									type="radio"
									name="revenue-mode"
									id="this-month"
									onClick={() => {
										handleChangeMode(RevenueMode.THIS_MONTH);
									}}
								/>
								<label className="form-check-label" htmlFor="this-month">
									this month
								</label>
							</div>
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									name="revenue-mode"
									id="select-date"
									onClick={() => {
										handleChangeMode(RevenueMode.SELECT_DATE);
									}}
								/>
								<label className="form-check-label" htmlFor="select-date">
									select date
								</label>
							</div>
						</div>
						<form
							className={`${mode === RevenueMode.SELECT_DATE ? "" : "d-none"}`}
							onSubmit={handleSelectDate}>
							<div className="d-flex align-items-end">
								<div className="me-2">
									<label>from</label>
									<input type="date" ref={fromDateRef} required className="form-control" />
								</div>
								<div className="me-2">
									<label>to</label>
									<input type="date" ref={toDateRef} required className="form-control" />
								</div>
								<div>
									<button type="submit" className="btn btn-outline-primary">
										Select
									</button>
								</div>
							</div>
						</form>
					</div>
					<div>
						{"Revenue: "}
						<span className="text-info">{toVND(revenue)}</span>
					</div>
				</div>
				<div className="table-responsive">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">date</th>
								<th scope="col">products</th>
								<th scope="col">total price</th>
							</tr>
						</thead>
						<tbody>
							{listOrder.length > 0
								? listOrder.map((order) => (
										<tr key={order.order_id}>
											<td>{order.date}</td>
											<td>
												<ul>
													{order.order_details.map((detail) => (
														<li key={detail.order_id + detail.product_id}>{detail.product.name}</li>
													))}
												</ul>
											</td>
											<td>{toVND(order.total_price)}</td>
										</tr>
								  ))
								: null}
						</tbody>
					</table>
				</div>
				<Pagination totalPage={totalPage} currentPage={page} onPageChange={handlePageChange} />
			</div>
		</>
	);
}
