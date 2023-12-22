import { memo } from "react";
//
import { getFileNameFromUrl } from "../../../utils/helpers";

function ListCategory({ categories = [], onDelete = () => {}, onCategoryClick = () => {} }) {
	return (
		<>
			<div className="table-responsive">
				<table className="table">
					<thead>
						<tr>
							<th scope="col">{categories?.length}</th>
							<th scope="col">name</th>
							<th scope="col">image</th>
							<th scope="col">note</th>
							<th scope="col">action</th>
						</tr>
					</thead>
					<tbody>
						{categories.length > 0
							? categories.map((category) => (
									<tr key={category.category_id} className="align-middle">
										<th scope="row">
											<a
												onClick={(e) => {
													e.preventDefault();
													onCategoryClick(category);
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
										<td>{category.name}</td>
										<td>
											<a className="d-inline-block" href={category.image} target="_blank">
												{getFileNameFromUrl(category.image)}
											</a>
										</td>
										<td>{category.note}</td>
										<td>
											<button
												type="button"
												onClick={() => {
													onDelete(category.category_id);
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

export default memo(ListCategory);
