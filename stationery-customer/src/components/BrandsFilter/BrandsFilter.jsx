import { useQuery } from "@tanstack/react-query";
//
import { axiosGet, endpoints } from "../../utils/httpRequest";
import FilterCheckbox from "../FilterCheckbox";
import { updateBrands } from "../../redux/filterSlice";
import { useDispatch } from "react-redux";

export default function BrandsFilter() {
	const dispatch = useDispatch();

	const brandsState = useQuery({
		queryKey: ["brands"],
		queryFn: async () => {
			try {
				const res = await axiosGet(endpoints.brands);
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		staleTime: 3 * 60 * 1000,
	});
	let brands = [];
	if (brandsState.isSuccess) {
		brands = brandsState.data.data;
	}
	const handleChange = (value, checked) => {
		dispatch(updateBrands({ value, checked }));
	};
	return (
		<>
			{brands.length > 0
				? brands.map((brand) => {
						const { brand_id, name } = brand;
						return (
							<FilterCheckbox
								key={brand_id}
								item={brand}
								id={brand_id}
								name={name}
								dataType="brands"
								check={brand.checked}
								onChange={handleChange}
							/>
						);
				  })
				: null}
		</>
	);
}
