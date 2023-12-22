import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
// import $ from "jquery";
// import "owl.carousel";
//
import ProductDiscountItem from "../ProductDiscountItem";
import { axiosGet, endpoints } from "../../utils/httpRequest";

export default function ProductDiscount() {
	const productDiscountState = useQuery({
		queryKey: ["productDiscount"],
		queryFn: async () => {
			try {
				const res = await axiosGet(endpoints.productDiscount, {
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
	let productDiscount = [];
	if (productDiscountState.isSuccess) {
		productDiscount = productDiscountState.data.data;
	}
	const setSlider = () => {
		$(".product__discount__slider").owlCarousel({
			loop: true,
			margin: 0,
			items: 3,
			dots: true,
			smartSpeed: 1200,
			autoHeight: false,
			autoplay: true,
			responsive: {
				320: {
					items: 1,
				},
				480: {
					items: 2,
				},
				768: {
					items: 2,
				},
				992: {
					items: 3,
				},
			},
		});
	};
	useEffect(() => {
		setTimeout(() => {
			setSlider();
		}, 500);
	}, []);
	return (
		<div className="product__discount">
			<div className="section-title product__discount__title">
				<h2>Sale Off</h2>
			</div>
			<div className="row">
				<div className="product__discount__slider owl-carousel owl-loaded owl-drag">
					<div className="owl-stage-outer">
						<div
							className="owl-stage"
							style={{
								transform: "translate3d(-877px, 0px, 0px)",
								transition: "all 1.2s ease 0s",
								width: 3510,
							}}>
							{productDiscount.length > 0
								? productDiscount.map((product) => (
										<div key={product.product_id} className="owl-item" style={{ width: "292.5px" }}>
											<div className="col-lg-4">
												<ProductDiscountItem product={product} />
											</div>
										</div>
								  ))
								: null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
