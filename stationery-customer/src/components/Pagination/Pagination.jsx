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
	const paginationRange = usePagination(
		totalCount,
		totalPage,
		pageSize,
		siblingCount,
		currentPage,
	);
	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};
	const onNext = () => {
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
		<div className={className}>
			<a
				className={`${currentPage === 1 ? "disabled" : ""}`}
				onClick={onPrevious}>
				<i className="fa fa-long-arrow-left" />
			</a>
			{paginationRange.map((pagination) => {
				if (isNaN(Number(pagination))) {
					return (
						<a key={pagination} className="disabled">
							{"..."}
						</a>
					);
				}
				return (
					<a
						key={pagination}
						className={`${currentPage === pagination ? "active" : ""}`}
						onClick={() => {
							onPageChange(pagination);
						}}>
						{pagination}
					</a>
				);
			})}
			<a
				className={`${currentPage === lastPage ? "disabled" : ""}`}
				onClick={onNext}>
				<i className="fa fa-long-arrow-right" />
			</a>
		</div>
	);
}

export default Pagination;
