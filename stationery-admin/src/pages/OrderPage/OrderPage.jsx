import { useState } from "react";
import ListOrder from "./ListOrder/ListOrder";
import OrderDetail from "../../components/OrderDetail";

export const tabs = {
	ALL: 0, // to get all order
	PENDING: 1,
	REQUEST_CANCEL: 2,
	DELIVERING: 3,
	DELIVERED: 4,
	CANCELED: 5,
};

export default function OrderPage() {
	const [tab, setTab] = useState(tabs.ALL);
	const [orderData, setOrderData] = useState(null);

	// modal handlers
	const openModal = (orderDetail) => {
		setOrderData(orderDetail);
	};

	const closeModal = () => {
		setOrderData(null);
	};

	const handleTabClick = (e) => {
		e.preventDefault();
		setTab(parseInt(e.target.name));
	};
	return (
		<>
			{orderData && (
				<>
					<div className="modal-backdrop fade show" />
					<div
						onClick={closeModal}
						className="modal fade show"
						id="newProductModal"
						tabIndex={-1}
						aria-labelledby="newProductModalLabel"
						aria-modal="true"
						role="dialog"
						style={{ display: "block" }}>
						<div
							className="modal-dialog modal-lg modal-dialog-scrollable"
							// to closeModal
							onClick={(e) => {
								e.stopPropagation();
							}}>
							<div className="modal-content bg-light">
								<div className="modal-header">
									<h5 className="modal-title" id="newProductModalLabel">
										Export Order
									</h5>
									<button
										type="button"
										onClick={closeModal}
										className="btn-close"
										data-bs-dismiss="modal"
										aria-label="Close"
									/>
								</div>
								<div className="modal-body">
									<OrderDetail orderData={orderData} />
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			{/* container */}
			<div className="container">
				{/* tabs */}
				<ul className="nav nav-tabs text-center mb-3">
					<li className="nav-item flex-grow-1">
						<a
							name={tabs.ALL}
							className={`nav-link position-relative ${tab === tabs.ALL ? "" : "text-secondary"}`}
							onClick={handleTabClick}
							aria-current="page"
							href="#">
							All
						</a>
					</li>
					<li className="nav-item flex-grow-1">
						<a
							name={tabs.PENDING}
							className={`nav-link position-relative ${
								tab === tabs.PENDING ? "" : "text-secondary"
							}`}
							onClick={handleTabClick}
							href="#">
							Pending
						</a>
					</li>
					<li className="nav-item flex-grow-1">
						<a
							name={tabs.DELIVERING}
							className={`nav-link position-relative ${
								tab === tabs.DELIVERING ? "" : "text-secondary"
							}`}
							onClick={handleTabClick}
							href="#">
							Delivering
						</a>
					</li>
					<li className="nav-item flex-grow-1">
						<a
							name={tabs.DELIVERED}
							className={`nav-link position-relative ${
								tab === tabs.DELIVERED ? "" : "text-secondary"
							}`}
							onClick={handleTabClick}
							href="#">
							Delivered
						</a>
					</li>
					<li className="nav-item flex-grow-1">
						<a
							name={tabs.CANCELED}
							className={`nav-link position-relative ${
								tab === tabs.CANCELED ? "" : "text-secondary"
							}`}
							onClick={handleTabClick}
							href="#">
							Canceled
						</a>
					</li>
				</ul>
				{tab === tabs.ALL && <ListOrder onOrderClick={openModal} type={tab} />}
				{tab === tabs.PENDING && <ListOrder onOrderClick={openModal} type={tab} />}
				{tab === tabs.DELIVERING && <ListOrder onOrderClick={openModal} type={tab} />}
				{tab === tabs.DELIVERED && <ListOrder onOrderClick={openModal} type={tab} />}
				{tab === tabs.CANCELED && <ListOrder onOrderClick={openModal} type={tab} />}
			</div>
		</>
	);
}
