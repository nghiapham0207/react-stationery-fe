import { usePagination } from "../../hooks";

function Pagination({
	onPageChange,
	totalCount,
	totalPage = 0,
	siblingCount = 1,
	currentPage,
	pageSize = 10,
	className = "product__pagination",
}) {
	const paginationRange = usePagination(totalCount, totalPage, pageSize, siblingCount, currentPage);
	const onPrevious = (e) => {
		e.preventDefault();
		onPageChange(currentPage - 1);
	};
	const onNext = (e) => {
		e.preventDefault();
		onPageChange(currentPage + 1);
	};
	if (totalPage == 0) {
		return null;
	}
	if (paginationRange.length === 0) {
		return null;
	}
	const lastPage = paginationRange[paginationRange.length - 1];
	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination">
				<li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
					<a className="page-link" href="#" onClick={onPrevious}>
						<i className="fa fa-long-arrow-left" />
					</a>
				</li>
				{paginationRange.map((pagination) => {
					if (isNaN(Number(pagination))) {
						return (
							<li className="page-item disabled" key={pagination}>
								<a className="page-link" href="#">
									{"..."}
								</a>
							</li>
						);
					}
					return (
						<li
							className={`page-item ${currentPage === pagination ? "active" : ""}`}
							key={pagination}>
							<a
								className="page-link"
								href="#"
								onClick={(e) => {
									e.preventDefault();
									onPageChange(pagination);
								}}>
								{pagination}
							</a>
						</li>
					);
				})}
				<li className={`page-item ${currentPage === lastPage ? "disabled" : ""}`}>
					<a className="page-link" href="#" onClick={onNext}>
						<i className="fa fa-long-arrow-right" />
					</a>
				</li>
			</ul>
		</nav>
	);
}

export default Pagination;
