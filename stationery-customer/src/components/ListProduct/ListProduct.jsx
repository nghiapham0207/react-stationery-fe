import { useState } from "react";
//
import ProductItem from "../../components/ProductItem";
import { Pagination } from "../../components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { axiosGet, endpoints } from "../../utils/httpRequest";
import { useSelector } from "react-redux";
import { selectFilter } from "../../redux/selectors";
import { useDeferred } from "../../hooks";

export default function ListProduct() {
	const [currentPage, setCurrentPage] = useState(1);

	const filter = useSelector(selectFilter);

	const condition = useDeferred(filter, 500);
	const { brands, categories, keyword, rating } = condition;

	const productsState = useQuery({
		queryKey: ["products", currentPage, brands, categories, keyword, rating],
		queryFn: async () => {
			try {
				const res = await axiosGet(endpoints.products, {
					params: {
						page: currentPage - 1,
						size: 9,
						keyword: condition.keyword,
						categories: condition.categories.join("%2C"),
						brands: condition.brands.join("%2C"),
						rating: condition.rating,
					},
				});
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		staleTime: 3 * 60 * 1000,
	});
	let products = [];
	let totalPage = 0;
	let totalItems = 0;
	if (productsState.isSuccess) {
		totalPage = productsState.data.data.totalPages;
		totalItems = productsState.data.data.totalItems;
		products = productsState.data.data.items;
	}
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};
	return (
		<>
			<div id="ListProducts" className="filter__item">
				<div className="row">
					<div className="col-lg-4 col-md-5">
						<div className="filter__sort">
							<span>Sort By</span>
							<select style={{ display: "none" }}>
								<option value={0}>Default</option>
								<option value={0}>Default</option>
							</select>
							<div className="nice-select" tabIndex={0}>
								<span className="current">Default</span>
								<ul className="list">
									<li data-value={0} className="option selected">
										Default
									</li>
									<li data-value={0} className="option">
										Default
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-4">
						<div className="filter__found">
							<h6>
								<span>{totalItems}</span>
								{" Products found"}
							</h6>
						</div>
					</div>
					<div className="col-lg-4 col-md-3">
						<div className="filter__option">
							<span className="icon_grid-2x2" />
							<span className="icon_ul" />
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				{products.length > 0
					? products.map((product, index) => (
							<div key={index} className="col-lg-4 col-md-6 col-sm-6">
								<ProductItem product={product} />
							</div>
					  ))
					: null}
			</div>
			<Pagination totalPage={totalPage} currentPage={currentPage} onPageChange={handlePageChange} />
		</>
	);
}
