import { useDispatch } from "react-redux";
import Stars from "../Stars";
import { updateRating } from "../../redux/filterSlice";

export default function RatingFilter() {
	const dispatch = useDispatch();

	const handleClick = (value) => {
		dispatch(updateRating(value));
	};

	return (
		<>
			{Array.from({ length: 5 }).map((_value, index) => (
				<div key={index} className="form-check">
					<input
						className="form-check-input"
						type="radio"
						name="Rating"
						id={"exampleRadios1" + index}
						defaultValue="option1"
						defaultChecked=""
						placeholder="stars"
						onClick={() => {
							handleClick(5 - index);
						}}
					/>
					<label className="form-check-label" htmlFor={"exampleRadios1" + index}>
						<Stars numberOfStar={5 - index} />
					</label>
				</div>
			))}
		</>
	);
}
