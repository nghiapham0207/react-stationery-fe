import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";

export default function LinkToProduct({
	product_id,
	target,
	className,
	title,
	children,
}) {
	return (
		<Link
			to={routes.shop + "/" + product_id}
			className={className}
			target={target}
			title={title}>
			{children}
		</Link>
	);
}
