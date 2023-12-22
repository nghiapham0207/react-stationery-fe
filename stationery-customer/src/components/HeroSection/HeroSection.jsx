import HeroCategories from "../HeroCategories";
import HeroSearch from "../HeroSearch";

export default function HeroSection({ className = "hero", isHome = false, isShop = false }) {
	return (
		<>
			{/* <!-- Hero Section Begin --> */}
			<section className={className}>
				<div className="container">
					<div className="row">
						<div className="col-lg-3">
							<HeroCategories />
						</div>
						<div className="col-lg-9">
							<HeroSearch isShop={isShop} />
							{isHome && (
								<div
									className="hero__item set-bg"
									data-setbg="/img/hero/home-1.webp"
									style={{
										backgroundImage: 'url("/img/hero/home-1.webp")',
									}}>
									<div className="hero__text">
										<h2 className="shadow-lg">
											Online <br />
											Stationery Shop
										</h2>
										<p className="shadow-lg">Free Pickup and Delivery Available</p>
										<a href="#" className="primary-btn">
											SHOP NOW
										</a>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
			{/* <!-- Hero Section End --> */}
		</>
	);
}
