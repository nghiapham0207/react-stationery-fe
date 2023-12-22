import { useState } from "react";

const defaultChange = () => {};

export default function FilterCheckbox({
	item,
	id,
	name,
	checked,
	dataType,
	onChange = defaultChange,
}) {
	const [check, setCheck] = useState(checked || false);

	const labelFor = dataType + id;

	return (
		<div className="form-check">
			<input
				className="form-check-input"
				type="checkbox"
				defaultValue=""
				checked={check}
				data-type-checkbox={dataType}
				placeholder={name}
				onChange={(e) => {
					const check = e.target.checked;
					if (item) {
						item.checked = check;
					}
					setCheck(check);
					onChange(id, check);
				}}
				id={labelFor}
			/>
			<label className="form-check-label" htmlFor={labelFor}>
				{name}
			</label>
		</div>
	);
}
