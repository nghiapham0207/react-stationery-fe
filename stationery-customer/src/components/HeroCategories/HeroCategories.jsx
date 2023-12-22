import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/categoryService";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { updateCategories } from "../../redux/filterSlice";
import { useDispatch } from "react-redux";

export default function HeroCategories({ isShop = false }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const categoriesState = useQuery({
		queryKey: ["categories"],
		queryFn: getCategories,
		staleTime: 3 * 60 * 1000,
	});
	let categories = [];
	if (categoriesState.isSuccess) {
		categories = categoriesState.data.data;
	}
	const handleClick = (category_id) => {
		if (!isShop) {
			navigate(routes.shop);
		}
		setTimeout(() => {
			const element = document.querySelector(`input[id='${"categories" + category_id}']`);
			if (!element.checked) {
				element.checked = true;
				dispatch(updateCategories({ value: category_id, checked: true }));
			}
		}, 500);
	};
	return (
		<div className="hero__categories">
			<div
				className="hero__categories__all"
				onClick={(e) => {
					e.preventDefault();
					$(".hero__categories ul").slideToggle(400);
				}}>
				<i className="fa fa-bars" />
				<span>All departments</span>
			</div>
			<ul>
				{categories.map((category) => (
					<li key={category.category_id}>
						<a
							href="#"
							onClick={(e) => {
								e.preventDefault();
								handleClick(category.category_id);
							}}>
							{category.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
