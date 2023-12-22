import { memo } from "react";
import { toVND } from "../../../utils/helpers";

function ListProduct({ products = [], onDelete = () => {}, onProductClick = () => {} }) {
	return (
		<>
			<div className="table-responsive">
				<table className="table">
					<thead>
						<tr>
							<th scope="col">{products?.length}</th>
							<th scope="col">product name</th>
							<th scope="col">rating</th>
							<th scope="col">category</th>
							<th scope="col">brand</th>
							<th scope="col">quantity</th>
							<th scope="col">sold</th>
							<th scope="col">price</th>
							<th scope="col">status</th>
							<th scope="col">action</th>
						</tr>
					</thead>
					<tbody>
						{products.length > 0
							? products.map((product) => (
									<tr key={product.product_id} className="align-middle">
										<th scope="row">
											<a
												onClick={(e) => {
													e.preventDefault();
													onProductClick(product);
												}}
												href="#"
												style={{
													width: 30,
													height: 30,
												}}
												className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle">
												<i className="fa fa-info"></i>
											</a>
										</th>
										<td>{product.name}</td>
										<td>{product.rating}</td>
										<td>{product.category?.name}</td>
										<td>{product.brand?.name}</td>
										<td>{product.quantity}</td>
										<td>{product.sold_quantity}</td>
										<td>{toVND(product.price)}</td>
										<td className={`${product.status ? "" : " text-danger "}`}>
											{product.status ? "active" : "inactive"}
										</td>
										<td>
											<button
												type="button"
												onClick={() => {
													onDelete(product.product_id);
												}}
												className="btn btn-outline-danger">
												Remove
											</button>
										</td>
									</tr>
							  ))
							: null}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default memo(ListProduct);
