import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//
import { updateKeyword } from "../../redux/filterSlice";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { selectKeyword } from "../../redux/selectors";

export default function HeroSearch({ isShop = false }) {
	const keyword = useSelector(selectKeyword);

	const refInput = useRef(null);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleSubmit = (value) => {
		if (!isShop) {
			navigate(routes.shop);
		}
		dispatch(updateKeyword(value));
	};

	return (
		<div className="hero__search">
			<div className="hero__search__form">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const value = refInput.current.value;
						handleSubmit(value);
						window.location = "#ListProducts";
					}}>
					<div className="hero__search__categories">
						All Categories
						<span className="arrow_carrot-down" />
					</div>
					<input
						ref={refInput}
						type="text"
						defaultValue={keyword}
						placeholder="What do yo u need?"
					/>
					<button type="submit" className="site-btn">
						SEARCH
					</button>
				</form>
			</div>
			<div className="hero__search__phone">
				<div className="hero__search__phone__icon">
					<i className="fa fa-phone" />
				</div>
				<div className="hero__search__phone__text">
					<h5>+65 11.188.888</h5>
					<span>support 24/7 time</span>
				</div>
			</div>
		</div>
	);
}
