import { forwardRef, useState } from "react";
import validator from "validator";

const defaultChange = () => {};

function CartQuantity({ defaultValue = 1, onChange = defaultChange }, ref) {
	const [state, setState] = useState(defaultValue);
	const handleChange = (e) => {
		const val = e.target.value;
		if (val === "" || (validator.isNumeric(val) && parseInt(val) >= 0)) {
			setState(val);
			onChange(val);
		}
	};
	const handleSub = () => {
		if (!(parseInt(state) === 1)) {
			const val = parseInt(state) - 1;
			setState(val);
			onChange(val);
		}
	};
	const handleAdd = () => {
		const val = parseInt(state) + 1;
		setState(val);
		onChange(val);
	};
	const handleBlur = (e) => {
		const val = e.target.value;
		if (val === "") {
			setState(1);
			onChange(1);
			e.target.value = "1";
		}
	};
	return (
		<div className="quantity">
			<div className="pro-qty">
				<span className="dec qtybtn" onClick={handleSub}>
					-
				</span>
				<input
					ref={ref}
					type="text"
					title="quantity"
					value={state}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<span className="inc qtybtn" onClick={handleAdd}>
					+
				</span>
			</div>
		</div>
	);
}

export default forwardRef(CartQuantity);
