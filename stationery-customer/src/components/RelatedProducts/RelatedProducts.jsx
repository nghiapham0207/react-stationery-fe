import { useQuery } from "@tanstack/react-query";
import { axiosGet, endpoints } from "../../utils/httpRequest";
import ProductItem from "../ProductItem/ProductItem";

export default function RelatedProducts({ productId, categoryId }) {
	const relatedProductsState = useQuery({
		queryKey: ["relatedProducts", categoryId, productId],
		queryFn: async () => {
			try {
				const res = await axiosGet(endpoints.relatedProducts, {
					params: {
						top: 4,
						category_id: categoryId,
						product_id: productId,
					},
				});
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		staleTime: 3 * 60 * 1000,
	});
	let relatedProducts = [];
	if (relatedProductsState.isSuccess) {
		relatedProducts = relatedProductsState.data.data;
	}
	return (
		<>
			<div className="row">
				<div className="col-lg-12">
					<div className="section-title related__product__title">
						<h2>Related Product</h2>
					</div>
				</div>
			</div>
			<div className="row justify-content-center">
				{relatedProducts.length > 0
					? relatedProducts.map((product, index) => (
							<div key={index} className="col-lg-3 col-md-4 col-sm-6">
								<ProductItem product={product} />
							</div>
					  ))
					: null}
			</div>
		</>
	);
}
