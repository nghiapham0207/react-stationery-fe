// import $ from "jquery";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
//
import CategoryItem from "../CategoryItem/CategoryItem";
import { axiosGet, endpoints } from "../../utils/httpRequest";
import { categoriesSlider, initiallizeSlider } from "../../owl/slider";

// import "../../assets/template/js/jquery-3.3.1.min.js";
// import "../../assets/template/js/main";

export default function CategoriesSection() {
	const categoriesState = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			try {
				const res = await axiosGet(endpoints.categories);
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		staleTime: 3 * 60 * 1000,
	});
	let categories = [];
	if (categoriesState.isSuccess) {
		categories = categoriesState.data.data;
	}
	useEffect(() => {
		initiallizeSlider(categoriesSlider);
	}, []);
	return (
		<>
			{/* <!-- Categories Section Begin --> */}
			<section className="categories">
				<div className="container">
					<div className="row">
						<div className="categories__slider owl-carousel owl-loaded owl-drag">
							<div className="owl-stage-outer">
								<div
									className="owl-stage"
									style={{
										transform: "translate3d(-2047px, 0px, 0px)",
										transition: "all 1.2s ease 0s",
										width: 3803,
									}}>
									{categories.length > 0
										? categories.map((category) => (
												<div
													key={category.category_id}
													className="owl-item"
													style={{ width: "292.5px" }}>
													<div className="col-lg-3">
														<CategoryItem category={category} />
													</div>
												</div>
										  ))
										: null}
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
				</div>
			</section>
			{/* <!-- Categories Section End --> */}
		</>
	);
}
