import { useEffect } from "react";
//
import HeroSection from "../../components/HeroSection";
// import CategoriesSection from "../../components/CategoriesSection";
// import FeaturedProduct from "../../components/FeaturedProduct";
import Banner from "../../components/Banner";
import SectionContainer from "../../components/SectionContainer";
// import BlogSection from "../../components/BlogSection";
import LatestProducts from "../../components/LatestProducts";
import TopRatedProducts from "../../components/TopRatedProducts";
import { latestProductsSlider } from "../../owl/slider";
// import ReviewProducts from "../../components/ReviewProducts";

export default function HomePage() {
	useEffect(() => {
		setTimeout(() => {
			latestProductsSlider();
		}, 500);
	}, []);
	return (
		<>
			<HeroSection isHome />

			{/* <CategoriesSection /> */}

			{/* <FeaturedProduct /> */}

			<Banner />

			<SectionContainer className="latest-product spad">
				<div className="row justify-content-center">
					<div className="col-lg-4 col-md-6">
						<LatestProducts />
					</div>
					<div className="col-lg-4 col-md-6">
						<TopRatedProducts />
					</div>
					{/* <div className="col-lg-4 col-md-6">
						<ReviewProducts />
					</div> */}
				</div>
			</SectionContainer>

			{/* <BlogSection /> */}
		</>
	);
}
