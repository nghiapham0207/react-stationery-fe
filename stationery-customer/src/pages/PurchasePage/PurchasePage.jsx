import { useState } from "react";
import ListPurchase from "./ListPurchase/ListPurchase";

export const tabs = {
	ALL: 0, // to get all order
	PENDING: 1,
	REQUEST_CANCEL: 2,
	DELIVERING: 3,
	DELIVERED: 4,
	CANCELED: 5,
};

export default function PurchasePage() {
	const [tab, setTab] = useState(tabs.ALL);
	const handleTabClick = (e) => {
		e.preventDefault();
		setTab(parseInt(e.target.name));
	};
	return (
		<>
			{/* container */}
			<div className="container">
				{/* tabs */}
				<ul className="nav nav-tabs text-center mb-3">
					<li className="nav-item flex-grow-1">
						<a
							name={tabs.ALL}
							className={`nav-link position-relative ${
								tab === tabs.ALL ? "" : "text-secondary"
							}`}
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
				{tab === tabs.ALL && <ListPurchase type={tab} />}
				{tab === tabs.PENDING && <ListPurchase type={tab} />}
				{tab === tabs.DELIVERING && <ListPurchase type={tab} />}
				{tab === tabs.DELIVERED && <ListPurchase type={tab} />}
				{tab === tabs.CANCELED && <ListPurchase type={tab} />}
			</div>
		</>
	);
}
