import { useRef } from "react";
import { toVND } from "../../utils/helpers";
import ReactToPrint from "react-to-print";

export default function OrderDetail({ orderData = {} }) {
	const invoiceRef = useRef();

	const { user } = orderData;
	const { first_name, last_name, phone } = user;
	let { order_details } = orderData;
	if (!order_details) {
		order_details = [];
	}

	let { address } = user;
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

	return (
		<>
			<div ref={invoiceRef} className="p-5">
				<h3 className="text-center">Invoice</h3>
				<div>
					<span>Buyer </span>
					<span className="fw-bold">
						{(last_name || "no lastname") +
							" " +
							(first_name || "no firstname") +
							" " +
							("(+84) " + (phone?.substring(1) || "no number phone"))}
					</span>
				</div>
				<div>
					<span>{"Pay by: "}</span>
					<span className="fw-bold">cash</span>
				</div>
				<div className="mb-3">
					<span>Address: </span>
					<span className="fw-bold">
						{(address.specific_address || "no address") +
							", " +
							(ward.ward_name || "no ward") +
							", " +
							(district.district_name || "no district") +
							", " +
							(province.province_name || "no province")}
					</span>
				</div>
				<div>
					<table className="table table-bordered">
						<thead>
							<tr>
								<th scope="col">No</th>
								<th scope="col">Product name</th>
								<th scope="col">Quantity</th>
								<th scope="col">Price</th>
								<th scope="col">Total</th>
							</tr>
						</thead>
						<tbody>
							{order_details.length > 0 &&
								order_details.map((detail, index) => {
									let { product } = detail;
									const originPrice = product.price;
									const finalPrice =
										originPrice -
										(product.discount > 0 ? Math.floor((originPrice * product.discount) / 100) : 0);
									return (
										<tr key={index}>
											<th scope="row">{index + 1}</th>
											<td>{product.name}</td>
											<td>{detail.quantity}</td>
											<td>{toVND(finalPrice)}</td>
											<td>{toVND(detail.quantity * finalPrice)}</td>
										</tr>
									);
								})}
						</tbody>
					</table>
				</div>
				<div className="d-flex justify-content-between">
					<div>
						<span>{"Total "}</span>
						<span className="fw-bold">{toVND(orderData.total_price)}</span>
					</div>
					<div>
						<span>{"Date order: "}</span>
						<span className="fw-bold">{orderData.date}</span>
					</div>
				</div>
			</div>
			<div className="my-3 mx-2 d-flex justify-content-end">
				<ReactToPrint
					documentTitle="Order"
					trigger={() => (
						<button type="button" className="btn btn-outline-primary">
							Print/Save
						</button>
					)}
					content={() => invoiceRef.current}
				/>
			</div>
		</>
	);
}
