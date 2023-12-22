import { useQuery } from "@tanstack/react-query";
//
import TopProductItem from "../TopProductItem";
import { axiosGet, endpoints } from "../../utils/httpRequest";

const itemPerSlider = 3;

export default function TopRatedProducts() {
	const topRatedProductsState = useQuery({
		queryKey: ["topRatedProducts"],
		queryFn: async () => {
			try {
				const res = await axiosGet(endpoints.topRatedProducts, {
					params: {
						top: 6,
					},
				});
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		staleTime: 3 * 60 * 1000,
	});
	let topRatedProducts = [];
	if (topRatedProductsState.isSuccess) {
		topRatedProducts = topRatedProductsState.data.data;
	}
	return (
		<div className="latest-product__text">
			<h4>Top Rated Products</h4>
			<div className="latest-product__slider owl-carousel owl-loaded owl-drag">
				<div className="owl-stage-outer">
					<div
						className="owl-stage"
						style={{
							transform: "translate3d(-719px, 0px, 0px)",
							transition: "all 1.2s ease 0s",
							width: 2160,
						}}>
						<div className="owl-item" style={{ width: "359.99px" }}>
							<div className="latest-prdouct__slider__item">
								{topRatedProducts.length > 0
									? topRatedProducts
											.slice(0, itemPerSlider)
											.map((product) => (
												<TopProductItem key={product.product_id} product={product} />
											))
									: null}
							</div>
						</div>
						<div className="owl-item" style={{ width: "359.99px" }}>
							<div className="latest-prdouct__slider__item">
								{topRatedProducts.length > 0
									? topRatedProducts
											.slice(itemPerSlider, topRatedProducts.length)
											.map((product) => (
												<TopProductItem key={product.product_id} product={product} />
											))
									: null}
							</div>
						</div>
					</div>
				</div>
				<div className="owl-nav">
					<button type="button" role="presentation" className="owl-prev">
						<span className="fa fa-angle-left">
							<span />
						</span>
					</button>
					<button type="button" role="presentation" className="owl-next">
						<span className="fa fa-angle-right">
							<span />
						</span>
					</button>
				</div>
				<div className="owl-dots disabled" />
			</div>
		</div>
	);
}
