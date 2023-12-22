import { memo } from "react";

function ListBrand({ brands = [], onDelete = () => {}, onCategoryClick = () => {} }) {
	return (
		<>
			<div className="table-responsive">
				<table className="table">
					<thead>
						<tr>
							<th scope="col">{brands?.length}</th>
							<th scope="col">name</th>
							<th scope="col">description</th>
							<th scope="col">action</th>
						</tr>
					</thead>
					<tbody>
						{brands.length > 0
							? brands.map((brand) => (
									<tr key={brand.brand_id} className="align-middle">
										<th scope="row">
											<a
												onClick={(e) => {
													e.preventDefault();
													onCategoryClick(brand);
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
										<td>{brand.name}</td>
										<td>{brand.description}</td>
										<td>
											<button
												type="button"
												onClick={() => {
													onDelete(brand.brand_id);
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

export default memo(ListBrand);
