import { useQuery } from "@tanstack/react-query";
//
import TopProductItem from "../TopProductItem";
import { axiosGet, endpoints } from "../../utils/httpRequest";

const itemPerSlider = 3;

export default function LatestProducts() {
	const latestProductsState = useQuery({
		queryKey: ["latestProducts"],
		queryFn: async () => {
			try {
				const res = await axiosGet(endpoints.latestProducts, {
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
	let latestProducts = [];
	if (latestProductsState.isSuccess) {
		latestProducts = latestProductsState.data.data;
	}
	return (
		<div className="latest-product__text">
			<h4>Latest Products</h4>
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
								{latestProducts.length > 0
									? latestProducts
											.slice(0, itemPerSlider)
											.map((product) => (
												<TopProductItem key={product.product_id} product={product} />
											))
									: null}
							</div>
						</div>
						<div className="owl-item" style={{ width: "359.99px" }}>
							<div className="latest-prdouct__slider__item">
								{latestProducts.length > 0
									? latestProducts
											.slice(itemPerSlider, latestProducts.length)
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
