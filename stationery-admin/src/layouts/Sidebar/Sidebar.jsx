import { Link, NavLink } from "react-router-dom";
import reactLogo from "../../assets/react.svg";
import { routes } from "../../routes";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";

export default function Sidebar() {
	const currentUser = useSelector(selectUser);
	return (
		<>
			{/* Sidebar Start */}
			<div className="sidebar pe-4 pb-3 bg-light">
				<nav className="navbar bg-light navbar-light">
					<a href={routes.order} className="navbar-brand mx-4 mb-3">
						<h3 className="text-primary">Dashboard</h3>
					</a>
					<div className="d-flex align-items-center ms-4 mb-4">
						<div className="position-relative">
							<img
								className="rounded-circle"
								src={currentUser.image || reactLogo}
								alt=""
								style={{ width: 40, height: 40 }}
								onError={(e) => {
									e.target.src = reactLogo;
								}}
							/>
							<div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
						</div>
						<div className="ms-3">
							<h6 className="mb-0">{currentUser.first_name + " " + currentUser.last_name}</h6>
							<span>Admin</span>
						</div>
					</div>
					<div className="navbar-nav w-100">
						<NavLink
							to={routes.order}
							className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""} `}>
							<i className="fa-regular fa-file-lines"></i> List Order
						</NavLink>
						<NavLink
							to={routes.listProduct}
							className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""} `}>
							<i className="fa-solid fa-list"></i> List Product
						</NavLink>
						<NavLink
							to={routes.revenue}
							className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""} `}>
							<i className="fa-solid fa-chart-column"></i> Revenue
						</NavLink>
						<NavLink
							to={routes.listCategory}
							className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""} `}>
							<i className="fa-solid fa-list"></i> List Category
						</NavLink>
						<NavLink
							to={routes.listBrand}
							className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""} `}>
							<i className="fa-solid fa-list"></i> List Brand
						</NavLink>
					</div>
				</nav>
			</div>
			{/* Sidebar End */}
		</>
	);
}
