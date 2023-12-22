import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { routes } from "../../../routes";
import { logout } from "../../../services/userServices";
import { selectAccessToken, selectRefreshToken, selectUser } from "../../../redux/selectors";

export default function UserMenu() {
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
			{currentUser && (
				<>
					<div className="d-inline-block" style={{ maxWidth: "200px" }}>
						<div className="dropdown">
							<button
								type="button"
								className="btn btn-link w-100 text-decoration-none dropdown-toggle p-0"
								data-toggle="dropdown"
								aria-expanded="false">
								<img
									className="rounded-circle"
									src={currentUser.image ? currentUser.image : "/img/default-user.png"}
									alt=""
									style={{ width: 40, height: 40, objectFit: "cover" }}
									onError={(e) => {
										e.target.src = "/img/default-user.png";
									}}
								/>
								<span
									className="d-inline-flex ml-3 justify-content-center text-truncate"
									style={{ maxWidth: "100px" }}>
									{currentUser.username}
								</span>
							</button>
							<div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-right">
								<Link to={routes.profile} className="dropdown-item">
									My Account
								</Link>
								<Link to={routes.purchase} className="dropdown-item">
									My Purchase
								</Link>
								<a href="#" className="dropdown-item" onClick={handleLogout}>
									Logout
								</a>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
