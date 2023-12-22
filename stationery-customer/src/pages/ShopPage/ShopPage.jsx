import Breadcrumb from "../../components/Breadcrumb";
import HeroSection from "../../components/HeroSection";
import SectionContainer from "../../components/SectionContainer";
import ProductDiscount from "../../components/ProductDiscount";
import SidebarShop from "../../components/SidebarShop";
import ListProduct from "../../components/ListProduct";

const breadcrumb = [
	{ label: "Home", url: "/" },
	{ label: "Shop", url: "/shop" },
];

export default function ShopPage() {
	return (
		<>
			<HeroSection className="hero hero-normal" isShop />
			<Breadcrumb items={breadcrumb} />
			<SectionContainer className="product spad">
				<div className="row">
					<div className="col-lg-3 col-md-5">
						<SidebarShop />
					</div>
					<div className="col-lg-9 col-md-7">
						<ProductDiscount />
						<ListProduct />
					</div>
				</div>
			</SectionContainer>
		</>
	);
}
