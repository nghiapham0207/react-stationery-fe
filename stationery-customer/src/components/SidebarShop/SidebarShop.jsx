import { useDispatch } from "react-redux";
import { useEffect } from "react";
//
import LatestProducts from "../LatestProducts";
import SidebarShopItem from "../SidebarShopItem";
import { initiallizeSlider, latestProductsSlider } from "../../owl/slider";
import BrandsFilter from "../BrandsFilter";
import CategoriesFilter from "../CategoriesFilter";
import RatingFilter from "../RatingFilter/RatingFilter";
import { resetFilter } from "../../redux/filterSlice";

export default function SidebarShop() {
	const dispatch = useDispatch();
	const handleResetFilter = () => {
		dispatch(resetFilter());
		const ratings = document.querySelectorAll("input[name='Rating']");
		ratings.forEach((rating) => {
			rating.checked = false;
		});
		const brands = document.querySelectorAll("input[data-type-checkbox='brands']");
		brands.forEach((brand) => {
			brand.checked = false;
		});
		const categories = document.querySelectorAll("input[data-type-checkbox='categories']");
		categories.forEach((category) => {
			category.checked = false;
		});
	};
	useEffect(() => {
		initiallizeSlider(latestProductsSlider);
	}, []);
	return (
		<div className="sidebar">
			<SidebarShopItem title="By Category">
				<CategoriesFilter />
			</SidebarShopItem>
			<SidebarShopItem title="Brands">
				<BrandsFilter />
			</SidebarShopItem>
			<SidebarShopItem title="Rating">
				<RatingFilter />
			</SidebarShopItem>
			<SidebarShopItem>
				<button type="button" onClick={handleResetFilter} className="btn btn-outline-danger w-75">
					Clear all
				</button>
			</SidebarShopItem>
			<div className="sidebar__item">
				<LatestProducts />
			</div>
		</div>
	);
}
