import { useDispatch, useSelector } from "react-redux";
import reactLogo from "../../assets/react.svg";
import { logout } from "../../services/userServices";
import { selectAccessToken, selectRefreshToken, selectUser } from "../../redux/selectors";
import { routes } from "../../routes";

export default function Header() {
	const currentUser = useSelector(selectUser);
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);

	const dispatch = useDispatch();
	const handleLogout = async (e) => {
		e.preventDefault();
		await logout(accessToken, refreshToken, dispatch);
	};
	return (
		<>
			{/* Navbar Start */}
			<nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
				<a href={routes.order} className="navbar-brand d-flex d-lg-none me-4">
					<h2 className="text-primary mb-0">
						<i className="fa fa-hashtag" />
					</h2>
				</a>
				<a
					href="#"
					onClick={(e) => {
						e.preventDefault();
						$(".sidebar, .content").toggleClass("open");
						return false;
					}}
					className="sidebar-toggler flex-shrink-0">
					<i className="fa-solid fa-bars" />
				</a>
				<form className="d-none d-md-flex ms-4">
					<input className="form-control border-0" type="search" placeholder="Search" />
				</form>
				<div className="navbar-nav align-items-center ms-auto">
					<div className="nav-item dropdown">
						<a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
							<img
								className="rounded-circle me-lg-2"
								src={currentUser.image || reactLogo}
								alt=""
								style={{ width: 40, height: 40 }}
								onError={(e) => {
									e.target.src = reactLogo;
								}}
							/>
							<span className="d-none d-lg-inline-flex">
								{currentUser.first_name + " " + currentUser.last_name}
							</span>
						</a>
						<div className="dropdown-menu dropdown-menu-end bg-white border rounded m-0">
							<a href="#" className="dropdown-item">
								Setting
							</a>
							<a onClick={handleLogout} href="#" className="dropdown-item">
								Logout
							</a>
						</div>
					</div>
				</div>
			</nav>
			{/* Navbar End */}
		</>
	);
}
