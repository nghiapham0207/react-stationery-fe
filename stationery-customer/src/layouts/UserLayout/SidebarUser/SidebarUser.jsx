import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//
import { routes } from "../../../routes";
import { selectUser } from "../../../redux/selectors";

export default function SidebarUser() {
	const currentUser = useSelector(selectUser);
	return (
		<div
			className="align-self-start d-flex flex-column bg-white border rounded"
			style={{ maxWidth: 300 }}>
			<div className="d-flex flex-column p-3 border-bottom mb-2">
				<div className="p-30">
					<div className="d-flex align-items-center">
						<div
							style={{
								width: 60,
								height: 60,
							}}
							className="border border-2 rounded-circle p-1 overflow-hidden">
							<img
								className="rounded-circle"
								src={currentUser.image ? currentUser.image : "/img/default-user.png"}
								alt="user-image"
								style={{ width: "100%", height: "100%", objectFit: "cover" }}
								onError={(e) => {
									e.target.src = "/img/default-user.png";
								}}
							/>
						</div>
						<div className="ml-2">
							<h5
								className="fs-5 text-truncate"
								title={(currentUser.last_name || "") + " " + (currentUser.first_name || "")}
								style={{ maxWidth: 150 }}>
								{(currentUser.last_name || "") + " " + (currentUser.first_name || "")}
							</h5>
						</div>
					</div>
				</div>
			</div>
			{/* menu */}
			<div className="d-flex flex-column">
				<div className="d-flex flex-column">
					<NavLink
						to={routes.profile}
						className={({ isActive }) => {
							return `${isActive ? "bg-primary text-white" : "text-black"}`;
						}}>
						<div className="d-flex px-4 py-2">
							<div className="d-flex fw-bold">
								{/* icon */}
								<div>
									<i className="fa fa-user"></i>
								</div>
								<div className="ml-3">Profile</div>
							</div>
						</div>
					</NavLink>
				</div>
			</div>
			<div className="border my-2"></div>
			<div className="d-flex flex-column">
				<div className="d-flex flex-column mb-2">
					<NavLink
						to={routes.purchase}
						className={({ isActive }) => {
							return `${isActive ? "bg-primary text-white" : "text-black"}`;
						}}>
						<div className="d-flex px-4 py-2">
							<div className="d-flex fw-bold">
								{/* icon */}
								<div>
									<i className="fa fa-list"></i>
								</div>
								<div className="ml-3">My Purchase</div>
							</div>
						</div>
					</NavLink>
				</div>
			</div>
		</div>
	);
}
