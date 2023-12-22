import { Link } from "react-router-dom";
import { routes } from "../../routes";

const defaultBreadcrumb = [{ label: "Home", url: "/" }];

/**
 *
 * @param {defaultBreadcrumb} param0
 * @returns
 */
export default function Breadcrumb({ items = defaultBreadcrumb }) {
	if (!(Array.isArray(items) && items.length > 0)) {
		throw new Error("Breadcrumb is not valid values!");
	}
	return (
		<>
			{/* <!-- Breadcrumb Section Begin --> */}
			<section
				className="breadcrumb-section set-bg"
				data-setbg="/img/breadcrumb.jpg"
				style={{ backgroundImage: 'url("/img/breadcrumb.jpg")' }}>
				<div className="container">
					<div className="row">
						<div className="col-lg-12 text-center">
							<div className="breadcrumb__text">
								<h2>Organi Shop</h2>
								<div className="breadcrumb__option">
									{items.map((item, index) =>
										index === items.length - 1 ? (
											<span key={index}>{item?.label}</span>
										) : (
											<Link to={item?.url} key={index}>
												{item?.label}
											</Link>
										),
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <!-- Breadcrumb Section End --> */}
		</>
	);
}
