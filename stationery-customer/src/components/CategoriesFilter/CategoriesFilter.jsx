import { useQuery } from "@tanstack/react-query";
//
import { axiosGet, endpoints } from "../../utils/httpRequest";
import FilterCheckbox from "../FilterCheckbox";
import { useDispatch } from "react-redux";
import { updateCategories } from "../../redux/filterSlice";

export default function CategoriesFilter() {
	const dispatch = useDispatch();

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
	const handleChange = (value, checked) => {
		dispatch(updateCategories({ value, checked }));
	};
	return (
		<>
			{categories.length > 0
				? categories.map((category) => {
						const { category_id, name } = category;
						return (
							<FilterCheckbox
								key={category_id}
								item={category}
								id={category_id}
								name={name}
								dataType="categories"
								check={category.checked}
								onChange={handleChange}
							/>
						);
				  })
				: null}
		</>
	);
}
