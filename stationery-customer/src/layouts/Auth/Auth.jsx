import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/selectors";

export default function Auth({ className = "header__top__right__auth" }) {
	const currentUser = useSelector(selectUser);
	return (
		<>
			{!currentUser && (
				<>
					<div className={className}>
						<Link to={routes.signIn}>
							<i className="fa fa-user" /> Login
						</Link>
					</div>
					<div className={className + " ml-2"}>
						<Link to={routes.signUp}>
							<i className="fa fa-user" /> Register
						</Link>
					</div>
				</>
			)}
		</>
	);
}
